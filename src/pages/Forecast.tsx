import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useConstructors } from "@/hooks/useConstructorsData";
import SeasonSelector from "@/components/SeasonSelector";
import { CircleDashed } from "lucide-react";

const Forecast = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2024);
  const { data: constructors } = useConstructors();

  // Dados simulados para demonstração
  const mockPredictions = [
    { team: "Red Bull Racing", winProbability: 0.45, trackSuitability: 0.85, historicalPerformance: 0.90 },
    { team: "Ferrari", winProbability: 0.25, trackSuitability: 0.75, historicalPerformance: 0.80 },
    { team: "Mercedes", winProbability: 0.20, trackSuitability: 0.70, historicalPerformance: 0.85 },
    { team: "McLaren", winProbability: 0.10, trackSuitability: 0.65, historicalPerformance: 0.70 },
  ];

  const weatherImpact = {
    rain: { team: "Red Bull Racing", advantage: "+15%" },
    sunny: { team: "Ferrari", advantage: "+10%" },
    cloudy: { team: "Mercedes", advantage: "+5%" }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Previsões para Próximas Corridas</h1>
            <p className="text-muted-foreground">
              Análise preditiva baseada em dados históricos, condições da pista e clima
            </p>
          </div>
          <SeasonSelector onChange={setSelectedSeason} defaultSeason={selectedSeason} />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Próximo GP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">GP do Brasil</div>
              <p className="text-sm text-muted-foreground">Interlagos, São Paulo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Condições Previstas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Parcialmente Nublado</div>
              <p className="text-sm text-muted-foreground">22°C, 60% umidade</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Favorito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Red Bull Racing</div>
              <p className="text-sm text-muted-foreground">45% chance de vitória</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="probabilidades" className="space-y-4">
          <TabsList>
            <TabsTrigger value="probabilidades">Probabilidades</TabsTrigger>
            <TabsTrigger value="clima">Impacto do Clima</TabsTrigger>
            <TabsTrigger value="historico">Histórico da Pista</TabsTrigger>
          </TabsList>

          <TabsContent value="probabilidades">
            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipe</TableHead>
                      <TableHead>Prob. Vitória</TableHead>
                      <TableHead>Adequação à Pista</TableHead>
                      <TableHead>Performance Histórica</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPredictions.map((pred) => (
                      <TableRow key={pred.team}>
                        <TableCell className="font-medium">{pred.team}</TableCell>
                        <TableCell>{(pred.winProbability * 100).toFixed(1)}%</TableCell>
                        <TableCell>{(pred.trackSuitability * 100).toFixed(1)}%</TableCell>
                        <TableCell>{(pred.historicalPerformance * 100).toFixed(1)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clima">
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Chuva</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{weatherImpact.rain.team}</p>
                      <p className="text-sm text-muted-foreground">Vantagem: {weatherImpact.rain.advantage}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sol</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{weatherImpact.sunny.team}</p>
                      <p className="text-sm text-muted-foreground">Vantagem: {weatherImpact.sunny.advantage}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Nublado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">{weatherImpact.cloudy.team}</p>
                      <p className="text-sm text-muted-foreground">Vantagem: {weatherImpact.cloudy.advantage}</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center p-8">
                  <div className="flex flex-col items-center gap-4">
                    <CircleDashed className="h-16 w-16 animate-spin text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Dados históricos da pista serão implementados em breve
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Forecast;
