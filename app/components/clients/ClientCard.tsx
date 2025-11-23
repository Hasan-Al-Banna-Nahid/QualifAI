// components/clients/ClientCard.tsx
"use client";

import { motion } from "framer-motion";
import { Client } from "@/app/(main)/types/client.types";
import { StatusBadge } from "./StatusBadge";
import { ServiceBadge } from "./ServiceBadge";
import { cn } from "@/lib/utils";
import { FiCalendar, FiMail } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  className?: string;
}

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onEdit,
  onDelete,
  className,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300",
        "bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {client.logo ? (
            <img
              src={client.logo}
              alt={client.company}
              className="w-12 h-12 rounded-lg object-cover border-2 border-white/20 shadow-lg"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{ backgroundColor: client.color }}
            >
              {client.company.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              {client.name}
            </h3>
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mt-1">
              <LuBuilding2 className="w-4 h-4 mr-1" />
              {client.company}
            </div>
          </div>
        </div>
        <StatusBadge status={client.status} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <FiMail className="w-4 h-4 mr-2" />
          {client.email}
        </div>

        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
          <FiCalendar className="w-4 h-4 mr-2" />
          Last QA: {new Date(client.lastQACheck).toLocaleDateString()}
        </div>

        <ServiceBadge service={client.serviceType} />
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Created: {new Date(client.createdAt).toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(client)}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(client)}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
