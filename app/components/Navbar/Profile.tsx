// app/components/Navbar/Profile.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { useAuth } from "@/app/context/AuthContext";
import clsx from "clsx";
import {
  User,
  LogIn,
  LogOut,
  Settings,
  User as UserIcon,
  Shield,
  Crown,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileProps {
  isAuthenticated: boolean;
  user?: any;
}

export default function Profile({ isAuthenticated, user }: ProfileProps) {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isGlowing, setIsGlowing] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDimming, setIsDimming] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto expand/collapse effect every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsExpanded((prev) => !prev);
      // Start dimming effect after expansion
      setTimeout(() => setIsDimming(true), 100);
      setTimeout(() => setIsDimming(false), 600);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Pulsing glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((word: string) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Compact Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex items-center gap-2 p-1.5 rounded-2xl transition-all duration-500 relative overflow-hidden group border-2",
          isAuthenticated
            ? clsx(
                "border-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-border",
                theme === "light"
                  ? "shadow-lg shadow-purple-500/25"
                  : "shadow-lg shadow-cyan-500/25"
              )
            : "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
        )}
      >
        {isAuthenticated ? (
          <>
            {/* Enhanced Gradient Background */}
            <motion.div
              animate={{
                opacity: isGlowing ? [0.4, 0.8, 0.4] : 0.4,
                scale: isGlowing ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
            />

            {/* Dimming Overlay Effect */}
            <motion.div
              animate={{
                opacity: isDimming ? 0.3 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-2xl bg-white/30 backdrop-blur-sm"
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-2">
              {/* Compact User Avatar */}
              <motion.div
                animate={{
                  scale: isExpanded ? 1.1 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "backOut",
                }}
                className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 relative overflow-hidden",
                  "bg-gradient-to-br from-cyan-400 to-purple-500 text-white border-white/30"
                )}
              >
                {/* Inner shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />

                {/* User initials */}
                <span className="relative z-10 font-bold drop-shadow-sm">
                  {getUserInitials()}
                </span>

                {/* Animated Sparkle */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-0.5 -right-0.5"
                >
                  <Sparkles className="w-2 h-2 text-yellow-300" />
                </motion.div>
              </motion.div>

              {/* Expandable User Info */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="hidden sm:block overflow-hidden"
                  >
                    <div className="text-left min-w-[120px]">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent truncate">
                          {user?.name?.split(" ")[0] || "User"}
                        </span>
                        <motion.div
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Crown className="w-2.5 h-2.5 text-yellow-300" />
                        </motion.div>
                      </div>
                      <div
                        className={clsx(
                          "text-[10px] font-medium truncate",
                          theme === "light"
                            ? "text-cyan-700/80"
                            : "text-cyan-300/80"
                        )}
                      >
                        {user?.email?.split("@")[0] || "Welcome!"}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Chevron */}
              <motion.div
                animate={{
                  rotate: isOpen ? 180 : 0,
                  scale: isOpen ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
                className={clsx(
                  "w-3 h-3 transition-colors",
                  theme === "light" ? "text-cyan-600" : "text-cyan-300"
                )}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </div>
          </>
        ) : (
          /* Compact Not Authenticated State */
          <>
            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20">
              <Shield className="w-3 h-3" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold">Login</div>
            </div>
          </>
        )}
      </button>

      {/* Enhanced Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={clsx(
              "absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl py-2 z-50 border backdrop-blur-xl",
              theme === "light"
                ? "bg-gradient-to-br from-white/95 to-cyan-50/95 border-cyan-200/60 text-gray-900 shadow-cyan-500/20"
                : "bg-gradient-to-br from-slate-900/95 to-purple-900/95 border-cyan-500/30 text-cyan-100 shadow-cyan-500/10"
            )}
          >
            {isAuthenticated ? (
              <>
                {/* Enhanced User Header */}
                <div
                  className={clsx(
                    "px-3 py-3 border-b relative overflow-hidden rounded-t-2xl",
                    theme === "light"
                      ? "border-cyan-200 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"
                      : "border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                  )}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20"
                  />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={clsx(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 relative overflow-hidden",
                          "bg-gradient-to-br from-cyan-400 to-purple-500 text-white border-white/30"
                        )}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                        <span className="relative z-10 drop-shadow-sm">
                          {getUserInitials()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm truncate bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                          {user?.name || "User"}
                        </h3>
                        <p
                          className={clsx(
                            "text-xs truncate mt-0.5",
                            theme === "light"
                              ? "text-cyan-600/80"
                              : "text-cyan-300/80"
                          )}
                        >
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Status Badge */}
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
                      />
                      <span
                        className={clsx(
                          "text-xs font-bold",
                          theme === "light" ? "text-cyan-600" : "text-cyan-400"
                        )}
                      >
                        Premium Member
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-1 p-1.5">
                  {[
                    { icon: UserIcon, label: "My Profile" },
                    { icon: Settings, label: "Settings" },
                    { icon: Zap, label: "Upgrade to Pro" },
                  ].map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        x: 5,
                        background:
                          theme === "light"
                            ? "linear-gradient(90deg, #22d3ee, #a855f7)"
                            : "linear-gradient(90deg, #155e75, #7e22ce)",
                      }}
                      className={clsx(
                        "flex items-center gap-2 px-2.5 py-2 text-xs transition-all duration-300 w-full rounded-xl group",
                        theme === "light"
                          ? "text-gray-700 hover:text-white"
                          : "text-cyan-200 hover:text-white"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}

                  {/* Logout */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{
                      scale: 1.02,
                      x: 5,
                      background: "linear-gradient(90deg, #ef4444, #dc2626)",
                    }}
                    onClick={handleLogout}
                    className={clsx(
                      "flex items-center gap-2 px-2.5 py-2 text-xs transition-all duration-300 w-full rounded-xl border-t mt-1 pt-2 group",
                      theme === "light"
                        ? "text-gray-700 hover:text-white border-cyan-200"
                        : "text-cyan-200 hover:text-white border-cyan-500/20"
                    )}
                  >
                    <LogOut className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span>Sign Out</span>
                  </motion.button>
                </div>
              </>
            ) : (
              /* Compact Login Dropdown */
              <>
                <div className="px-3 py-3 border-b border-cyan-200 dark:border-cyan-500/20">
                  <h3 className="font-semibold text-sm bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Welcome to QualifAI
                  </h3>
                  <p
                    className={clsx(
                      "text-xs mt-0.5",
                      theme === "light"
                        ? "text-cyan-600/80"
                        : "text-cyan-400/70"
                    )}
                  >
                    Join thousands of agencies
                  </p>
                </div>

                <div className="space-y-1 p-1.5">
                  {[
                    {
                      icon: LogIn,
                      label: "Sign In",
                      href: "/login",
                      color: "blue",
                    },
                    {
                      icon: User,
                      label: "Create Account",
                      href: "/register",
                      color: "green",
                    },
                  ].map((item, index) => (
                    <motion.a
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.02,
                        x: 5,
                        background:
                          item.color === "blue"
                            ? "linear-gradient(90deg, #3b82f6, #1d4ed8)"
                            : "linear-gradient(90deg, #10b981, #047857)",
                      }}
                      href={item.href}
                      className={clsx(
                        "flex items-center gap-2 px-2.5 py-2 text-xs transition-all duration-300 rounded-xl group",
                        theme === "light"
                          ? "text-gray-700 hover:text-white"
                          : "text-cyan-200 hover:text-white"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>{item.label}</span>
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
