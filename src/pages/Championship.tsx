
import { useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dados fictícios para evolução do campeonato
const generateChampionshipData = () => {
  // Pilotos principais
  const drivers = [
    { id: "VER", name: "Verstappen", team: "Red Bull", color: "#0600EF" },
    { id: "LEC", name: "Leclerc", team: "Ferrari", color: "#DC0000" },
    { id: "NOR", name: "Norris", team: "McLaren", color: "#FF8700" },
    { id: "HAM", name: "Hamilton", team: "Mercedes", color: "#00D2BE" },
    { id: "PIA", name: "Piastri", team: "McLaren", color: "#FF8700" }
  ];

  // Equipes
  const teams = [
    { id: "RBR", name: "Red Bull Racing", color: "#0600EF" },
    { id: "FER", name: "Ferrari", color: "#DC0000" },
    { id: "MCL", name: "McLaren", color: "#FF8700" },
    { id: "MER", name: "Mercedes", color: "#00D2BE" },
    { id: "AST", name: "Aston Martin", color: "#006F62" }
  ];

  // Nome dos GPs
  const races = [
    "Bahrein", "Arábia Saudita", "Austrália", "Japão", "China", 
    "Miami", "Emilia Romagna", "Mônaco", "Canadá", "Espanha", 
    "Áustria", "Reino Unido", "Hungria", "Bélgica", "Holanda"
  ];

  // Gerar pontuações acumulativas para pilotos
  let driverData: any[] = [];
  let driverPoints: Record<string, number> = {};
  
  drivers.forEach(driver => { driverPoints[driver.id] = 0; });
  
  races.forEach((race, index) => {
    // Simular pontos aleatórios para cada piloto na corrida
    drivers.forEach(driver => {
      // Gerar pontos da corrida entre 0 e 25 (com favorecimento para alguns pilotos)
      const racePoints = Math.floor(Math.random() * 26) * (driver.id === "VER" ? 1.2 : 1);
      driverPoints[driver.id] += racePoints;
    });
    
    // Criar objeto com pontuação acumulada
    const raceData: any = { race };
    drivers.forEach(driver => {
      raceData[driver.id] = driverPoints[driver.id];
    });
    
    driverData.push(raceData);
  });

  // Gerar pontuações acumulativas para equipes
  let teamData: any[] = [];
  let teamPoints: Record<string, number> = {};
  
  teams.forEach(team => { teamPoints[team.id] = 0; });
  
  races.forEach((race, index) => {
    // Simular pontos aleatórios para cada equipe na corrida
    teams.forEach(team => {
      // Gerar pontos da corrida entre 0 e 40
      const racePoints = Math.floor(Math.random() * 41) * (team.id === "RBR" ? 1.1 : 1);
      teamPoints[team.id] += racePoints;
    });
    
    // Criar objeto com pontuação acumulada
    const raceData: any = { race };
    teams.forEach(team => {
      raceData[team.id] = teamPoints[team.id];
    });
    
    teamData.push(raceData);
  });

  return { drivers, teams, driverData, teamData };
};

const Championship = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const { drivers, teams, driverData, teamData } = generateChampionshipData();
  
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Campeonato</h1>
          <p className="text-muted-foreground">
            Acompanhe a evolução e disputas do campeonato de {selectedSeason}
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>

      <Tabs defaultValue="drivers" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="drivers">Pilotos</TabsTrigger>
          <TabsTrigger value="constructors">Construtores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="drivers">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Campeonato de Pilotos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={driverData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="race" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border p-4 rounded-md shadow-md">
                              <p className="font-bold mb-2">GP de {label}</p>
                              <div className="space-y-1">
                                {payload.map((entry, index) => {
                                  const driver = drivers.find(d => d.id === entry.dataKey);
                                  return (
                                    <div key={index} className="flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-2">
                                        <div 
                                          className="w-3 h-3 rounded-full" 
                                          style={{ backgroundColor: entry.stroke }}
                                        ></div>
                                        <span>{driver?.name}</span>
                                      </div>
                                      <span className="font-mono font-medium">{entry.value} pts</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      content={({ payload }) => (
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                          {payload?.map((entry, index) => {
                            const driver = drivers.find(d => d.id === entry.dataKey);
                            return (
                              <div key={index} className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: entry.color }}
                                ></div>
                                <span>{driver?.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    />
                    {drivers.map(driver => (
                      <Line 
                        key={driver.id}
                        type="monotone" 
                        dataKey={driver.id} 
                        name={driver.name}
                        stroke={driver.color} 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {drivers.map((driver, index) => {
              const latestPoints = driverData[driverData.length - 1][driver.id];
              const position = drivers
                .map(d => ({ id: d.id, points: driverData[driverData.length - 1][d.id] }))
                .sort((a, b) => b.points - a.points)
                .findIndex(d => d.id === driver.id) + 1;
              
              return (
                <div 
                  key={index} 
                  className="border border-border rounded-lg p-4 flex items-center gap-4"
                  style={{ borderLeftColor: driver.color, borderLeftWidth: 4 }}
                >
                  <div className="text-2xl font-bold text-muted-foreground">
                    {position}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{driver.name}</div>
                    <div className="text-sm text-muted-foreground">{driver.team}</div>
                  </div>
                  <div className="font-mono font-bold text-xl">
                    {latestPoints}<span className="text-muted-foreground text-sm"> pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="constructors">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Campeonato de Construtores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={teamData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="race" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border p-4 rounded-md shadow-md">
                              <p className="font-bold mb-2">GP de {label}</p>
                              <div className="space-y-1">
                                {payload.map((entry, index) => {
                                  const team = teams.find(t => t.id === entry.dataKey);
                                  return (
                                    <div key={index} className="flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-2">
                                        <div 
                                          className="w-3 h-3 rounded-full" 
                                          style={{ backgroundColor: entry.stroke }}
                                        ></div>
                                        <span>{team?.name}</span>
                                      </div>
                                      <span className="font-mono font-medium">{entry.value} pts</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      content={({ payload }) => (
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                          {payload?.map((entry, index) => {
                            const team = teams.find(t => t.id === entry.dataKey);
                            return (
                              <div key={index} className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: entry.color }}
                                ></div>
                                <span>{team?.name}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    />
                    {teams.map(team => (
                      <Area 
                        key={team.id}
                        type="monotone" 
                        dataKey={team.id} 
                        name={team.name}
                        stroke={team.color} 
                        fill={team.color}
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {teams.map((team, index) => {
              const latestPoints = teamData[teamData.length - 1][team.id];
              const position = teams
                .map(t => ({ id: t.id, points: teamData[teamData.length - 1][t.id] }))
                .sort((a, b) => b.points - a.points)
                .findIndex(t => t.id === team.id) + 1;
              
              return (
                <div 
                  key={index} 
                  className="border border-border rounded-lg p-4 flex items-center gap-4"
                  style={{ borderLeftColor: team.color, borderLeftWidth: 4 }}
                >
                  <div className="text-2xl font-bold text-muted-foreground">
                    {position}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{team.name}</div>
                  </div>
                  <div className="font-mono font-bold text-xl">
                    {latestPoints}<span className="text-muted-foreground text-sm"> pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Championship;
