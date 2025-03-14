
import { useQuery } from "@tanstack/react-query";
import { f1ApiService } from "@/services/api.service";
import { Circuit, RaceWeekend, WeatherDay, PredictionResult } from "@/types/f1.types";

// Hook para obter o próximo fim de semana de corrida
export const useNextRaceWeekend = () => {
  return useQuery({
    queryKey: ["nextRaceWeekend"],
    queryFn: () => f1ApiService.getNextRaceWeekend(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Hook para obter o fim de semana de corrida atual (se houver)
export const useCurrentRaceWeekend = () => {
  return useQuery({
    queryKey: ["currentRaceWeekend"],
    queryFn: () => f1ApiService.getCurrentRaceWeekend(),
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Hook para obter dados do circuito
export const useCircuit = (circuitId: string | undefined) => {
  return useQuery({
    queryKey: ["circuit", circuitId],
    queryFn: () => circuitId ? f1ApiService.getCircuit(circuitId) : null,
    enabled: !!circuitId,
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};

// Hook para obter a previsão do tempo para um circuito
export const useWeatherForecast = (circuitId: string | undefined) => {
  return useQuery({
    queryKey: ["weather", circuitId],
    queryFn: () => circuitId ? f1ApiService.getWeatherForecast(circuitId) : [],
    enabled: !!circuitId,
    staleTime: 1000 * 60 * 15, // 15 minutos
  });
};

// Hook para obter palpites para um GP específico
export const usePredictions = (grandPrixId: string | undefined) => {
  return useQuery({
    queryKey: ["predictions", grandPrixId],
    queryFn: () => grandPrixId ? f1ApiService.getPredictions(grandPrixId) : [],
    enabled: !!grandPrixId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
};

// Hook para obter o calendário de corridas
export const useRaceCalendar = () => {
  return useQuery({
    queryKey: ["raceCalendar"],
    queryFn: () => f1ApiService.getRaceCalendar(),
    staleTime: 1000 * 60 * 60, // 1 hora
  });
};

// Função para determinar se estamos em um fim de semana de corrida
export const useIsRaceWeekend = () => {
  const { data: currentRace, isLoading } = useCurrentRaceWeekend();
  
  return {
    isRaceWeekend: !!currentRace,
    currentRace,
    isLoading
  };
};

// Hook que retorna todas as informações relevantes para o Dashboard
export const useDashboardData = () => {
  const { data: nextRace, isLoading: nextRaceLoading } = useNextRaceWeekend();
  const { data: currentRace, isLoading: currentRaceLoading } = useCurrentRaceWeekend();
  
  const activeRace = currentRace || nextRace;
  const circuitId = activeRace?.circuitId;
  
  const { data: circuit, isLoading: circuitLoading } = useCircuit(circuitId);
  const { data: weather, isLoading: weatherLoading } = useWeatherForecast(circuitId);
  const { data: predictions, isLoading: predictionsLoading } = usePredictions(circuitId);
  
  const isRaceWeekend = !!currentRace;
  
  const isLoading = 
    nextRaceLoading || 
    currentRaceLoading || 
    circuitLoading || 
    weatherLoading || 
    predictionsLoading;
  
  return {
    isRaceWeekend,
    activeRace,
    circuit,
    weather,
    predictions,
    isLoading
  };
};
