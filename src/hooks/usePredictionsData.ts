
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  name: string;
  avatar_url?: string;
  created_at?: string;
};

export type Prediction = {
  id: string;
  profile_id: string;
  grand_prix_id: string;
  season: number;
  winner?: string;
  pole?: string;
  podium?: string[];
  winning_team?: string;
  points?: number;
  is_calculated?: boolean;
  created_at?: string;
};

// Get all profiles
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

// Create or update a profile
export const useCreateOrUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profile: Omit<Profile, "created_at">) => {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(profile)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    }
  });
};

// Delete a profile
export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (profileId: string) => {
      const { error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", profileId);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    }
  });
};

// Get prediction for specific race and profile
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
        .maybeSingle();
      
      if (error) throw error;
      return data as Prediction | null;
    },
    enabled: !!profileId && !!grandPrixId
  });
};

// Get all predictions for a profile
export const usePredictions = (profileId: string, season?: number) => {
  return useQuery({
    queryKey: ["predictions", profileId, season],
    queryFn: async () => {
      let query = supabase
        .from("predictions")
        .select("*")
        .eq("profile_id", profileId);
      
      if (season) {
        query = query.eq("season", season);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as Prediction[];
    },
    enabled: !!profileId
  });
};

// Create or update a prediction
export const useCreateOrUpdatePrediction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (prediction: Omit<Prediction, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("predictions")
        .upsert({ 
          profile_id: prediction.profile_id,
          grand_prix_id: prediction.grand_prix_id,
          season: prediction.season,
          winner: prediction.winner,
          pole: prediction.pole,
          podium: prediction.podium,
          winning_team: prediction.winning_team
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: ["prediction", variables.profile_id, variables.grand_prix_id, variables.season] 
      });
      queryClient.invalidateQueries({ 
        queryKey: ["predictions", variables.profile_id, variables.season] 
      });
    }
  });
};

// Delete a prediction
export const useDeletePrediction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (predictionId: string) => {
      const { error } = await supabase
        .from("predictions")
        .delete()
        .eq("id", predictionId);
      
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["predictions"] });
    }
  });
};
