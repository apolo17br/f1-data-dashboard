
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  name: string;
  avatar_url: string;
};

export type Prediction = {
  id: string;
  profile_id: string;
  grand_prix_id: string;
  season: number;
  winner: string;
  pole: string;
  podium: string[];
  winning_team: string;
  points: number;
  is_calculated: boolean;
  created_at: string;
};

export const useProfiles = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      
      if (error) throw error;
      return data as Profile[];
    }
  });
};

export const usePrediction = (profileId: string, grandPrixId: string, season: number) => {
  return useQuery({
    queryKey: ["prediction", profileId, grandPrixId, season],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("profile_id", profileId)
        .eq("grand_prix_id", grandPrixId)
        .eq("season", season)
        .single();
      
      if (error && error.code !== "PGRST116") { // PGRST116 is "No rows returned" error
        throw error;
      }
      
      return data as Prediction | null;
    },
    enabled: !!profileId && !!grandPrixId && !!season,
  });
};

export const usePredictions = (profileId: string, season: number) => {
  return useQuery({
    queryKey: ["predictions", profileId, season],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("predictions")
        .select("*")
        .eq("profile_id", profileId)
        .eq("season", season)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Prediction[];
    },
    enabled: !!profileId && !!season,
  });
};

export const useCreateOrUpdatePrediction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (prediction: Omit<Prediction, 'id' | 'created_at' | 'points' | 'is_calculated'>) => {
      const { data: existingPrediction, error: checkError } = await supabase
        .from("predictions")
        .select("id")
        .eq("profile_id", prediction.profile_id)
        .eq("grand_prix_id", prediction.grand_prix_id)
        .eq("season", prediction.season)
        .single();
      
      if (checkError && checkError.code !== "PGRST116") {
        throw checkError;
      }
      
      if (existingPrediction) {
        // Update existing prediction
        const { data, error } = await supabase
          .from("predictions")
          .update({
            winner: prediction.winner,
            pole: prediction.pole,
            podium: prediction.podium,
            winning_team: prediction.winning_team,
          })
          .eq("id", existingPrediction.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create new prediction
        const { data, error } = await supabase
          .from("predictions")
          .insert([prediction])
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
    onSuccess: (_, variables) => {
      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["prediction", variables.profile_id, variables.grand_prix_id, variables.season]
      });
      queryClient.invalidateQueries({
        queryKey: ["predictions", variables.profile_id, variables.season]
      });
    },
  });
};
