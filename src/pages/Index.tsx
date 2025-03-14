
import { useEffect } from "react";
import Layout from "@/components/Layout";
import CountdownTimer from "@/components/CountdownTimer";
import StandingsCard from "@/components/StandingsCard";
import CircuitInfo from "@/components/CircuitInfo";
import RaceWeekendSchedule from "@/components/RaceWeekendSchedule";
import WeatherForecast from "@/components/WeatherForecast";
import PredictionsCard from "@/components/PredictionsCard";
import { useDashboardData } from "@/hooks/useF1Data";

const Index = () => {
  const { 
    isRaceWeekend, 
    activeRace, 
    circuit, 
    weather, 
    predictions, 
    isLoading 
  } = useDashboardData();

  const nextEvent = activeRace?.sessions.find(session => new Date(session.time) > new Date());

  // Mock data for predictions
  const predictionData = [
    {
      name: "Você",
      avatar: "https://i.pravatar.cc/300?u=user1",
      predictions: {
        winner: "Max Verstappen",
        pole: "Charles Leclerc",
        podium: ["Max Verstappen", "Charles Leclerc", "Lando Norris"],
        winningTeam: "Red Bull Racing"
      },
      points: 35
    },
    {
      name: "Sua Namorada",
      avatar: "https://i.pravatar.cc/300?u=user2",
      predictions: {
        winner: "Lando Norris",
        pole: "Max Verstappen",
        podium: ["Lando Norris", "Max Verstappen", "Lewis Hamilton"],
        winningTeam: "McLaren"
      },
      points: 28
    }
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 animate-fade-in">
          {isRaceWeekend ? "Fim de Semana de Corrida" : "Fórmula 1 Dashboard"}
        </h1>
        <p className="text-muted-foreground animate-fade-in">
          {isRaceWeekend
            ? `${activeRace?.grandPrix} - Acompanhe em tempo real`
            : "Estatísticas, previsões e análises da temporada"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Countdown timer */}
        <div className="f1-dashboard-item md:col-span-2">
          {nextEvent && (
            <CountdownTimer 
              targetDate={nextEvent.time} 
              eventName={`${activeRace?.grandPrix} - ${nextEvent.name}`}
            />
          )}
        </div>

        {/* Palpites */}
        <div className="f1-dashboard-item">
          <PredictionsCard predictions={predictionData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Circuit info */}
        {circuit && (
          <div className="f1-dashboard-item">
            <CircuitInfo 
              name={circuit.name}
              location={circuit.location}
              country={circuit.country}
              length={circuit.length}
              turns={circuit.turns}
              lapRecord={circuit.lapRecord}
              firstGP={circuit.firstGP}
              image={circuit.image}
            />
          </div>
        )}

        {/* Schedule */}
        {activeRace && (
          <div className="f1-dashboard-item">
            <RaceWeekendSchedule events={activeRace.sessions} />
          </div>
        )}

        {/* Weather Forecast */}
        {weather && weather.length > 0 && (
          <div className="f1-dashboard-item">
            <WeatherForecast 
              location={`${circuit?.location}, ${circuit?.country}`}
              forecast={weather}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Driver Standings */}
        <div className="f1-dashboard-item">
          <StandingsCard type="drivers" />
        </div>

        {/* Constructor Standings */}
        <div className="f1-dashboard-item">
          <StandingsCard type="constructors" />
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-50">
          <div className="f1-glass p-8 rounded-xl">
            <div className="w-16 h-16 border-4 border-f1-red rounded-full border-t-transparent animate-spin mb-4 mx-auto"></div>
            <p className="text-center font-medium">Carregando dados da F1...</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;
