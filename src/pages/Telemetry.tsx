
import { useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Dados simulados para telemetria
const generateTelemetryData = () => {
  // Lista de pilotos
  const drivers = [
    { id: "VER", name: "Verstappen", team: "Red Bull", color: "#0600EF" },
    { id: "LEC", name: "Leclerc", team: "Ferrari", color: "#DC0000" },
    { id: "NOR", name: "Norris", team: "McLaren", color: "#FF8700" },
    { id: "HAM", name: "Hamilton", team: "Mercedes", color: "#00D2BE" },
    { id: "ALO", name: "Alonso", team: "Aston Martin", color: "#006F62" }
  ];

  // Lista de circuitos
  const circuits = [
    { id: "bahrain", name: "Bahrein" },
    { id: "jeddah", name: "Jeddah" },
    { id: "albert_park", name: "Albert Park" },
    { id: "suzuka", name: "Suzuka" },
    { id: "shanghai", name: "Shanghai" }
  ];

  // Gerar dados para comparação de telemetria em uma volta
  const lapTelemetryData = [];
  const sectors = 20; // Dividir a volta em 20 setores
  
  for (let i = 0; i < sectors; i++) {
    const sectorData: any = { sector: i + 1 };
    
    drivers.forEach(driver => {
      // Velocidade base entre 250 e 320 km/h
      let baseSpeed = 250 + Math.floor(Math.random() * 70);
      
      // Alguns pilotos têm vantagem em determinados setores
      if (driver.id === "VER" && i >= 5 && i <= 10) baseSpeed += 5;
      if (driver.id === "LEC" && i >= 12 && i <= 15) baseSpeed += 8;
      if (driver.id === "NOR" && i >= 1 && i <= 3) baseSpeed += 6;
      
      sectorData[`${driver.id}_speed`] = baseSpeed;
      
      // Aceleração (0-100%)
      sectorData[`${driver.id}_throttle`] = Math.min(100, 70 + Math.floor(Math.random() * 30));
      
      // Frenagem (0-100%)
      sectorData[`${driver.id}_brake`] = Math.min(100, Math.floor(Math.random() * 80));
    });
    
    lapTelemetryData.push(sectorData);
  }

  // Gerar dados de desgaste de pneus
  const tireDegradationData = [];
  const laps = 15; // Simular 15 voltas
  
  for (let lap = 1; lap <= laps; lap++) {
    const lapData: any = { lap };
    
    drivers.forEach(driver => {
      // Desgaste começa em 100% e diminui a cada volta
      // Alguns pilotos são mais gentis com os pneus
      const baseDegradation = driver.id === "HAM" ? 2.5 : 3.5;
      const randomFactor = 0.5 + Math.random();
      
      lapData[driver.id] = Math.max(0, 100 - (lap * baseDegradation * randomFactor));
    });
    
    tireDegradationData.push(lapData);
  }

  return { drivers, circuits, lapTelemetryData, tireDegradationData };
};

const Telemetry = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const [selectedDriver, setSelectedDriver] = useState<string>("VER");
  const [selectedCircuit, setSelectedCircuit] = useState<string>("bahrain");
  
  const { drivers, circuits, lapTelemetryData, tireDegradationData } = generateTelemetryData();
  
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  const handleDriverChange = (driverId: string) => {
    setSelectedDriver(driverId);
  };

  const handleCircuitChange = (circuitId: string) => {
    setSelectedCircuit(circuitId);
  };

  // Encontrar o piloto selecionado
  const selectedDriverObj = drivers.find(d => d.id === selectedDriver);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Telemetria</h1>
          <p className="text-muted-foreground">
            Análise detalhada do desempenho dos carros e pilotos
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Piloto</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              defaultValue={selectedDriver} 
              onValueChange={handleDriverChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um piloto" />
              </SelectTrigger>
              <SelectContent>
                {drivers.map(driver => (
                  <SelectItem key={driver.id} value={driver.id}>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: driver.color }}
                      ></div>
                      <span>{driver.name} ({driver.team})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Circuito</CardTitle>
          </CardHeader>
          <CardContent>
            <Select 
              defaultValue={selectedCircuit} 
              onValueChange={handleCircuitChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um circuito" />
              </SelectTrigger>
              <SelectContent>
                {circuits.map(circuit => (
                  <SelectItem key={circuit.id} value={circuit.id}>
                    {circuit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sessão</CardTitle>
          </CardHeader>
          <CardContent>
            <Select defaultValue="race">
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma sessão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fp1">Treino Livre 1</SelectItem>
                <SelectItem value="fp2">Treino Livre 2</SelectItem>
                <SelectItem value="fp3">Treino Livre 3</SelectItem>
                <SelectItem value="qualifying">Classificação</SelectItem>
                <SelectItem value="race">Corrida</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="speed" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="speed">Velocidade</TabsTrigger>
          <TabsTrigger value="throttle">Acelerador</TabsTrigger>
          <TabsTrigger value="brake">Freio</TabsTrigger>
          <TabsTrigger value="tires">Pneus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="speed">
          <Card>
            <CardHeader>
              <CardTitle>Comparação de Velocidade por Setor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lapTelemetryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" label={{ value: 'Setor da Volta', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis domain={[200, 350]} label={{ value: 'Velocidade (km/h)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border p-3 rounded-md shadow-md">
                              <p className="font-medium">Setor {label}</p>
                              <div className="mt-2 space-y-1">
                                {payload.map((entry, index) => {
                                  // Safely extract the driver ID from the dataKey string
                                  const dataKey = String(entry.dataKey);
                                  const driverId = dataKey.includes("_") ? dataKey.split("_")[0] : "";
                                  const driver = drivers.find(d => d.id === driverId);
                                  return (
                                    <div key={index} className="flex items-center justify-between gap-4">
                                      <div className="flex items-center gap-2">
                                        <div 
                                          className="w-3 h-3 rounded-full" 
                                          style={{ backgroundColor: driver?.color }}
                                        ></div>
                                        <span>{driver?.name}</span>
                                      </div>
                                      <span className="font-mono">{entry.value} km/h</span>
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
                      content={({ payload }) => {
                        if (!payload) return null;
                        return (
                          <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {payload.map((entry, index) => {
                              // Safely extract the driver ID from the dataKey
                              const dataKey = String(entry.dataKey);
                              const driverId = dataKey.includes("_") ? dataKey.split("_")[0] : "";
                              const driver = drivers.find(d => d.id === driverId);
                              if (!driver) return null;
                              return (
                                <div key={index} className="flex items-center gap-2">
                                  <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: entry.color }}
                                  ></div>
                                  <span>{driver.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }}
                    />
                    {drivers.map(driver => (
                      <Line 
                        key={driver.id}
                        type="monotone" 
                        dataKey={`${driver.id}_speed`} 
                        name={driver.name}
                        stroke={driver.color} 
                        strokeWidth={driver.id === selectedDriver ? 3 : 1.5}
                        dot={driver.id === selectedDriver ? { r: 4 } : false}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="throttle">
          <Card>
            <CardHeader>
              <CardTitle>Uso do Acelerador por Setor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={lapTelemetryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" label={{ value: 'Setor da Volta', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis domain={[0, 100]} label={{ value: 'Acelerador (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {drivers.filter(d => d.id === selectedDriver).map(driver => (
                      <Area
                        key={driver.id}
                        type="monotone"
                        dataKey={`${driver.id}_throttle`}
                        name={`${driver.name} - Acelerador`}
                        stroke={driver.color}
                        fill={driver.color}
                        fillOpacity={0.2}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="brake">
          <Card>
            <CardHeader>
              <CardTitle>Uso do Freio por Setor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={lapTelemetryData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sector" label={{ value: 'Setor da Volta', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis domain={[0, 100]} label={{ value: 'Freio (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {drivers.filter(d => d.id === selectedDriver).map(driver => (
                      <Area
                        key={driver.id}
                        type="monotone"
                        dataKey={`${driver.id}_brake`}
                        name={`${driver.name} - Freio`}
                        stroke="#e11d48"
                        fill="#e11d48"
                        fillOpacity={0.2}
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tires">
          <Card>
            <CardHeader>
              <CardTitle>Degradação dos Pneus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={tireDegradationData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="lap" label={{ value: 'Volta', position: 'insideBottomRight', offset: -10 }} />
                    <YAxis domain={[0, 100]} label={{ value: 'Condição do Pneu (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    {drivers.map(driver => (
                      <Line 
                        key={driver.id}
                        type="monotone" 
                        dataKey={driver.id} 
                        name={driver.name}
                        stroke={driver.color} 
                        strokeWidth={driver.id === selectedDriver ? 3 : 1.5}
                        dot={driver.id === selectedDriver ? { r: 4 } : false}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedDriverObj && (
        <Card>
          <CardHeader>
            <CardTitle>Insights de Telemetria: {selectedDriverObj.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                A análise de telemetria de {selectedDriverObj.name} no circuito de {circuits.find(c => c.id === selectedCircuit)?.name || selectedCircuit} revela:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Velocidade máxima de {Math.max(...lapTelemetryData.map(data => data[`${selectedDriverObj.id}_speed`]))} km/h atingida no setor {lapTelemetryData.findIndex(data => data[`${selectedDriverObj.id}_speed`] === Math.max(...lapTelemetryData.map(data => data[`${selectedDriverObj.id}_speed`]))) + 1}.
                </li>
                <li>
                  {selectedDriverObj.name} tende a frear mais tarde nas curvas {[2, 7, 12].map(n => n).join(", ")}, ganhando tempo sobre seus competidores.
                </li>
                <li>
                  A degradação dos pneus após 15 voltas é de aproximadamente {Math.round(100 - tireDegradationData[tireDegradationData.length - 1][selectedDriverObj.id])}%.
                </li>
                <li>
                  No setor médio da pista (setores 8-12), {selectedDriverObj.name} mostra um desempenho {Math.random() > 0.5 ? "superior" : "inferior"} em relação aos outros pilotos.
                </li>
              </ul>
              
              <p>
                Estratégia recomendada: {Math.random() > 0.5 ? "Parada única" : "Duas paradas"} com foco em preservação de pneus nos setores iniciais da pista.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </Layout>
  );
};

export default Telemetry;
