// types/client.types.ts
export interface Client {
  id: string;
  // Basic Information
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;

  // Status & Service
  status: "active" | "inactive" | "pending" | "on-hold";
  serviceType:
    | "wordpress"
    | "shopify"
    | "mern"
    | "java"
    | "python"
    | "react"
    | "nextjs"
    | "nodejs"
    | "mobile"
    | "ecommerce";
  serviceTier: "basic" | "standard" | "premium" | "enterprise";

  // Visual & Branding
  logo?: string;
  brandColor: string;
  industry: string;

  // Project Details
  projectDescription: string;
  projectGoals: string[];
  technologies: string[];

  // QA & Monitoring
  lastQACheck: Date;
  qaStatus: "passed" | "failed" | "pending" | "in-progress";
  qaScore: number; // 1-10
  performanceScore: number; // 1-100

  // AI Analysis
  aiAnalysis?: {
    sentiment: "positive" | "negative" | "neutral";
    priority: "low" | "medium" | "high" | "critical";
    recommendations: string[];
    riskAssessment: string;
    predictedGrowth: number; // percentage
    lastAnalyzed: Date;
  };

  // Financial
  monthlyRetainer: number;
  paymentStatus: "paid" | "pending" | "overdue" | "cancelled";
  contractStartDate: Date;
  contractEndDate: Date;

  // Technical
  hosting: "shared" | "vps" | "dedicated" | "cloud";
  sslStatus: "active" | "expired" | "pending";
  backupFrequency: "daily" | "weekly" | "monthly";

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastContact: Date;
}

export interface ClientFormData {
  // Basic Information
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;

  // Status & Service
  status: "active" | "inactive" | "pending" | "on-hold";
  serviceType:
    | "wordpress"
    | "shopify"
    | "mern"
    | "java"
    | "python"
    | "react"
    | "nextjs"
    | "nodejs"
    | "mobile"
    | "ecommerce";
  serviceTier: "basic" | "standard" | "premium" | "enterprise";

  // Visual & Branding
  logo?: string;
  brandColor: string;
  industry: string;

  // Project Details
  projectDescription: string;
  projectGoals: string[];
  technologies: string[];

  // Financial
  monthlyRetainer: number;
  paymentStatus: "paid" | "pending" | "overdue" | "cancelled";
  contractStartDate: string;
  contractEndDate: string;

  // Technical
  hosting: "shared" | "vps" | "dedicated" | "cloud";
  sslStatus: "active" | "expired" | "pending";
  backupFrequency: "daily" | "weekly" | "monthly";
}

export interface ClientsFilter {
  search: string;
  status: string;
  serviceType: string;
  serviceTier: string;
  paymentStatus: string;
  page: number;
  limit: number;
}

export interface AIClientAnalysis {
  sentiment: "positive" | "negative" | "neutral";
  priority: "low" | "medium" | "high" | "critical";
  recommendations: string[];
  riskAssessment: string;
  predictedGrowth: number;
}
