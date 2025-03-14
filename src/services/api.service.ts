
import { RaceWeekend, Circuit, DriverStanding, TeamStanding, LiveTiming, WeatherDay, PredictionResult } from "@/types/f1.types";

// Mock data for circuits
const CIRCUITS: Record<string, Circuit> = {
  "albert_park": {
    id: "albert_park",
    name: "Albert Park Circuit",
    location: "Melbourne",
    country: "Austrália",
    length: "5.278 km",
    turns: 14,
    lapRecord: {
      time: "1:20.235",
      driver: "Charles Leclerc",
      year: 2022
    },
    firstGP: 1996,
    image: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Australia_Circuit.png.transform/9col/image.png"
  },
  "shanghai": {
    id: "shanghai",
    name: "Shanghai International Circuit",
    location: "Shanghai",
    country: "China",
    length: "5.451 km",
    turns: 16,
    lapRecord: {
      time: "1:32.238",
      driver: "Michael Schumacher",
      year: 2004
    },
    firstGP: 2004,
    image: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/China_Circuit.png.transform/9col/image.png"
  },
  "suzuka": {
    id: "suzuka",
    name: "Suzuka International Racing Course",
    location: "Suzuka",
    country: "Japão",
    length: "5.807 km",
    turns: 18,
    lapRecord: {
      time: "1:30.983",
      driver: "Lewis Hamilton",
      year: 2019
    },
    firstGP: 1987,
    image: "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Japan_Circuit.png.transform/9col/image.png"
  }
};

// Mock weather data
const WEATHER_DATA: Record<string, WeatherDay[]> = {
  "albert_park": [
    { day: "Quinta", condition: "sunny", temperature: { min: 14, max: 23 }, precipitation: 0, windSpeed: 12 },
    { day: "Sexta", condition: "partly-cloudy", temperature: { min: 15, max: 22 }, precipitation: 10, windSpeed: 15 },
    { day: "Sábado", condition: "partly-cloudy", temperature: { min: 14, max: 21 }, precipitation: 20, windSpeed: 18 },
    { day: "Domingo", condition: "cloudy", temperature: { min: 13, max: 19 }, precipitation: 40, windSpeed: 20 },
    { day: "Segunda", condition: "rainy", temperature: { min: 12, max: 17 }, precipitation: 80, windSpeed: 25 }
  ]
};

