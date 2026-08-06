"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  padding?: "sm" | "md" | "lg" | "none";
  delay?: number;
}

export default function Card({
  children,
  className = "",
  hover = false,
  glass = false,
  padding = "md",
  delay = 0,
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        rounded-2xl border border-border
        ${glass ? "glass" : "bg-surface"}
        ${paddings[padding]}
        ${hover ? "hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer" : "shadow-card"}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
