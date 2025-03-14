
import { useQuery } from "@tanstack/react-query";
import { f1ApiService } from "@/services/api.service";
import { RaceWeekend, Circuit, WeatherDay } from "@/types/f1.types";
import { useState, useEffect } from "react";

// Buscar o próximo fim de semana de corrida
export const useNextRaceWeekend = () => {
  return useQuery({
    queryKey: ["nextRaceWeekend"],
    queryFn: async () => {
      const data = await f1ApiService.getNextRaceWeekend();
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};

// Buscar o fim de semana de corrida atual (se houver)
export const useCurrentRaceWeekend = () => {
  return useQuery({
    queryKey: ["currentRaceWeekend"],
    queryFn: async () => {
      const data = await f1ApiService.getCurrentRaceWeekend();
      return data;
    },
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};

// Buscar um circuito específico
export const useCircuit = (circuitId?: string) => {
  return useQuery({
    queryKey: ["circuit", circuitId],
    queryFn: async () => {
      if (!circuitId) return null;
      const data = await f1ApiService.getCircuit(circuitId);
      return data;
    },
    enabled: !!circuitId,
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
  });
};

// Buscar previsão do tempo para um circuito
export const useWeatherForecast = (circuitId?: string) => {
  return useQuery({
    queryKey: ["weather", circuitId],
    queryFn: async () => {
      if (!circuitId) return [];
      const data = await f1ApiService.getWeatherForecast(circuitId);
      return data;
    },
    enabled: !!circuitId,
    staleTime: 1000 * 60 * 15, // 15 minutos
  });
};

// Buscar o calendário completo de corridas
export const useRaceCalendar = () => {
  return useQuery({
    queryKey: ["raceCalendar"],
    queryFn: async () => {
      const data = await f1ApiService.getRaceCalendar();
      return data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
  });
};

// Dashboard data hook that combines multiple data sources
export const useDashboardData = () => {
  const [isRaceWeekend, setIsRaceWeekend] = useState(false);
  
  // Use existing hooks to fetch data
  const { data: currentRace, isLoading: isLoadingCurrent } = useCurrentRaceWeekend();
  const { data: nextRace, isLoading: isLoadingNext } = useNextRaceWeekend();
  const activeRace = currentRace || nextRace;
  
  // Set circuit ID based on active race
  const circuitId = activeRace?.circuitId;
  
  // Fetch circuit details and weather
  const { data: circuit, isLoading: isLoadingCircuit } = useCircuit(circuitId);
  const { data: weather, isLoading: isLoadingWeather } = useWeatherForecast(circuitId);
  
  // Mock predictions data for now
  const predictions = [];
  
  // Check if there is an active race weekend
  useEffect(() => {
    if (currentRace) {
      setIsRaceWeekend(true);
    } else {
      setIsRaceWeekend(false);
    }
  }, [currentRace]);
  
  // Combined loading state
  const isLoading = 
    isLoadingCurrent || 
    isLoadingNext || 
    isLoadingCircuit || 
    isLoadingWeather;
  
  return {
    isRaceWeekend,
    activeRace,
    circuit,
    weather,
    predictions,
    isLoading
  };
};
