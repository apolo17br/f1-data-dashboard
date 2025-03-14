
import { useState } from "react";
import { cn } from "@/lib/utils";

export type EventType = "practice" | "qualifying" | "sprint" | "race";

export type SessionEvent = {
  type: EventType;
  name: string;
  time: Date;
  duration: number; // duration in minutes
};

type RaceWeekendScheduleProps = {
  events: SessionEvent[];
  className?: string;
};

const typeColors: Record<EventType, string> = {
  practice: "bg-blue-500",
  qualifying: "bg-purple-500",
  sprint: "bg-amber-500",
  race: "bg-f1-red",
};

const typeNames: Record<EventType, string> = {
  practice: "Treino",
  qualifying: "Classificação",
  sprint: "Sprint",
  race: "Corrida",
};

const RaceWeekendSchedule = ({ events, className }: RaceWeekendScheduleProps) => {
  // Group events by date
  const groupedEvents: Record<string, SessionEvent[]> = {};
  
  events.forEach((event) => {
    const date = event.time.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    
    if (!groupedEvents[date]) {
      groupedEvents[date] = [];
    }
    
    groupedEvents[date].push(event);
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className={cn("f1-card", className)}>
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-bold">Programação do Fim de Semana</h3>
      </div>
      <div className="p-4 space-y-4">
        {Object.entries(groupedEvents).map(([date, dayEvents]) => (
          <div key={date}>
            <h4 className="font-medium text-sm mb-2 text-muted-foreground uppercase">{date}</h4>
            <div className="space-y-2">
              {dayEvents.map((event, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 rounded-lg bg-secondary/30 transition-all hover:bg-secondary/60"
                >
                  <div className={cn("w-2 h-full min-h-[24px] rounded-full mr-3", typeColors[event.type])}></div>
                  <div className="flex-1">
                    <p className="font-medium">{event.name}</p>
                    <p className="text-xs text-muted-foreground">{typeNames[event.type]}</p>
                  </div>
                  <div className="font-mono">
                    <p className="font-bold">{formatTime(event.time)}</p>
                    <p className="text-xs text-right text-muted-foreground">
                      {event.duration} min
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceWeekendSchedule;
