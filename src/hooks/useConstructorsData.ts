import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Constructor {
  constructorId: number;
  name: string;
  nationality: string;
  url: string;
}

interface ConstructorResult {
  constructorResultsId: number;
  raceId: number;
  constructorId: number;
  points: number;
  status: string;
}

interface ConstructorStanding {
  constructorStandingsId: number;
  raceId: number;
  constructorId: number;
  points: number;
  position: number;
  positionText: string;
  wins: number;
}

interface TopConstructor {
  name: string;
  nationality: string;
  url: string;
  totalPoints: number;
}

interface TopConstructorByWins {
  name: string;
  nationality: string;
  url: string;
  totalWins: number;
}

interface NationalityCount {
  nationality: string;
  count: number;
}

// Top 10 construtores com mais pontos na história
export const useTopConstructors = () => {
  return useQuery<TopConstructor[]>({
    queryKey: ["topConstructors"],
    queryFn: async () => {
      // Primeiro, buscar todos os construtores
      const { data: constructors, error: constructorsError } = await supabase
        .from("constructors")
        .select("constructorId, name, nationality, url");

      if (constructorsError) throw constructorsError;

      // Depois, buscar os resultados
      const { data: results, error: resultsError } = await supabase
        .from("constructor_results")
        .select("points, constructorId");

      if (resultsError) throw resultsError;

      // Mapear construtores por ID
      const constructorsMap = new Map(
        constructors.map(c => [c.constructorId, c])
      );

      // Calcular pontos por construtor
      const constructorPoints = results.reduce<Record<string, { constructor: Constructor; totalPoints: number }>>((acc, result) => {
        const constructor = constructorsMap.get(result.constructorId);
        if (constructor) {
          if (!acc[constructor.name]) {
            acc[constructor.name] = {
              constructor,
              totalPoints: 0
            };
          }
          acc[constructor.name].totalPoints += result.points || 0;
        }
        return acc;
      }, {});

      return Object.values(constructorPoints)
        .map(({ constructor, totalPoints }) => ({
          name: constructor.name,
          nationality: constructor.nationality,
          url: constructor.url,
          totalPoints
        }))
        .sort((a, b) => b.totalPoints - a.totalPoints)
        .slice(0, 10);
    }
  });
};

// Top 10 construtores com mais vitórias
export const useTopConstructorsByWins = () => {
  return useQuery<TopConstructorByWins[]>({
    queryKey: ["topConstructorsByWins"],
    queryFn: async () => {
      // Primeiro, buscar todos os construtores
      const { data: constructors, error: constructorsError } = await supabase
        .from("constructors")
        .select("constructorId, name, nationality, url");

      if (constructorsError) throw constructorsError;

      // Depois, buscar os resultados
      const { data: standings, error: standingsError } = await supabase
        .from("constructor_standings")
        .select("wins, constructorId");

      if (standingsError) throw standingsError;

      // Mapear construtores por ID
      const constructorsMap = new Map(
        constructors.map(c => [c.constructorId, c])
      );

      // Calcular vitórias por construtor
      const constructorWins = standings.reduce<Record<string, { constructor: Constructor; totalWins: number }>>((acc, standing) => {
        const constructor = constructorsMap.get(standing.constructorId);
        if (constructor) {
          if (!acc[constructor.name]) {
            acc[constructor.name] = {
              constructor,
              totalWins: 0
            };
          }
          acc[constructor.name].totalWins += standing.wins || 0;
        }
        return acc;
      }, {});

      return Object.values(constructorWins)
        .map(({ constructor, totalWins }) => ({
          name: constructor.name,
          nationality: constructor.nationality,
          url: constructor.url,
          totalWins
        }))
        .sort((a, b) => b.totalWins - a.totalWins)
        .slice(0, 10);
    }
  });
};

// Distribuição de nacionalidades
export const useConstructorNationalities = () => {
  return useQuery<NationalityCount[]>({
    queryKey: ["constructorNationalities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("constructors")
        .select("nationality")
        .not("nationality", "is", null);

      if (error) throw error;

      const nationalityCounts = (data as Pick<Constructor, "nationality">[]).reduce<Record<string, number>>((acc, constructor) => {
        if (constructor.nationality) {
          acc[constructor.nationality] = (acc[constructor.nationality] || 0) + 1;
        }
        return acc;
      }, {});

      return Object.entries(nationalityCounts)
        .map(([nationality, count]) => ({ nationality, count }))
        .sort((a, b) => b.count - a.count);
    }
  });
};

// Lista completa de construtores
export const useConstructors = () => {
  return useQuery({
    queryKey: ["constructors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("constructors")
        .select("*")
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data as Constructor[];
    }
  });
};

// Resultados históricos de um construtor específico
export const useConstructorResults = (constructorId: number) => {
  return useQuery({
    queryKey: ["constructorResults", constructorId],
    queryFn: async () => {
      const { data: results, error } = await supabase
        .from("constructor_results")
        .select(`
          *,
          races (
            year,
            name
          )
        `)
        .eq("constructorId", constructorId)
        .order('raceId', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      return results;
    },
    enabled: !!constructorId,
  });
};
