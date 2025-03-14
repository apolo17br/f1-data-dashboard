
import { useState } from "react";
import Layout from "@/components/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import SeasonSelector from "@/components/SeasonSelector";
import { useRaceCalendar } from "@/hooks/useF1Data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RaceWeekend } from "@/types/f1.types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MapPin, Calendar as CalendarIcon, Clock } from "lucide-react";

const Calendar = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { data: raceCalendar = [], isLoading } = useRaceCalendar();
  
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  // Função para encontrar o GP na data selecionada
  const findRaceOnDate = (date: Date | undefined): RaceWeekend | undefined => {
    if (!date) return undefined;
    
    return raceCalendar.find(race => {
      const startDate = new Date(race.startDate);
      const endDate = new Date(race.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const selectedRace = findRaceOnDate(selectedDate);

  // Função para determinar os dias que têm eventos
  const getHighlightedDays = () => {
    const days: Date[] = [];
    
    raceCalendar.forEach(race => {
      const start = new Date(race.startDate);
      const end = new Date(race.endDate);
      
      // Adicionar todos os dias entre start e end
      let current = new Date(start);
      while (current <= end) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });
    
    return days;
  };

  const highlightedDays = getHighlightedDays();

  // Função para formatar a data em português
  const formatDate = (date: Date) => {
    return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendário de Corridas</h1>
          <p className="text-muted-foreground">
            Programação completa da temporada {selectedSeason} de Fórmula 1
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Selecione uma Data</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                modifiers={{ highlight: highlightedDays }}
                modifiersStyles={{
                  highlight: { 
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderRadius: '0px'
                  }
                }}
                className="rounded-md border"
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500/10 rounded-sm"></div>
                  <span>Dias com eventos de Fórmula 1</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="w-12 h-12 border-4 border-t-f1-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : selectedRace ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{selectedRace.grandPrix}</CardTitle>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedRace.location}, {selectedRace.country}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Data do Evento</span>
                    </h3>
                    <p>
                      {formatDate(new Date(selectedRace.startDate))} até {formatDate(new Date(selectedRace.endDate))}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Programação</span>
                    </h3>
                    <div className="space-y-2">
                      {selectedRace.sessions.map((session, idx) => (
                        <div key={idx} className="p-3 border border-border rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getSessionColor(session.type)}`}></div>
                              <span className="font-medium">{session.name}</span>
                            </div>
                            <div className="text-sm font-mono">{format(new Date(session.time), "dd/MM/yyyy HH:mm")}</div>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            Duração: {session.duration} minutos
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Nenhum evento selecionado</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Selecione uma data no calendário para ver os detalhes do evento.
                </p>
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Próximos Grandes Prêmios:</h3>
                  <div className="space-y-2">
                    {raceCalendar
                      .filter(race => new Date(race.startDate) > new Date())
                      .slice(0, 3)
                      .map((race, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                          <div>
                            <div className="font-medium">{race.grandPrix}</div>
                            <div className="text-sm text-muted-foreground">
                              {race.location}, {race.country}
                            </div>
                          </div>
                          <div className="text-sm font-mono">
                            {format(new Date(race.startDate), "dd/MM/yyyy")}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Temporada {selectedSeason} - Calendário Completo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[100px]">
                  <div className="w-8 h-8 border-2 border-t-f1-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
              ) : raceCalendar.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {raceCalendar.map((race, idx) => {
                    const startDate = new Date(race.startDate);
                    const endDate = new Date(race.endDate);
                    return (
                      <div
                        key={idx}
                        className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
                        onClick={() => setSelectedDate(new Date(race.startDate))}
                      >
                        <div className="flex justify-between mb-2">
                          <span className="font-mono text-muted-foreground text-sm">GP {idx + 1}</span>
                          <span className="font-mono text-sm">
                            {format(startDate, "dd/MM")}-{format(endDate, "dd/MM")}
                          </span>
                        </div>
                        <h3 className="font-bold mb-1">{race.grandPrix}</h3>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{race.location}, {race.country}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  Nenhum dado disponível para a temporada {selectedSeason}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Função auxiliar para colorir os diferentes tipos de sessão
function getSessionColor(sessionType: string): string {
  switch (sessionType) {
    case "practice":
      return "bg-blue-500";
    case "qualifying":
      return "bg-purple-500";
    case "sprint":
      return "bg-amber-500";
    case "race":
      return "bg-f1-red";
    default:
      return "bg-gray-500";
  }
}

export default Calendar;
