
import { useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNextRaceWeekend, useCircuit, useWeatherForecast } from "@/hooks/useF1Data";
import { LineChart, BarChart, ResponsiveContainer, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Forecast = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const { data: nextRace, isLoading: isLoadingNextRace } = useNextRaceWeekend();
  
  const circuitId = nextRace?.circuitId;
  const { data: circuit, isLoading: isLoadingCircuit } = useCircuit(circuitId);
  const { data: weather, isLoading: isLoadingWeather } = useWeatherForecast(circuitId);
  
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  // Dados de simulação para previsões
  const raceSimulationData = [
    { driver: "Verstappen", chance: 35, team: "Red Bull" },
    { driver: "Norris", chance: 25, team: "McLaren" },
    { driver: "Leclerc", chance: 15, team: "Ferrari" },
    { driver: "Hamilton", chance: 10, team: "Mercedes" },
    { driver: "Sainz", chance: 8, team: "Ferrari" },
    { driver: "Russell", chance: 7, team: "Mercedes" }
  ];

  const historicalPerformanceData = [
    { year: 2020, performance: 75 },
    { year: 2021, performance: 82 },
    { year: 2022, performance: 90 },
    { year: 2023, performance: 88 },
    { year: 2024, performance: 85 }
  ];

  const weatherImpactData = [
    { condition: "Seco", performance: 95 },
    { condition: "Nublado", performance: 90 },
    { condition: "Úmido", performance: 82 },
    { condition: "Chuva Leve", performance: 75 },
    { condition: "Chuva Forte", performance: 65 }
  ];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Previsões para Corridas</h1>
          <p className="text-muted-foreground">
            Análise de dados históricos e previsões para os próximos GPs da temporada {selectedSeason}
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Próxima Corrida: {nextRace?.grandPrix || "Carregando..."}</CardTitle>
            <CardDescription>
              Previsões baseadas em dados históricos, condições da pista e clima
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingNextRace ? (
              <p>Carregando informações da próxima corrida...</p>
            ) : nextRace ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Chances de Vitória</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={raceSimulationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="driver" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="chance" fill="#8884d8" name="Probabilidade (%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Previsão de Pódio</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Posição</TableHead>
                        <TableHead>Piloto</TableHead>
                        <TableHead>Equipe</TableHead>
                        <TableHead className="text-right">Prob. (%)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {raceSimulationData.slice(0, 3).map((driver, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}º</TableCell>
                          <TableCell>{driver.driver}</TableCell>
                          <TableCell>{driver.team}</TableCell>
                          <TableCell className="text-right">{driver.chance}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <p>Nenhuma corrida agendada encontrada.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fatores de Influência</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Clima Previsto</h3>
                {isLoadingWeather ? (
                  <p>Carregando previsão do tempo...</p>
                ) : weather && weather.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {weather.slice(0, 3).map((day, index) => (
                      <div key={index} className="p-2 border rounded-md text-center">
                        <div className="font-medium">{day.day}</div>
                        <div>{day.condition}</div>
                        <div className="text-sm text-muted-foreground">
                          {day.temperature.min}° - {day.temperature.max}°
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Sem dados climáticos disponíveis.</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Impacto do Clima no Desempenho</h3>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={weatherImpactData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="condition" tick={{ fontSize: 10 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#82ca9d" name="Desempenho (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Circuito: {circuit?.name || "Carregando..."}</h3>
                {isLoadingCircuit ? (
                  <p>Carregando informações do circuito...</p>
                ) : circuit ? (
                  <div className="text-sm space-y-1">
                    <div><span className="font-medium">Local:</span> {circuit.location}, {circuit.country}</div>
                    <div><span className="font-medium">Comprimento:</span> {circuit.length}</div>
                    <div><span className="font-medium">Curvas:</span> {circuit.turns}</div>
                    <div><span className="font-medium">Recorde:</span> {circuit.lapRecord.time} ({circuit.lapRecord.driver}, {circuit.lapRecord.year})</div>
                  </div>
                ) : (
                  <p>Sem informações do circuito disponíveis.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="historico" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="historico">Histórico no Circuito</TabsTrigger>
          <TabsTrigger value="tendencias">Tendências da Temporada</TabsTrigger>
          <TabsTrigger value="equipes">Análise por Equipe</TabsTrigger>
        </TabsList>
        
        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho Histórico no Circuito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tendência de Desempenho</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={historicalPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="performance" stroke="#8884d8" name="Performance (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Análise do Circuito</h3>
                  <p>
                    Com base nos dados históricos, este circuito tende a favorecer equipes com:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Alta eficiência aerodinâmica</li>
                    <li>Bom desempenho em curvas de média velocidade</li>
                    <li>Estabilidade em condições variáveis de clima</li>
                    <li>Histórico de boas estratégias de pneus</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Recomendação Estratégica</h3>
                  <p>
                    Para maximizar o desempenho neste circuito, as equipes devem focar em:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Configuração de downforce médio a alto</li>
                    <li>Preparação para condições variáveis de pista</li>
                    <li>Estratégia flexível de pit stops</li>
                    <li>Gestão cuidadosa dos pneus nas primeiras voltas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tendencias">
          <Card>
            <CardHeader>
              <CardTitle>Tendências da Temporada Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Esta seção será expandida com mais análises de tendências da temporada atual. Os dados estão sendo coletados e processados.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipes">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Esta seção será expandida com análises detalhadas por equipe. Os dados estão sendo coletados e processados.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Forecast;
