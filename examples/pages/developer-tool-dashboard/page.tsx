"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  AlertCircle,
  Box,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  GitBranch,
  GitCommit,
  Home,
  Loader2,
  Settings,
  Terminal,
  Timer,
  XCircle,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ───────────────────────────────────────────────────────────────────

type RunStatus = "success" | "failed" | "running" | "pending"

interface PipelineRun {
  id: string
  pipeline: string
  branch: string
  commit: string
  message: string
  status: RunStatus
  duration: string
  triggeredBy: string
  startedAt: string
  steps: BuildStep[]
}

interface BuildStep {
  name: string
  status: RunStatus
  duration: string | null
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const RUNS: PipelineRun[] = [
  {
    id: "r1",
    pipeline: "api-gateway / deploy",
    branch: "main",
    commit: "a4f92ec",
    message: "fix: correct rate-limit header propagation",
    status: "success",
    duration: "3m 41s",
    triggeredBy: "priya.mehta",
    startedAt: "2 minutes ago",
    steps: [
      { name: "Install dependencies", status: "success", duration: "48s" },
      { name: "Lint + type check", status: "success", duration: "22s" },
      { name: "Unit tests", status: "success", duration: "1m 03s" },
      { name: "Build", status: "success", duration: "54s" },
      { name: "Push image", status: "success", duration: "29s" },
      { name: "Deploy to production", status: "success", duration: "25s" },
    ],
  },
  {
    id: "r2",
    pipeline: "worker / test",
    branch: "feat/event-batching",
    commit: "c7b11da",
    message: "feat: batch event writes with configurable flush interval",
    status: "running",
    duration: "1m 12s",
    triggeredBy: "tom.reyes",
    startedAt: "Just now",
    steps: [
      { name: "Install dependencies", status: "success", duration: "51s" },
      { name: "Lint + type check", status: "success", duration: "19s" },
      { name: "Unit tests", status: "running", duration: null },
      { name: "Integration tests", status: "pending", duration: null },
      { name: "Build", status: "pending", duration: null },
    ],
  },
  {
    id: "r3",
    pipeline: "frontend / deploy",
    branch: "fix/chart-overflow",
    commit: "e3a00b5",
    message: "fix: prevent chart container overflow on mobile viewports",
    status: "failed",
    duration: "2m 08s",
    triggeredBy: "ana.silva",
    startedAt: "14 minutes ago",
    steps: [
      { name: "Install dependencies", status: "success", duration: "44s" },
      { name: "Lint + type check", status: "success", duration: "31s" },
      { name: "Unit tests", status: "failed", duration: "53s" },
      { name: "Build", status: "pending", duration: null },
      { name: "Deploy to staging", status: "pending", duration: null },
    ],
  },
  {
    id: "r4",
    pipeline: "api-gateway / test",
    branch: "main",
    commit: "9d3f847",
    message: "chore: bump @relay/core to 2.14.1",
    status: "success",
    duration: "2m 57s",
    triggeredBy: "priya.mehta",
    startedAt: "38 minutes ago",
    steps: [
      { name: "Install dependencies", status: "success", duration: "46s" },
      { name: "Lint + type check", status: "success", duration: "20s" },
      { name: "Unit tests", status: "success", duration: "58s" },
      { name: "Integration tests", status: "success", duration: "53s" },
    ],
  },
  {
    id: "r5",
    pipeline: "infra / plan",
    branch: "main",
    commit: "b2c54fa",
    message: "chore: increase worker memory limit to 2Gi",
    status: "success",
    duration: "47s",
    triggeredBy: "tom.reyes",
    startedAt: "1 hour ago",
    steps: [
      { name: "Terraform init", status: "success", duration: "12s" },
      { name: "Terraform validate", status: "success", duration: "8s" },
      { name: "Terraform plan", status: "success", duration: "27s" },
    ],
  },
  {
    id: "r6",
    pipeline: "worker / deploy",
    branch: "main",
    commit: "7e19cbb",
    message: "feat: add DLQ with configurable retry backoff",
    status: "success",
    duration: "4m 22s",
    triggeredBy: "ana.silva",
    startedAt: "2 hours ago",
    steps: [
      { name: "Install dependencies", status: "success", duration: "49s" },
      { name: "Lint + type check", status: "success", duration: "24s" },
      { name: "Unit tests", status: "success", duration: "1m 11s" },
      { name: "Integration tests", status: "success", duration: "1m 02s" },
      { name: "Build", status: "success", duration: "51s" },
      { name: "Deploy to production", status: "success", duration: "25s" },
    ],
  },
]

// ─── Status helpers ───────────────────────────────────────────────────────────

function StatusIcon({ status, className }: { status: RunStatus; className?: string }) {
  const base = cn("h-3.5 w-3.5 shrink-0", className)
  if (status === "success") return <CheckCircle2 className={cn(base, "text-green-500")} />
  if (status === "failed") return <XCircle className={cn(base, "text-red-500")} />
  if (status === "running") return <Loader2 className={cn(base, "animate-spin text-amber-400")} />
  return <Circle className={cn(base, "text-white/20")} />
}

function StatusPill({ status }: { status: RunStatus }) {
  const config = {
    success: { label: "Passed", classes: "text-green-500 bg-green-500/10" },
    failed: { label: "Failed", classes: "text-red-500 bg-red-500/10" },
    running: { label: "Running", classes: "text-amber-400 bg-amber-400/10" },
    pending: { label: "Pending", classes: "text-white/30 bg-white/5" },
  }[status]

  return (
    <span className={cn("rounded-sm px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-widest", config.classes)}>
      {config.label}
    </span>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home, label: "Overview", active: false },
  { icon: Activity, label: "Pipelines", active: true },
  { icon: Box, label: "Environments", active: false },
  { icon: Terminal, label: "Logs", active: false },
  { icon: Zap, label: "Triggers", active: false },
  { icon: Settings, label: "Settings", active: false },
]

function Sidebar() {
  return (
    <aside className="flex h-full w-[240px] shrink-0 flex-col border-r border-white/8 bg-[#0a0a0b]">
      {/* Logo */}
      <div className="flex h-12 items-center gap-2.5 border-b border-white/8 px-4">
        <Code2 className="h-4 w-4 text-white/60" />
        <span className="text-sm font-semibold text-white">Relay</span>
        <span className="ml-auto rounded-sm bg-white/8 px-1.5 py-0.5 text-[10px] font-medium text-white/40">
          production
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={cn(
              "flex w-full items-center gap-2.5 px-4 py-2 text-sm transition-colors",
              active
                ? "text-white"
                : "text-white/40 hover:text-white/70"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
            {active && <div className="ml-auto h-1 w-1 rounded-full bg-white/60" />}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-white/8 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-white/10 text-[10px] font-semibold text-white/60">
            PM
          </div>
          <div>
            <p className="text-xs font-medium text-white/70">priya.mehta</p>
            <p className="text-[10px] text-white/30">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Pipeline runs table ──────────────────────────────────────────────────────

function RunsTable({
  selectedId,
  onSelect,
}: {
  selectedId: string | null
  onSelect: (run: PipelineRun) => void
}) {
  return (
    <div className="flex flex-col">
      {/* Table header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 border-b border-white/8 px-4 py-2">
        {["Pipeline / branch", "Status", "Triggered by", "Duration", "Started"].map((h) => (
          <span key={h} className="text-[10px] uppercase tracking-wider text-white/30">
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/5">
        {RUNS.map((run) => (
          <button
            key={run.id}
            onClick={() => onSelect(run)}
            className={cn(
              "grid w-full grid-cols-[2fr_1fr_1fr_1fr_80px] gap-4 px-4 py-3 text-left transition-colors",
              selectedId === run.id ? "bg-white/5" : "hover:bg-white/3"
            )}
          >
            {/* Pipeline + branch */}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white/85">{run.pipeline}</p>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-white/35">
                <GitBranch className="h-3 w-3 shrink-0" />
                <span className="truncate">{run.branch}</span>
                <GitCommit className="h-3 w-3 shrink-0" />
                <span className="font-mono">{run.commit}</span>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <StatusPill status={run.status} />
            </div>

            {/* Triggered by */}
            <div className="flex items-center">
              <span className="text-xs text-white/40">{run.triggeredBy}</span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <Timer className="h-3 w-3 text-white/25" />
              <span className="font-mono text-xs text-white/50">{run.duration}</span>
            </div>

            {/* Started */}
            <div className="flex items-center">
              <span className="text-xs text-white/35">{run.startedAt}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Build detail panel ───────────────────────────────────────────────────────

function DetailPanel({ run, onClose }: { run: PipelineRun; onClose: () => void }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-[320px] shrink-0 border-l border-white/8 bg-[#0d0d0f]"
    >
      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-white/8 px-4">
        <div className="flex items-center gap-2">
          <StatusIcon status={run.status} />
          <span className="text-sm font-medium text-white/80">Run detail</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/30 transition-colors hover:text-white/70"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>

      {/* Meta */}
      <div className="space-y-3 border-b border-white/8 px-4 py-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/30">Pipeline</p>
          <p className="mt-0.5 text-sm text-white/80">{run.pipeline}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/30">Branch</p>
            <p className="mt-0.5 font-mono text-xs text-white/60">{run.branch}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/30">Commit</p>
            <p className="mt-0.5 font-mono text-xs text-white/60">{run.commit}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/30">Duration</p>
            <p className="mt-0.5 font-mono text-xs text-white/60">{run.duration}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/30">Triggered by</p>
            <p className="mt-0.5 text-xs text-white/60">{run.triggeredBy}</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-white/30">Commit message</p>
          <p className="mt-0.5 text-xs leading-relaxed text-white/50">{run.message}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="px-4 py-4">
        <p className="mb-3 text-[10px] uppercase tracking-wider text-white/30">Build steps</p>
        <div className="space-y-0">
          {run.steps.map((step, i) => (
            <div key={step.name} className="relative flex gap-3">
              {/* Connector line */}
              {i < run.steps.length - 1 && (
                <div className="absolute left-[6px] top-5 h-full w-px bg-white/8" />
              )}

              <div className="relative z-10 mt-1 shrink-0">
                <StatusIcon status={step.status} className="h-3 w-3" />
              </div>

              <div className="flex flex-1 items-start justify-between pb-3">
                <p className={cn(
                  "text-xs",
                  step.status === "success" ? "text-white/65" :
                  step.status === "failed" ? "text-red-400" :
                  step.status === "running" ? "text-amber-300" :
                  "text-white/25"
                )}>
                  {step.name}
                </p>
                {step.duration && (
                  <span className="ml-2 shrink-0 font-mono text-[10px] text-white/30">
                    {step.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.aside>
  )
}

// ─── Header bar ───────────────────────────────────────────────────────────────

function Header() {
  const successCount = RUNS.filter((r) => r.status === "success").length
  const failedCount = RUNS.filter((r) => r.status === "failed").length
  const runningCount = RUNS.filter((r) => r.status === "running").length

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/8 px-5">
      <div className="flex items-center gap-2">
        <Activity className="h-4 w-4 text-white/40" />
        <span className="text-sm font-medium text-white/80">Pipelines</span>
        <ChevronRight className="h-3 w-3 text-white/25" />
        <span className="text-sm text-white/40">All runs</span>
      </div>

      <div className="flex items-center gap-4 text-xs text-white/40">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span>{successCount} passed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
          <span>{failedCount} failed</span>
        </div>
        {runningCount > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            <span>{runningCount} running</span>
          </div>
        )}
      </div>
    </header>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DeveloperDashboard() {
  const [selectedRun, setSelectedRun] = useState<PipelineRun | null>(null)

  const handleSelect = (run: PipelineRun) => {
    setSelectedRun((prev) => (prev?.id === run.id ? null : run))
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0b] font-sans text-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <div className="flex min-h-0 flex-1">
          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <RunsTable selectedId={selectedRun?.id ?? null} onSelect={handleSelect} />
          </main>

          {/* Detail panel */}
          <AnimatePresence>
            {selectedRun && (
              <DetailPanel
                key={selectedRun.id}
                run={selectedRun}
                onClose={() => setSelectedRun(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
