"use client";

import React from "react";
import { CheckCircle, XCircle, Loader, Clock } from "lucide-react";
import { NodeStatus } from "../../../_types/types";

const statusConfig = {
  success: {
    color: "#22C55E",
    bgColor: "#F0FDF4",
    icon: CheckCircle,
    label: "Success",
  },
  error: {
    color: "#EF4444",
    bgColor: "#FEF2F2",
    icon: XCircle,
    label: "Error",
  },
  running: {
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    icon: Loader,
    label: "Running",
  },
  pending: {
    color: "#94A3B8",
    bgColor: "#F8FAFC",
    icon: Clock,
    label: "Pending",
  },
  idle: {
    color: "#22C55E",
    bgColor: "#F0FDF4",
    icon: CheckCircle,
    label: "Success",
  },
};

export default function StatusBadge({ status }: { status: NodeStatus }) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
      }}
    >
      <Icon
        className={`w-3.5 h-3.5 ${status === "running" ? "animate-spin" : ""}`}
      />
      {config.label}
    </div>
  );
}