// Mock race schedule data based on the user's input
const parseDate = (date: string, time: string): Date => {
  const [day, month, year] = date.split('/').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

const RACE_CALENDAR: RaceWeekend[] = [
  {
    grandPrix: "GP da Austrália",
    circuitId: "albert_park",
    location: "Melbourne",
    country: "Austrália",
    startDate: new Date(2025, 2, 13), // March 13, 2025
    endDate: new Date(2025, 2, 16), // March 16, 2025
    sessions: [
      { type: "practice", name: "Treino Livre 1", time: new Date(2025, 2, 13, 22, 30), duration: 60 },
      { type: "practice", name: "Treino Livre 2", time: new Date(2025, 2, 14, 2, 0), duration: 60 },
      { type: "practice", name: "Treino Livre 3", time: new Date(2025, 2, 14, 22, 30), duration: 60 },
      { type: "qualifying", name: "Classificação", time: new Date(2025, 2, 15, 2, 0), duration: 60 },
      { type: "race", name: "Corrida", time: new Date(2025, 2, 16, 1, 0), duration: 120 }
    ]
  },
  {
    grandPrix: "GP da China",
    circuitId: "shanghai",
    location: "Shanghai",
    country: "China",
    startDate: new Date(2025, 2, 21), // March 21, 2025
    endDate: new Date(2025, 2, 23), // March 23, 2025
    sessions: [
      { type: "practice", name: "Treino Livre 1", time: new Date(2025, 2, 21, 0, 30), duration: 60 },
      { type: "qualifying", name: "Classificação Sprint", time: new Date(2025, 2, 21, 4, 30), duration: 44 },
      { type: "sprint", name: "Sprint", time: new Date(2025, 2, 22, 0, 0), duration: 60 },
      { type: "qualifying", name: "Classificação", time: new Date(2025, 2, 22, 4, 0), duration: 60 },
      { type: "race", name: "Corrida", time: new Date(2025, 2, 23, 4, 0), duration: 120 }
    ]
  },
  {
    grandPrix: "GP do Japão",
    circuitId: "suzuka",
    location: "Suzuka",
    country: "Japão",
    startDate: new Date(2025, 3, 3), // April 3, 2025
    endDate: new Date(2025, 3, 6), // April 6, 2025
    sessions: [
      { type: "practice", name: "Treino Livre 1", time: new Date(2025, 3, 3, 23, 30), duration: 60 },
      { type: "practice", name: "Treino Livre 2", time: new Date(2025, 3, 4, 3, 0), duration: 60 },
      { type: "practice", name: "Treino Livre 3", time: new Date(2025, 3, 4, 23, 30), duration: 60 },
      { type: "qualifying", name: "Classificação", time: new Date(2025, 3, 5, 3, 0), duration: 60 },
      { type: "race", name: "Corrida", time: new Date(2025, 3, 6, 2, 0), duration: 120 }
    ]
  }
];

// Mock predictions data
const PREDICTIONS: PredictionResult[] = [
  {
    userId: "user1",
    grandPrixId: "albert_park",
    points: 15,
    predictions: {
      userId: "user1",
      grandPrixId: "albert_park",
      winner: "VER",
      pole: "VER",
      podium: ["VER", "LEC", "NOR"],
      winningTeam: "red_bull"
    },
    actual: {
      winner: "VER",
      pole: "VER",
      podium: ["VER", "LEC", "HAM"],
      winningTeam: "red_bull"
    }
  },
  {
    userId: "user2",
    grandPrixId: "albert_park",
    points: 8,
    predictions: {
      userId: "user2",
      grandPrixId: "albert_park",
      winner: "LEC",
      pole: "VER",
      podium: ["LEC", "VER", "SAI"],
      winningTeam: "ferrari"
    },
    actual: {
      winner: "VER",
      pole: "VER",
      podium: ["VER", "LEC", "HAM"],
      winningTeam: "red_bull"
    }
  }
];

// API service methods
class F1ApiService {
  // Get the next race weekend
  getNextRaceWeekend(): Promise<RaceWeekend | null> {
    return new Promise((resolve) => {
      const now = new Date();
      const nextRace = RACE_CALENDAR.find(race => race.startDate > now);
      
      setTimeout(() => {
        resolve(nextRace || null);
      }, 300);
    });
  }

  // Get current race weekend (if active)
  getCurrentRaceWeekend(): Promise<RaceWeekend | null> {
    return new Promise((resolve) => {
      const now = new Date();
      const currentRace = RACE_CALENDAR.find(race => 
        race.startDate <= now && race.endDate >= now
      );
      
      setTimeout(() => {
        resolve(currentRace || null);
      }, 300);
    });
  }

  // Get a specific circuit by ID
  getCircuit(circuitId: string): Promise<Circuit | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(CIRCUITS[circuitId] || null);
      }, 300);
    });
  }

  // Get weather forecast for a circuit
  getWeatherForecast(circuitId: string): Promise<WeatherDay[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(WEATHER_DATA[circuitId] || []);
      }, 500);
    });
  }

  // Get driver standings
  getDriverStandings(): Promise<DriverStanding[]> {
    // This would fetch from a real API in production
    return Promise.resolve([]);
  }

  // Get constructor standings
  getTeamStandings(): Promise<TeamStanding[]> {
    // This would fetch from a real API in production
    return Promise.resolve([]);
  }

  // Get predictions for a specific race
  getPredictions(grandPrixId: string): Promise<PredictionResult[]> {
    return new Promise((resolve) => {
      const racePredictions = PREDICTIONS.filter(p => p.grandPrixId === grandPrixId);
      
      setTimeout(() => {
        resolve(racePredictions);
      }, 300);
    });
  }

  // Get full race calendar
  getRaceCalendar(): Promise<RaceWeekend[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(RACE_CALENDAR);
      }, 500);
    });
  }
}

export const f1ApiService = new F1ApiService();
