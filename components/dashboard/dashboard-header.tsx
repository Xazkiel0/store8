"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Calendar, ChevronDown, Bell from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  userRole?: string;
  userInitials?: string;
  warehouseStatus?: "active" | "inactive";
  onDateChange?: (date: string) => void;
}

const MONTHS_ID: readonly string[] = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const RANGE_LABELS: readonly string[] = [
  "Hari Ini",
  "Kemarin",
  "7 Hari Terakhir",
  "30 Hari Terakhir",
  "Bulan Ini",
  "Bulan Lalu",
];

function formatDate(date: Date): string {
  const d = date.getDate();
  const m = MONTHS_ID[date.getMonth()];
  const y = date.getFullYear();
  return d + " " + m + " " + y;
}

function shiftDays(from: Date, days: number): Date {
  const result = new Date(from);
  result.setDate(result.getDate() + days);
  return result;
}

function buildDateOptions(now: Date): string[] {
  return [
    "Hari Ini, " + formatDate(now),
    "Kemarin, " + formatDate(shiftDays(now, -1)),
    ...RANGE_LABELS.slice(2).map((label) => label),
  ];
}

export function DashboardHeader({
  userName,
  userRole,
  userInitials,
  warehouseStatus = "active",
  onDateChange,
}: DashboardHeaderProps) {
  const [selectedDate, setSelectedDate] = useState(() => buildDateOptions(new Date())[0]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const dateOptions = useMemo(() => buildDateOptions(new Date()), []);

  const handleDateSelect = useCallback(
    (date: string) => {
      setSelectedDate(date);
      setIsCalendarOpen(false);
      onDateChange?.(date);
    },
    [onDateChange],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsCalendarOpen(false);
    }
    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }
  }, [isCalendarOpen]);

  const isActive = warehouseStatus === "active";

  const initials = (userInitials ?? "").trim() || "?";
  const showName = (userName ?? "").trim().length > 0;
  const showRole = (userRole ?? "").trim().length > 0;

  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="flex flex-col leading-tight">
          <h3 className="text-[16px] font-bold text-[#0f172a]">
            Executive Operations Hub
          </h3>
          <span className="text-[11px] font-medium text-[#64748b]">Storeight</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div ref={containerRef} className="relative">
          <button
            type="button"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            aria-haspopup="listbox"
            aria-expanded={isCalendarOpen}
            className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-[#e2e8f0] shadow-sm hover:bg-[#f8fafc] transition-colors focus-visible:ring-2 ring-[#1e40af] ring-offset-2"
          >
            <Calendar className="w-[14px] h-[14px] text-[#64748b]" />
            <span className="text-[12px] font-medium text-[#334155]">
              {selectedDate}
            </span>
            <ChevronDown className="w-3 h-3 text-[#94a3b8]" />
          </button>

          {isCalendarOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white border border-[#e2e8f0] rounded-lg shadow-lg z-50 overflow-hidden"
              role="listbox"
              aria-label="Pilih rentang tanggal"
            >
              {dateOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleDateSelect(option)}
                  role="option"
                  aria-selected={selectedDate === option}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#f8fafc] transition-colors ${
                    selectedDate === option
                      ? "bg-[#eff6ff] text-[#1e40af]"
                      : "text-[#334155]"
                  }`
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          className={`flex items-center gap-2 px-2.5 py-1 rounded-full border ${
            isActive
              ? "bg-[#ecfdf5] border-[#a7f3d0]"
              : "bg-[#f1f5f9] border-[#e2e8f0]"
          }`
        >
          <span className="relative flex h-2 w-2">
            <span
              className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isActive ? "animate-ping bg-emerald-400" : "bg-slate-400"
              }`
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isActive ? "bg-[#10b981]" : "bg-[#94a3b8]"
              }`
            />
          </span>
          <span
            className={`text-[12px] font-medium ${
              isActive ? "text-[#047857]" : "text-[#64748b]"
            }`
          >
            Fulfillment Hub {isActive ? "Aktif" : "Nonaktif"}
          </span>
        </div>

        <button
          type="button"
          aria-label="Notifikasi"
          className="relative p-2 rounded-full hover:bg-[#f8fafc] transition-colors focus-visible:ring-2 ring-[#1e40af] ring-offset-2"
        >
          <Bell className="w-5 h-5 text-[#64748b]" />
          <span className="absolute left-[22px] top-[6px] w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="w-px h-6 bg-[#e2e8f0]" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#334155] flex items-center justify-center">
            <span className="text-[12px] font-medium text-white">
              {initials}
            </span>
          </div>
          {showName && (
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-[#0f172a]">
                {userName}
              </span>
              {showRole && (
                <span className="text-[11px] text-[#64748b]">
                  {userRole}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );

export default DashboardHeader;