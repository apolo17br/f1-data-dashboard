
import { useState } from "react";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

type Prediction = {
  name: string;
  avatar: string;
  predictions: {
    winner: string;
    pole: string;
    podium: string[];
    winningTeam: string;
  };
  points: number;
};

type PredictionsCardProps = {
  predictions: Prediction[];
  className?: string;
};

const PredictionsCard = ({ predictions, className }: PredictionsCardProps) => {
  const sortedPredictions = [...predictions].sort((a, b) => b.points - a.points);
  
  return (
    <div className={cn("f1-card", className)}>
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-bold">Nossos Palpites</h3>
        <Trophy className="h-5 w-5 text-amber-500" />
      </div>
      <div className="p-2">
        {sortedPredictions.map((prediction, index) => (
          <div 
            key={index}
            className="flex items-center p-3 rounded-lg transition-all hover:bg-secondary/50"
          >
            <div className="mr-3 relative">
              <img 
                src={prediction.avatar} 
                alt={prediction.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {index === 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  <Trophy className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium">{prediction.name}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="f1-tag bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                  {prediction.predictions.winner}
                </span>
                <span className="f1-tag bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  {prediction.predictions.pole}
                </span>
              </div>
            </div>
            <div className="font-mono font-bold">
              {prediction.points} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictionsCard;
