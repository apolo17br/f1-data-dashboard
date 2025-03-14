
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
      const { data: standingsData, error } = await supabase
        .from("constructor_standings")
        .select("*")
        .order("position", { ascending: true });
      
      if (error) throw error;
      
      // Buscar construtores separadamente
      const { data: constructorsData, error: constructorsError } = await supabase
        .from("constructors")
        .select("*");
      
      if (constructorsError) throw constructorsError;
      
      // Mapear os dados para incluir as informações do construtor
      const standingsWithConstructors = standingsData.map(standing => {
        const constructor = constructorsData.find(c => c.constructorId === standing.constructorId);
        return {
          ...standing,
          constructor: constructor as Constructor
        };
      });
      
      return standingsWithConstructors as ConstructorStanding[];
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
        .select("*");
      
      if (constructorId) {
        query = query.eq("constructorId", constructorId);
      }
      
      const { data: resultsData, error } = await query;
      
      if (error) throw error;
      
      // Buscar construtores separadamente
      const { data: constructorsData, error: constructorsError } = await supabase
        .from("constructors")
        .select("*");
      
      if (constructorsError) throw constructorsError;
      
      // Mapear os dados para incluir as informações do construtor
      const resultsWithConstructors = resultsData.map(result => {
        const constructor = constructorsData.find(c => c.constructorId === result.constructorId);
        return {
          ...result,
          constructor: constructor as Constructor
        };
      });
      
      return resultsWithConstructors as ConstructorResult[];
    },
    enabled: !!constructorId,
  });
};
