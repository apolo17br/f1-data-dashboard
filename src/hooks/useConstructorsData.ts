
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Constructor = {
  constructorId: number;
  constructorRef: string;
  name: string;
  nationality: string;
  url: string;
};

export type ConstructorStanding = {
  constructorStandingsId: number;
  raceId: number;
  constructorId: number;
  points: number;
  position: number;
  positionText: string;
  wins: number;
  constructor?: Constructor;
};

export type ConstructorResult = {
  constructorResultsId: number;
  raceId: number;
  constructorId: number;
  points: number;
  status: string;
  constructor?: Constructor;
};

export const useConstructors = (season?: number) => {
  return useQuery({
    queryKey: ["constructors", season],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("constructors")
        .select("*");
      
      if (error) throw error;
      return data as Constructor[];
    }
  });
};

export const useConstructorStandings = (season?: number) => {
  return useQuery({
    queryKey: ["constructorStandings", season],
    queryFn: async () => {
      // Na implementação real, filtraria por corridas da temporada selecionada
      const { data, error } = await supabase
        .from("constructor_standings")
        .select(`
          *,
          constructor:constructorId(*)
        `)
        .order("position", { ascending: true });
      
      if (error) throw error;
      return data as ConstructorStanding[];
    },
    enabled: true, // Temporariamente habilitado para todos os casos
  });
};

export const useConstructorResults = (constructorId?: number, season?: number) => {
  return useQuery({
    queryKey: ["constructorResults", constructorId, season],
    queryFn: async () => {
      let query = supabase
        .from("constructor_results")
        .select(`
          *,
          constructor:constructorId(*)
        `);
      
      if (constructorId) {
        query = query.eq("constructorId", constructorId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as ConstructorResult[];
    },
    enabled: !!constructorId,
  });
};
