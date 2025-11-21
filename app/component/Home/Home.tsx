"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Brain,
  FileSearch,
  ShieldCheck,
  Workflow,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import clsx from "clsx";
import { useTheme } from "@/app/context/ThemeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      className={clsx(
        "min-h-screen w-full p-6 transition-all duration-500",
        isDark
          ? "bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900 text-blue-200"
          : "bg-gradient-to-br from-gray-50 via-blue-50/40 to-gray-100 text-gray-900"
      )}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={clsx(
            "absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse",
            isDark ? "bg-blue-500" : "bg-blue-300"
          )}
        />
        <div
          className={clsx(
            "absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse delay-1000",
            isDark ? "bg-purple-500" : "bg-purple-300"
          )}
        />
      </div>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-5xl mx-auto text-center py-20 relative z-10"
      >
        <motion.div variants={itemVariants}>
          <Badge
            className={clsx(
              "px-4 py-2 text-sm font-semibold mb-6 shadow-lg relative overflow-hidden group",
              isDark
                ? "bg-blue-900/40 text-blue-300 border border-blue-700/50"
                : "bg-blue-100 text-blue-700 border border-blue-300"
            )}
          >
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Powered by QualifAI
            <div
              className={clsx(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                isDark
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  : "bg-gradient-to-r from-blue-200/20 to-purple-200/20"
              )}
            />
          </Badge>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Scope-Aware Quality Assurance
          <br />
          <span className="text-3xl md:text-4xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            for Agencies
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className={clsx(
            "max-w-2xl mx-auto text-lg md:text-xl leading-relaxed",
            isDark ? "text-blue-300/80" : "text-gray-600"
          )}
        >
          Transform your SOWs, briefs, and requirements into machine-verifiable
          quality checks. Stop missing deliverables and start shipping flawless
          client work.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              "px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300",
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
            )}
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={clsx(
              "px-8 py-3 rounded-xl font-semibold border transition-all duration-300",
              isDark
                ? "border-blue-600 text-blue-400 hover:bg-blue-600/10"
                : "border-blue-400 text-blue-600 hover:bg-blue-50"
            )}
          >
            View Demo
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 relative z-10"
      >
        <AnimatedFeatureCard
          icon={<FileSearch className="h-8 w-8" />}
          title="Intelligent Requirement Parsing"
          description="Upload scopes, briefs, or SOWs — QualifAI extracts structured JSON requirements automatically."
          delay={0}
          isDark={isDark}
        />
        <AnimatedFeatureCard
          icon={<Workflow className="h-8 w-8" />}
          title="Service-Specific QA Engines"
          description="Website, SEO, PPC, Automation, Social — each powered by its own best‑practice engine."
          delay={0.1}
          isDark={isDark}
        />
        <AnimatedFeatureCard
          icon={<ShieldCheck className="h-8 w-8" />}
          title="Scope vs Delivery Matching"
          description="Instantly see what was delivered correctly, what's missing, and what needs revision."
          delay={0.2}
          isDark={isDark}
        />
        <AnimatedFeatureCard
          icon={<Brain className="h-8 w-8" />}
          title="AI‑Driven Evaluation"
          description="LLM‑powered logic checks, visual audits, metadata extraction, and error detection."
          delay={0.3}
          isDark={isDark}
        />
        <AnimatedFeatureCard
          icon={<BarChart3 className="h-8 w-8" />}
          title="QA History & Reporting"
          description="Track improvements over time, view discrepancies, and generate client‑safe reports."
          delay={0.4}
          isDark={isDark}
        />
        <AnimatedFeatureCard
          icon={<CheckCircle className="h-8 w-8" />}
          title="Automated Compliance"
          description="Ensure all deliverables meet industry standards and client-specific requirements automatically."
          delay={0.5}
          isDark={isDark}
        />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-4xl mx-auto mt-20 relative z-10"
      >
        <div
          className={clsx(
            "rounded-2xl p-8 backdrop-blur-sm border",
            isDark
              ? "bg-slate-900/50 border-slate-700/50"
              : "bg-white/50 border-gray-200/50"
          )}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="99%" label="Accuracy Rate" isDark={isDark} />
            <StatCard number="10x" label="Faster QA" isDark={isDark} />
            <StatCard number="50+" label="Checks Automated" isDark={isDark} />
            <StatCard number="24/7" label="Monitoring" isDark={isDark} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedFeatureCard({
  icon,
  title,
  description,
  delay = 0,
  isDark,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  isDark: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <Card
        className={clsx(
          "border shadow-xl rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 relative",
          isDark
            ? "border-blue-200/20 bg-slate-900/40 hover:bg-slate-800/40"
            : "border-blue-200/40 bg-white/60 hover:bg-white/80"
        )}
      >
        {/* Glow effect on hover */}
        <div
          className={clsx(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl",
            isDark
              ? "bg-gradient-to-br from-blue-500/5 to-purple-500/5"
              : "bg-gradient-to-br from-blue-200/10 to-purple-200/10"
          )}
        />

        <CardContent className="p-6 flex flex-col items-start space-y-4 relative z-10">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={clsx(
              "p-3 rounded-xl relative group/icon transition-all duration-300",
              isDark
                ? "bg-blue-500/10 text-blue-300"
                : "bg-blue-500/10 text-blue-600"
            )}
          >
            {icon}
            {/* Spinning glow effect */}
            <div
              className={clsx(
                "absolute inset-0 rounded-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500 animate-spin-slow",
                isDark ? "bg-blue-500/20" : "bg-blue-400/20"
              )}
            />
          </motion.div>

          <h3
            className={clsx(
              "text-xl font-semibold transition-colors duration-300",
              isDark ? "text-blue-100" : "text-gray-800"
            )}
          >
            {title}
          </h3>

          <p
            className={clsx(
              "text-sm leading-relaxed transition-colors duration-300",
              isDark ? "text-blue-300/80" : "text-gray-600"
            )}
          >
            {description}
          </p>

          {/* Animated underline */}
          <motion.div
            className={clsx(
              "h-0.5 rounded-full mt-2",
              isDark ? "bg-blue-500" : "bg-blue-400"
            )}
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StatCard({
  number,
  label,
  isDark,
}: {
  number: string;
  label: string;
  isDark: boolean;
}) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          delay: Math.random() * 0.5 + 0.8,
        }}
        className={clsx(
          "text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
          isDark ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"
        )}
      >
        {number}
      </motion.div>
      <div
        className={clsx(
          "text-sm font-medium",
          isDark ? "text-blue-300/80" : "text-gray-600"
        )}
      >
        {label}
      </div>
    </motion.div>
  );
}
