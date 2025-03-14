
import { useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Statistics = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  // Dados de exemplo
  const driverPointsData = [
    { name: "Max Verstappen", points: 265, team: "Red Bull" },
    { name: "Lando Norris", points: 189, team: "McLaren" },
    { name: "Charles Leclerc", points: 162, team: "Ferrari" },
    { name: "Oscar Piastri", points: 143, team: "McLaren" },
    { name: "Carlos Sainz", points: 140, team: "Ferrari" },
  ];

  const overtakesData = [
    { name: "Lewis Hamilton", overtakes: 45, team: "Mercedes" },
    { name: "Fernando Alonso", overtakes: 42, team: "Aston Martin" },
    { name: "Max Verstappen", overtakes: 38, team: "Red Bull" },
    { name: "Sergio Perez", overtakes: 35, team: "Red Bull" },
    { name: "Charles Leclerc", overtakes: 32, team: "Ferrari" },
  ];

  const fastestLapsData = [
    { name: "Max Verstappen", count: 6, team: "Red Bull" },
    { name: "Charles Leclerc", count: 4, team: "Ferrari" },
    { name: "Lewis Hamilton", count: 3, team: "Mercedes" },
    { name: "Lando Norris", count: 2, team: "McLaren" },
    { name: "Fernando Alonso", count: 1, team: "Aston Martin" },
  ];

  const pitStopTimeData = [
    { name: "Red Bull", time: 2.1 },
    { name: "Ferrari", time: 2.3 },
    { name: "McLaren", time: 2.4 },
    { name: "Mercedes", time: 2.5 },
    { name: "Aston Martin", time: 2.6 },
    { name: "Williams", time: 2.7 },
    { name: "Alpine", time: 2.8 },
    { name: "RB", time: 2.9 },
    { name: "Haas", time: 3.0 },
    { name: "Sauber", time: 3.1 },
  ];

  const raceWinDistributionData = [
    { name: "Max Verstappen", value: 10, team: "Red Bull" },
    { name: "Lando Norris", value: 3, team: "McLaren" },
    { name: "Charles Leclerc", value: 2, team: "Ferrari" },
    { name: "Lewis Hamilton", value: 1, team: "Mercedes" },
    { name: "Carlos Sainz", value: 1, team: "Ferrari" },
  ];

  const TEAM_COLORS = {
    "Red Bull": "#0600EF",
    "Ferrari": "#DC0000",
    "Mercedes": "#00D2BE",
    "McLaren": "#FF8700",
    "Aston Martin": "#006F62",
    "Alpine": "#0090FF",
    "Williams": "#005AFF",
    "RB": "#2B4562",
    "Haas": "#FFFFFF",
    "Sauber": "#900000",
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Estatísticas</h1>
          <p className="text-muted-foreground">
            Análise detalhada de desempenho da temporada {selectedSeason}
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>

      <Tabs defaultValue="drivers" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="drivers">Pilotos</TabsTrigger>
          <TabsTrigger value="teams">Equipes</TabsTrigger>
          <TabsTrigger value="races">Corridas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="drivers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pontuação dos Pilotos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={driverPointsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis />
                      <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-background border border-border p-3 rounded-md shadow-md">
                              <p className="font-medium">{data.name}</p>
                              <p className="text-sm text-muted-foreground">{data.team}</p>
                              <p className="font-mono mt-1">Pontos: {data.points}</p>
                            </div>
                          );
                        }
                        return null;
                      }} />
                      <Bar dataKey="points" fill="var(--f1-red)">
                        {driverPointsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TEAM_COLORS[entry.team as keyof typeof TEAM_COLORS] || "#ccc"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ultrapassagens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={overtakesData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="overtakes" fill="#4F46E5">
                        {overtakesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TEAM_COLORS[entry.team as keyof typeof TEAM_COLORS] || "#ccc"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Vitórias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={raceWinDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={130}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {raceWinDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={TEAM_COLORS[entry.team as keyof typeof TEAM_COLORS] || "#ccc"} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name, props) => [`${value} vitórias`, props.payload.name]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio de Pit Stop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={pitStopTimeData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 4]} tickCount={5} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => [`${value}s`, "Tempo médio"]} />
                      <Bar dataKey="time" fill="#10b981">
                        {pitStopTimeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TEAM_COLORS[entry.name as keyof typeof TEAM_COLORS] || "#ccc"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Voltas Mais Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={fastestLapsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#FFB800" name="Voltas Mais Rápidas">
                        {fastestLapsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TEAM_COLORS[entry.team as keyof typeof TEAM_COLORS] || "#ccc"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="races" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Corridas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Dados de corridas para a temporada {selectedSeason} serão exibidos aqui.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Destaques da Temporada {selectedSeason}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold mb-2 text-f1-red">
                {driverPointsData[0]?.points || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Pontos do líder
              </div>
              <div className="mt-2 font-medium">
                {driverPointsData[0]?.name || "N/A"}
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold mb-2 text-amber-500">
                {raceWinDistributionData.reduce((acc, curr) => acc + curr.value, 0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Total de corridas
              </div>
              <div className="mt-2 font-medium">
                Temporada {selectedSeason}
              </div>
            </div>

            <div className="border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold mb-2 text-blue-500">
                {overtakesData[0]?.overtakes || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Recordista de ultrapassagens
              </div>
              <div className="mt-2 font-medium">
                {overtakesData[0]?.name || "N/A"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Statistics;
