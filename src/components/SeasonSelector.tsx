
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

type SeasonSelectorProps = {
  onChange: (season: number) => void;
  defaultSeason?: number;
  className?: string;
}

const AVAILABLE_SEASONS = [2025, 2024, 2023, 2022, 2021, 2020, 2019];

const SeasonSelector = ({ onChange, defaultSeason = 2025, className = "" }: SeasonSelectorProps) => {
  const [selectedSeason, setSelectedSeason] = useState<number>(defaultSeason);

  const handleSeasonChange = (value: string) => {
    const season = parseInt(value);
    setSelectedSeason(season);
    onChange(season);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <CalendarDays className="h-4 w-4 text-muted-foreground" />
      <Select 
        defaultValue={selectedSeason.toString()} 
        onValueChange={handleSeasonChange}
      >
        <SelectTrigger className="w-[140px] h-8 text-sm">
          <SelectValue placeholder="Temporada" />
        </SelectTrigger>
        <SelectContent>
          {AVAILABLE_SEASONS.map((season) => (
            <SelectItem key={season} value={season.toString()}>
              Temporada {season}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SeasonSelector;
