
import { useEffect, useState } from "react";

type Driver = {
  position: number;
  name: string;
  team: string;
  points: number;
};

type Team = {
  position: number;
  name: string;
  points: number;
};

type StandingsCardProps = {
  type: "drivers" | "constructors";
  className?: string;
};

// Simulated data - this would come from API
const dummyDrivers: Driver[] = [
  { position: 1, name: "Max Verstappen", team: "Red Bull Racing", points: 265 },
  { position: 2, name: "Lando Norris", team: "McLaren", points: 189 },
  { position: 3, name: "Charles Leclerc", team: "Ferrari", points: 162 },
  { position: 4, name: "Oscar Piastri", team: "McLaren", points: 143 },
  { position: 5, name: "Carlos Sainz", team: "Ferrari", points: 140 },
];

const dummyTeams: Team[] = [
  { position: 1, name: "Red Bull Racing", points: 365 },
  { position: 2, name: "McLaren", points: 332 },
  { position: 3, name: "Ferrari", points: 302 },
  { position: 4, name: "Mercedes", points: 239 },
  { position: 5, name: "Aston Martin", points: 74 },
];

// Team colors mapping
const teamColors: Record<string, string> = {
  "Red Bull Racing": "#0600EF",
  "McLaren": "#FF8700",
  "Ferrari": "#DC0000",
  "Mercedes": "#00D2BE",
  "Aston Martin": "#006F62",
  "Alpine": "#0090FF",
  "Williams": "#005AFF",
  "AlphaTauri": "#2B4562",
  "Alfa Romeo": "#900000",
  "Haas F1 Team": "#FFFFFF",
};

const StandingsCard = ({ type, className }: StandingsCardProps) => {
  const [data, setData] = useState<Driver[] | Team[]>([]);

  useEffect(() => {
    // In a real app, we would fetch from an API here
    if (type === "drivers") {
      setData(dummyDrivers);
    } else {
      setData(dummyTeams);
    }
  }, [type]);

  return (
    <div className={`f1-card ${className}`}>
      <div className="px-4 py-3 border-b border-border">
        <h3 className="font-bold">
          {type === "drivers" ? "Classificação de Pilotos" : "Classificação de Construtores"}
        </h3>
      </div>
      <div className="p-2">
        {data.map((item, index) => {
          const isDriver = "team" in item;
          const teamName = isDriver ? (item as Driver).team : (item as Team).name;
          const teamColor = teamColors[teamName] || "#333";
          
          return (
            <div 
              key={index}
              className="flex items-center px-3 py-2 rounded-lg transition-all hover:bg-secondary/50"
            >
              <div className="w-6 text-center font-medium text-sm text-muted-foreground">
                {item.position}
              </div>
              <div 
                className="w-1 h-full min-h-[20px] mx-3 rounded-full" 
                style={{ backgroundColor: teamColor }}
              />
              <div className="flex-1 font-medium">
                {isDriver ? (item as Driver).name : (item as Team).name}
                {isDriver && (
                  <div className="text-xs text-muted-foreground">
                    {(item as Driver).team}
                  </div>
                )}
              </div>
              <div className="font-mono font-bold">
                {item.points}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StandingsCard;
