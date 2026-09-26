import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

export function Calendar({
  className = "",
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={ptBR}
      showOutsideDays={showOutsideDays}
      className={`p-3 bg-white rounded-2xl border border-[#E2E8F0] shadow-xl ${className}`}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-3",
        month_caption: "flex justify-between pt-1 relative items-center px-1 font-bold text-sm text-[#1A202C] capitalize",
        nav: "space-x-1 flex items-center",
        button_previous: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 flex items-center justify-center rounded-lg hover:bg-slate-100 text-[#4A5568]",
        button_next: "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 flex items-center justify-center rounded-lg hover:bg-slate-100 text-[#4A5568]",
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-[#A0AEC0] rounded-md w-9 font-semibold text-[0.8rem] text-center capitalize",
        week: "flex w-full mt-1",
        day: "h-9 w-9 p-0 font-normal text-sm text-[#2D3748] hover:bg-[#1F6F43]/10 hover:text-[#1F6F43] rounded-lg transition-colors flex items-center justify-center cursor-pointer",
        selected: "!bg-[#1F6F43] !text-white hover:!bg-[#185C37] font-bold rounded-lg",
        today: "bg-slate-100 font-bold text-[#1F6F43]",
        outside: "text-[#CBD5E0] opacity-40",
        disabled: "text-[#CBD5E0] opacity-30 cursor-not-allowed",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? <ChevronLeft size={16} /> : <ChevronRight size={16} />,
      }}
      {...props}
    />
  )
}
