// services/client.service.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/(main)/lib/firebase/config";
import {
  Client,
  ClientFormData,
  ClientsFilter,
} from "@/app/(main)/types/client.types";
import { aiService, AIClientAnalysis } from "./ai.service";

const CLIENTS_COLLECTION = "clients";

export const clientService = {
  // O(1) Create client with AI analysis
  async createClient(
    data: ClientFormData
  ): Promise<{ id: string; analysis?: AIClientAnalysis }> {
    try {
      // Generate AI analysis for new clients
      const aiAnalysis = await aiService.analyzeClient(data);

      const clientData = {
        ...data,
        // Initialize QA fields
        lastQACheck: new Date(),
        qaStatus: "pending" as const,
        qaScore: 0,
        performanceScore: 0,

        // Add AI analysis
        aiAnalysis: {
          ...aiAnalysis.analysis,
          lastAnalyzed: new Date(),
        },

        // Timestamps
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastContact: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, CLIENTS_COLLECTION),
        clientData
      );

      return {
        id: docRef.id,
        analysis: aiAnalysis.analysis,
      };
    } catch (error) {
      console.error("Error creating client:", error);
      throw new Error("Failed to create client");
    }
  },

  // O(1) Get client by ID
  async getClient(id: string): Promise<Client | null> {
    const docRef = doc(db, CLIENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        // Convert Firestore timestamps
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        lastContact: data.lastContact?.toDate() || new Date(),
        lastQACheck: data.lastQACheck?.toDate() || new Date(),
        contractStartDate: data.contractStartDate?.toDate() || new Date(),
        contractEndDate: data.contractEndDate?.toDate() || new Date(),
        aiAnalysis: data.aiAnalysis
          ? {
              ...data.aiAnalysis,
              lastAnalyzed:
                data.aiAnalysis.lastAnalyzed?.toDate() || new Date(),
            }
          : undefined,
      } as Client;
    }
    return null;
  },

  // O(n) Get clients with advanced filtering
  async getClients(
    filter: ClientsFilter
  ): Promise<{ clients: Client[]; total: number }> {
    try {
      let q = query(collection(db, CLIENTS_COLLECTION));
      const conditions = [];

      // Search filter - O(1) condition checks
      if (filter.search) {
        conditions.push(
          where("name", ">=", filter.search),
          where("name", "<=", filter.search + "\uf8ff")
        );
      }

      // Status filter
      if (filter.status && filter.status !== "all") {
        conditions.push(where("status", "==", filter.status));
      }

      // Service type filter
      if (filter.serviceType && filter.serviceType !== "all") {
        conditions.push(where("serviceType", "==", filter.serviceType));
      }

      // Service tier filter
      if (filter.serviceTier && filter.serviceTier !== "all") {
        conditions.push(where("serviceTier", "==", filter.serviceTier));
      }

      // Payment status filter
      if (filter.paymentStatus && filter.paymentStatus !== "all") {
        conditions.push(where("paymentStatus", "==", filter.paymentStatus));
      }

      // Build query
      if (conditions.length > 0) {
        q = query(q, ...conditions, orderBy("name"));
      } else {
        q = query(q, orderBy("createdAt", "desc"));
      }

      const snapshot = await getDocs(q);
      const clients: Client[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        clients.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          lastContact: data.lastContact?.toDate() || new Date(),
          lastQACheck: data.lastQACheck?.toDate() || new Date(),
          contractStartDate: data.contractStartDate?.toDate() || new Date(),
          contractEndDate: data.contractEndDate?.toDate() || new Date(),
        } as Client);
      });

      // Client-side pagination (for small datasets)
      const startIndex = (filter.page - 1) * filter.limit;
      const paginatedClients = clients.slice(
        startIndex,
        startIndex + filter.limit
      );

      return {
        clients: paginatedClients,
        total: clients.length,
      };
    } catch (error) {
      console.error("Error fetching clients:", error);
      return { clients: [], total: 0 };
    }
  },

  // O(1) Update client
  async updateClient(id: string, data: Partial<ClientFormData>): Promise<void> {
    const docRef = doc(db, CLIENTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  },

  // O(1) Delete client
  async deleteClient(id: string): Promise<void> {
    const docRef = doc(db, CLIENTS_COLLECTION, id);
    await deleteDoc(docRef);
  },

  // O(1) Run AI analysis on client
  async analyzeClient(id: string): Promise<AIClientAnalysis> {
    const client = await this.getClient(id);
    if (!client) {
      throw new Error("Client not found");
    }

    const analysis = await aiService.analyzeClient(client);

    // Update client with new analysis
    const docRef = doc(db, CLIENTS_COLLECTION, id);
    await updateDoc(docRef, {
      aiAnalysis: {
        ...analysis.analysis,
        lastAnalyzed: serverTimestamp(),
      },
      updatedAt: serverTimestamp(),
    });

    return analysis.analysis;
  },

  // O(n) Get client statistics
  async getClientStats(): Promise<{
    total: number;
    byStatus: Record<string, number>;
    byService: Record<string, number>;
    revenue: number;
    activeClients: number;
  }> {
    const snapshot = await getDocs(collection(db, CLIENTS_COLLECTION));
    const stats = {
      total: 0,
      byStatus: {} as Record<string, number>,
      byService: {} as Record<string, number>,
      revenue: 0,
      activeClients: 0,
    };

    snapshot.forEach((doc) => {
      const client = doc.data() as Client;
      stats.total++;
      stats.revenue += client.monthlyRetainer || 0;

      // Count by status
      stats.byStatus[client.status] = (stats.byStatus[client.status] || 0) + 1;

      // Count by service
      stats.byService[client.serviceType] =
        (stats.byService[client.serviceType] || 0) + 1;

      // Count active clients
      if (client.status === "active") {
        stats.activeClients++;
      }
    });

    return stats;
  },

  // O(1) Bulk operations
  async bulkUpdateStatus(
    ids: string[],
    status: Client["status"]
  ): Promise<void> {
    const batch = writeBatch(db);

    ids.forEach((id) => {
      const docRef = doc(db, CLIENTS_COLLECTION, id);
      batch.update(docRef, {
        status,
        updatedAt: serverTimestamp(),
      });
    });

    await batch.commit();
  },

  // O(1) Generate insights for all clients
  async generateBusinessInsights(): Promise<any> {
    const snapshot = await getDocs(collection(db, CLIENTS_COLLECTION));
    const clients = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return await aiService.generateClientInsights(clients);
  },
};
