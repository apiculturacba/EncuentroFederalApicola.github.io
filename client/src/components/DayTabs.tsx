import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DayTabsProps {
  selectedDay: number;
  onDayChange: (day: number) => void;
}

export default function DayTabs({ selectedDay, onDayChange }: DayTabsProps) {
  const days = [
    { number: 1, label: "Día 1 - Jueves 10" },
    { number: 2, label: "Día 2 - Viernes 11" },
  ];

  return (
    <div className="mb-8">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {days.map((day) => (
            <Button
              key={day.number}
              variant="ghost"
              onClick={() => onDayChange(day.number)}
              className={`py-4 px-1 border-b-2 font-medium whitespace-nowrap transition-colors ${
                selectedDay === day.number
                  ? "border-honey-500 text-honey-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              {day.label}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  );
}
