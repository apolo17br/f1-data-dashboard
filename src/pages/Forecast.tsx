
import { useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dados simulados para as previsões
const generateForecastData = () => {
  const circuits = [
    { id: "australia", name: "Austrália", city: "Melbourne" },
    { id: "bahrain", name: "Bahrein", city: "Sakhir" },
    { id: "jeddah", name: "Arábia Saudita", city: "Jeddah" },
    { id: "china", name: "China", city: "Xangai" },
    { id: "miami", name: "Miami", city: "Miami" }
  ];
  
  // Histórico das últimas 5 temporadas para o circuito selecionado
  const historyData = {
    australia: {
      winners: [
        { driver: "Verstappen", team: "Red Bull", year: 2024, count: 1 },
        { driver: "Sainz", team: "Ferrari", year: 2023, count: 1 },
        { driver: "Leclerc", team: "Ferrari", year: 2022, count: 1 },
        { driver: "Bottas", team: "Mercedes", year: 2021, count: 1 },
        { driver: "Hamilton", team: "Mercedes", year: 2020, count: 1 }
      ],
      lapTimes: [
        { year: 2024, time: "1:24.315", driver: "Verstappen" },
        { year: 2023, time: "1:24.896", driver: "Sainz" },
        { year: 2022, time: "1:25.247", driver: "Leclerc" },
        { year: 2021, time: "1:25.580", driver: "Bottas" },
        { year: 2020, time: "1:24.303", driver: "Hamilton" }
      ],
      incidents: [
        { year: 2024, crashes: 3, yellowFlags: 2, safetyCarPeriods: 1 },
        { year: 2023, crashes: 2, yellowFlags: 3, safetyCarPeriods: 1 },
        { year: 2022, crashes: 4, yellowFlags: 5, safetyCarPeriods: 2 },
        { year: 2021, crashes: 1, yellowFlags: 2, safetyCarPeriods: 0 },
        { year: 2020, crashes: 2, yellowFlags: 4, safetyCarPeriods: 1 }
      ],
      overtakes: [
        { year: 2024, count: 42 },
        { year: 2023, count: 35 },
        { year: 2022, count: 48 },
        { year: 2021, count: 28 },
        { year: 2020, count: 37 }
      ],
      raceDuration: [
        { year: 2024, duration: "1:32:46" },
        { year: 2023, duration: "1:35:22" },
        { year: 2022, duration: "1:31:17" },
        { year: 2021, duration: "1:34:08" },
        { year: 2020, duration: "1:33:56" }
      ]
    },
    // Dados similares para outros circuitos
    bahrain: {
      winners: [
        { driver: "Verstappen", team: "Red Bull", year: 2024, count: 1 },
        { driver: "Verstappen", team: "Red Bull", year: 2023, count: 1 },
        { driver: "Leclerc", team: "Ferrari", year: 2022, count: 1 },
        { driver: "Hamilton", team: "Mercedes", year: 2021, count: 1 },
        { driver: "Hamilton", team: "Mercedes", year: 2020, count: 1 }
      ],
      lapTimes: [
        { year: 2024, time: "1:32.608", driver: "Verstappen" },
        { year: 2023, time: "1:33.196", driver: "Zhou" },
        { year: 2022, time: "1:34.570", driver: "Leclerc" },
        { year: 2021, time: "1:32.090", driver: "Bottas" },
        { year: 2020, time: "1:32.014", driver: "Hamilton" }
      ],
      incidents: [
        { year: 2024, crashes: 1, yellowFlags: 1, safetyCarPeriods: 0 },
        { year: 2023, crashes: 2, yellowFlags: 3, safetyCarPeriods: 1 },
        { year: 2022, crashes: 2, yellowFlags: 2, safetyCarPeriods: 1 },
        { year: 2021, crashes: 0, yellowFlags: 1, safetyCarPeriods: 0 },
        { year: 2020, crashes: 3, yellowFlags: 4, safetyCarPeriods: 2 }
      ],
      overtakes: [
        { year: 2024, count: 45 },
        { year: 2023, count: 52 },
        { year: 2022, count: 58 },
        { year: 2021, count: 40 },
        { year: 2020, count: 48 }
      ],
      raceDuration: [
        { year: 2024, duration: "1:30:18" },
        { year: 2023, duration: "1:33:56" },
        { year: 2022, duration: "1:37:33" },
        { year: 2021, duration: "1:32:03" },
        { year: 2020, duration: "1:34:21" }
      ]
    },
    // Adicione mais circuitos conforme necessário
    miami: {
      winners: [
        { driver: "Norris", team: "McLaren", year: 2024, count: 1 },
        { driver: "Verstappen", team: "Red Bull", year: 2023, count: 1 },
        { driver: "Verstappen", team: "Red Bull", year: 2022, count: 1 },
        { driver: "Verstappen", team: "Red Bull", year: 2021, count: 1 },
        { driver: "Hamilton", team: "Mercedes", year: 2020, count: 1 }
      ],
      lapTimes: [
        { year: 2024, time: "1:29.815", driver: "Norris" },
        { year: 2023, time: "1:29.708", driver: "Verstappen" },
        { year: 2022, time: "1:30.502", driver: "Verstappen" },
        { year: 2021, time: "1:31.392", driver: "Verstappen" },
        { year: 2020, time: "1:31.087", driver: "Hamilton" }
      ],
      incidents: [
        { year: 2024, crashes: 2, yellowFlags: 3, safetyCarPeriods: 1 },
        { year: 2023, crashes: 1, yellowFlags: 2, safetyCarPeriods: 1 },
        { year: 2022, crashes: 3, yellowFlags: 4, safetyCarPeriods: 2 },
        { year: 2021, crashes: 2, yellowFlags: 3, safetyCarPeriods: 1 },
        { year: 2020, crashes: 1, yellowFlags: 2, safetyCarPeriods: 0 }
      ],
      overtakes: [
        { year: 2024, count: 38 },
        { year: 2023, count: 30 },
        { year: 2022, count: 45 },
        { year: 2021, count: 32 },
        { year: 2020, count: 28 }
      ],
      raceDuration: [
        { year: 2024, duration: "1:28:12" },
        { year: 2023, duration: "1:30:35" },
        { year: 2022, duration: "1:33:59" },
        { year: 2021, duration: "1:31:47" },
        { year: 2020, duration: "1:29:03" }
      ]
    }
  };
  
  // Dados de previsão para o próximo GP
  const nextRacePredictions = {
    australia: {
      winnerPrediction: [
        { name: "Verstappen", probability: 40 },
        { name: "Norris", probability: 25 },
        { name: "Leclerc", probability: 20 },
        { name: "Hamilton", probability: 10 },
        { name: "Russell", probability: 5 }
      ],
      expectedLapTime: "1:24.100",
      expectedOvertakes: 45,
      safetyCarProbability: 75,
      wetRaceProbability: 15,
      podiumPrediction: ["Verstappen", "Norris", "Leclerc"]
    },
    bahrain: {
      winnerPrediction: [
        { name: "Verstappen", probability: 45 },
        { name: "Leclerc", probability: 25 },
        { name: "Sainz", probability: 15 },
        { name: "Norris", probability: 10 },
        { name: "Piastri", probability: 5 }
      ],
      expectedLapTime: "1:32.250",
      expectedOvertakes: 50,
      safetyCarProbability: 60,
      wetRaceProbability: 5,
      podiumPrediction: ["Verstappen", "Leclerc", "Sainz"]
    },
    miami: {
      winnerPrediction: [
        { name: "Verstappen", probability: 35 },
        { name: "Norris", probability: 30 },
        { name: "Leclerc", probability: 20 },
        { name: "Hamilton", probability: 10 },
        { name: "Sainz", probability: 5 }
      ],
      expectedLapTime: "1:29.500",
      expectedOvertakes: 40,
      safetyCarProbability: 70,
      wetRaceProbability: 20,
      podiumPrediction: ["Norris", "Verstappen", "Leclerc"]
    }
    // Adicione mais circuitos conforme necessário
  };
  
  return { circuits, historyData, nextRacePredictions };
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const Forecast = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const [selectedCircuit, setSelectedCircuit] = useState<string>("miami");
  
  const { circuits, historyData, nextRacePredictions } = generateForecastData();
  
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };
  
  const handleCircuitChange = (circuitId: string) => {
    setSelectedCircuit(circuitId);
  };
  
  // Obtém os dados do circuito selecionado
  const circuitHistory = historyData[selectedCircuit as keyof typeof historyData];
  const predictions = nextRacePredictions[selectedCircuit as keyof typeof nextRacePredictions];
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Previsão</h1>
          <p className="text-muted-foreground">
            Análise histórica e previsões para o próximo Grande Prêmio
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Selecione o Circuito</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              defaultValue={selectedCircuit} 
              onValueChange={handleCircuitChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um circuito" />
              </SelectTrigger>
              <SelectContent>
                {circuits.map(circuit => (
                  <SelectItem key={circuit.id} value={circuit.id}>
                    {circuit.name} ({circuit.city})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="historico" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="previsoes">Previsões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="historico">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Vencedores Anteriores</CardTitle>
                <CardDescription>
                  Pilotos vencedores nas últimas 5 temporadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={circuitHistory.winners}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" name="Vitórias" fill="#8884d8">
                        {circuitHistory.winners.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Detalhes dos Vencedores</h3>
                  <div className="space-y-2">
                    {circuitHistory.winners.map((winner, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          ></div>
                          <span>{winner.year}</span>
                        </div>
                        <div>
                          <span className="font-medium">{winner.driver}</span>
                          <span className="text-xs text-muted-foreground ml-2">({winner.team})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Voltas Mais Rápidas</CardTitle>
                <CardDescription>
                  Evolução dos tempos de volta mais rápidos por ano
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={circuitHistory.lapTimes.map(lt => ({
                        ...lt,
                        // Convertendo tempos de volta para segundos para o gráfico
                        timeInSeconds: parseFloat(lt.time.split(":")[0]) * 60 + parseFloat(lt.time.split(":")[1])
                      }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                      <Tooltip 
                        formatter={(value: any) => {
                          const minutes = Math.floor(Number(value) / 60);
                          const seconds = (Number(value) % 60).toFixed(3);
                          return `${minutes}:${seconds.padStart(6, '0')}`;
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="timeInSeconds" 
                        name="Tempo de volta" 
                        stroke="#ff4d4f" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Detalhes das Voltas Mais Rápidas</h3>
                  <div className="space-y-2">
                    {circuitHistory.lapTimes.map((lapTime, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded-md">
                        <span>{lapTime.year}</span>
                        <div>
                          <span className="font-mono font-medium">{lapTime.time}</span>
                          <span className="text-xs text-muted-foreground ml-2">({lapTime.driver})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incidentes em Corrida</CardTitle>
                <CardDescription>
                  Histórico de acidentes e bandeiras amarelas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={circuitHistory.incidents}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="crashes" name="Acidentes" fill="#ff4d4f" />
                      <Bar dataKey="yellowFlags" name="Bandeiras Amarelas" fill="#faad14" />
                      <Bar dataKey="safetyCarPeriods" name="Safety Car" fill="#13c2c2" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ultrapassagens</CardTitle>
                <CardDescription>
                  Número de ultrapassagens por temporada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={circuitHistory.overtakes}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        name="Ultrapassagens" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <span className="font-medium">Média de Ultrapassagens</span>
                    <span className="text-lg font-semibold">
                      {Math.round(circuitHistory.overtakes.reduce((sum, item) => sum + item.count, 0) / circuitHistory.overtakes.length)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="previsoes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Probabilidade de Vitória</CardTitle>
                <CardDescription>
                  Chances de cada piloto vencer o GP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={predictions.winnerPrediction}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="probability"
                      >
                        {predictions.winnerPrediction.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Previsão de Pódio</CardTitle>
                <CardDescription>
                  Prováveis pilotos no top 3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[300px] space-y-6">
                  <div className="flex items-end justify-center w-full space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-24 bg-[#FFBB28] flex items-center justify-center rounded-t-md">
                        <span className="text-xl font-bold">2</span>
                      </div>
                      <div className="bg-muted px-4 py-2 rounded-b-md text-center">
                        <span className="font-medium">{predictions.podiumPrediction[1]}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-32 bg-[#0088FE] flex items-center justify-center rounded-t-md">
                        <span className="text-xl font-bold">1</span>
                      </div>
                      <div className="bg-muted px-4 py-2 rounded-b-md text-center">
                        <span className="font-medium">{predictions.podiumPrediction[0]}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-[#00C49F] flex items-center justify-center rounded-t-md">
                        <span className="text-xl font-bold">3</span>
                      </div>
                      <div className="bg-muted px-4 py-2 rounded-b-md text-center">
                        <span className="font-medium">{predictions.podiumPrediction[2]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tempo de Volta Esperado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[150px]">
                  <span className="text-3xl font-mono font-bold">{predictions.expectedLapTime}</span>
                  <span className="text-sm text-muted-foreground mt-2">Tempo estimado para a volta mais rápida</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Probabilidade de Safety Car</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[150px]">
                  <div className="w-24 h-24 rounded-full border-8 border-primary flex items-center justify-center">
                    <span className="text-2xl font-bold">{predictions.safetyCarProbability}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ultrapassagens Esperadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-[150px]">
                  <span className="text-4xl font-bold">{predictions.expectedOvertakes}</span>
                  <span className="text-sm text-muted-foreground mt-2">Ultrapassagens previstas</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Forecast;
