// components/clients/ClientForm.tsx
"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  clientFormSchema,
  ClientFormSchema,
} from "@/app/(main)/schemas/client.schema";
import { Client } from "@/app/(main)/types/client.types";
import { cn } from "@/lib/utils";
import { FiX, FiUpload } from "react-icons/fi";
import { CiPalette } from "react-icons/ci";

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: ClientFormSchema) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

const SERVICE_OPTIONS = [
  "wordpress",
  "shopify",
  "mern",
  "java",
  "python",
  "react",
  "nextjs",
  "nodejs",
];

const STATUS_OPTIONS = ["active", "inactive", "pending"];

const COLOR_OPTIONS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
];

export const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onSubmit,
  onClose,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClientFormSchema>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: client
      ? {
          name: client.name,
          email: client.email,
          company: client.company,
          status: client.status,
          serviceType: client.serviceType,
          logo: client.logo,
          color: client.color,
        }
      : {
          status: "active",
          serviceType: "react",
          color: "#3B82F6",
        },
  });

  const selectedColor = watch("color");

  // Simple form submission handler
  const handleFormSubmit = (data: ClientFormSchema) => {
    console.log("Form data:", data); // Debug log
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {client ? "Edit Client" : "Add New Client"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Client Name *
              </label>
              <input
                {...register("name")}
                type="text"
                className={cn(
                  "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700",
                  errors.name && "border-red-500"
                )}
                placeholder="Enter client name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                {...register("email")}
                type="email"
                className={cn(
                  "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700",
                  errors.email && "border-red-500"
                )}
                placeholder="client@company.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Company and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Company *
              </label>
              <input
                {...register("company")}
                type="text"
                className={cn(
                  "w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700",
                  errors.company && "border-red-500"
                )}
                placeholder="Company name"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                {...register("status")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Service Type and Color */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Type *
              </label>
              <select
                {...register("serviceType")}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
              >
                {SERVICE_OPTIONS.map((service) => (
                  <option key={service} value={service}>
                    {service.charAt(0).toUpperCase() + service.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Brand Color *
              </label>
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: selectedColor }}
                />
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setValue("color", color)}
                      className={cn(
                        "w-8 h-8 rounded border-2 transition-all",
                        selectedColor === color
                          ? "border-gray-900 dark:border-white scale-110"
                          : "border-gray-300 dark:border-gray-600"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <CiPalette className="w-5 h-5 text-gray-400" />
              </div>
              {errors.color && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.color.message}
                </p>
              )}
            </div>
          </div>

          {/* Logo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Logo URL (Optional)
            </label>
            <div className="flex items-center space-x-3">
              <input
                {...register("logo")}
                type="url"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700"
                placeholder="https://example.com/logo.png"
              />
              <FiUpload className="w-5 h-5 text-gray-400" />
            </div>
            {errors.logo && (
              <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "px-6 py-3 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {isSubmitting
                ? "Saving..."
                : client
                ? "Update Client"
                : "Create Client"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};
