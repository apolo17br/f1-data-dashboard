
// Race weekend types
export type EventType = "practice" | "qualifying" | "sprint" | "race";

export type SessionEvent = {
  type: EventType;
  name: string;
  time: Date;
  duration: number; // duration in minutes
};

export type RaceWeekend = {
  grandPrix: string;
  circuitId: string;
  location: string;
  country: string;
  startDate: Date;
  endDate: Date;
  sessions: SessionEvent[];
};

// Circuit types
export type Circuit = {
  id: string;
  name: string;
  location: string;
  country: string;
  length: string;
  turns: number;
  lapRecord: {
    time: string;
    driver: string;
    year: number;
  };
  firstGP: number;
  image: string;
};

// Driver and Team types
export type Driver = {
  id: string;
  code: string;
  number: number;
  name: string;
  firstName: string;
  lastName: string;
  nationality: string;
  team: string;
  teamColor: string;
};

export type Team = {
  id: string;
  name: string;
  fullName: string;
  color: string;
  nationality: string;
  base: string;
};

// Standings types
export type DriverStanding = {
  position: number;
  driver: Driver;
  points: number;
  wins: number;
};

export type TeamStanding = {
  position: number;
  team: Team;
  points: number;
  wins: number;
};

// Weather types
export type WeatherCondition = "sunny" | "cloudy" | "partly-cloudy" | "rainy" | "windy";

export type WeatherDay = {
  day: string;
  condition: WeatherCondition;
  temperature: {
    min: number;
    max: number;
  };
  precipitation: number;
  windSpeed: number;
};

// Race data types for live tracking
export type LiveTiming = {
  position: number;
  driver: Driver;
  lapTime: string;
  gap: string;
  interval: string;
  sector1: string;
  sector2: string;
  sector3: string;
  lastLap: string;
  tyre: "soft" | "medium" | "hard" | "intermediate" | "wet";
  stops: number;
};

// Prediction system types
export type UserPrediction = {
  userId: string;
  grandPrixId: string;
  winner: string; // driver id
  pole: string; // driver id
  podium: string[]; // array of 3 driver ids
  winningTeam: string; // team id
};

export type PredictionResult = {
  userId: string;
  grandPrixId: string;
  points: number;
  predictions: UserPrediction;
  actual: {
    winner: string;
    pole: string;
    podium: string[];
    winningTeam: string;
  };
};

// Championship history for circuits
export type CircuitHistory = {
  circuitId: string;
  seasons: {
    year: number;
    winner: Driver;
    pole: Driver;
    fastestLap: Driver;
    averageLapTime: string;
    overtakes: number;
    crashes: number;
  }[];
};
