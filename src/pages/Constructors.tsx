
import { useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import { useConstructors, useConstructorStandings } from "@/hooks/useConstructorsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Constructors = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const { data: constructors, isLoading: isLoadingConstructors } = useConstructors(selectedSeason);
  const { data: standings, isLoading: isLoadingStandings } = useConstructorStandings(selectedSeason);

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  // Preparar dados para o gráfico
  const chartData = standings?.map(standing => ({
    name: standing.constructor?.name || `ID: ${standing.constructorId}`,
    points: standing.points,
    wins: standing.wins,
    color: getTeamColor(standing.constructor?.name || "")
  })) || [];

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Construtores</h1>
          <p className="text-muted-foreground">
            Análise de desempenho e dados das equipes de Fórmula 1
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>

      {(isLoadingConstructors || isLoadingStandings) ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-t-f1-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Pontuação das Equipes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      tick={{ fontSize: 12 }}
                      height={70}
                    />
                    <YAxis />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background border border-border p-3 rounded-md shadow-md">
                              <p className="font-bold">{payload[0].payload.name}</p>
                              <p className="text-sm">Pontos: <span className="font-mono">{payload[0].value}</span></p>
                              <p className="text-sm">Vitórias: <span className="font-mono">{payload[0].payload.wins}</span></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="points" 
                      name="Pontos" 
                      fill="var(--f1-red)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vitórias por Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      tick={{ fontSize: 12 }}
                      height={70}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="wins" 
                      name="Vitórias" 
                      fill="#FFB800" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Classificação de Construtores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Pos</th>
                    <th className="text-left py-3 px-4">Equipe</th>
                    <th className="text-left py-3 px-4">Nacionalidade</th>
                    <th className="text-right py-3 px-4">Vitórias</th>
                    <th className="text-right py-3 px-4">Pontos</th>
                  </tr>
                </thead>
                <tbody>
                  {standings?.map((standing, index) => (
                    <tr 
                      key={standing.constructorStandingsId} 
                      className="border-b border-border hover:bg-secondary/50 transition-colors"
                    >
                      <td className="py-3 px-4">{standing.position}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: getTeamColor(standing.constructor?.name || "") }}
                          ></div>
                          <span className="font-medium">{standing.constructor?.name || `ID: ${standing.constructorId}`}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{standing.constructor?.nationality || "—"}</td>
                      <td className="py-3 px-4 text-right font-mono">{standing.wins}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold">{standing.points}</td>
                    </tr>
                  ))}

                  {!standings?.length && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Nenhum dado disponível para a temporada {selectedSeason}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Insights sobre as Equipes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Com base nos dados disponíveis para a temporada {selectedSeason}, podemos observar:
              </p>
              
              {chartData.length > 0 ? (
                <>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      A equipe {chartData[0]?.name} lidera a classificação com {chartData[0]?.points} pontos.
                    </li>
                    {chartData[0]?.wins > 0 && (
                      <li>
                        A equipe líder conquistou {chartData[0]?.wins} vitórias até o momento.
                      </li>
                    )}
                    {chartData.length >= 3 && (
                      <li>
                        As três primeiras equipes ({chartData[0]?.name}, {chartData[1]?.name} e {chartData[2]?.name}) 
                        acumulam um total de {chartData.slice(0, 3).reduce((sum, team) => sum + team.points, 0)} pontos.
                      </li>
                    )}
                    {chartData.filter(team => team.wins > 0).length > 1 && (
                      <li>
                        {chartData.filter(team => team.wins > 0).length} equipes diferentes conquistaram vitórias nesta temporada.
                      </li>
                    )}
                  </ul>
                  
                  <p>
                    A diferença entre a equipe líder e a segunda colocada é de 
                    {chartData.length >= 2 ? ` ${Math.abs(chartData[0].points - chartData[1].points)} ` : " "} 
                    pontos, o que indica 
                    {chartData.length >= 2 && (Math.abs(chartData[0].points - chartData[1].points) > 50 
                      ? " uma liderança confortável." 
                      : " uma disputa acirrada pelo título.")}
                  </p>
                </>
              ) : (
                <p className="text-muted-foreground italic">
                  Não há dados suficientes para gerar insights para a temporada {selectedSeason}.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

// Função auxiliar para atribuir cores às equipes
function getTeamColor(teamName: string): string {
  const teamColors: Record<string, string> = {
    "Red Bull": "#0600EF",
    "Ferrari": "#DC0000",
    "Mercedes": "#00D2BE",
    "McLaren": "#FF8700",
    "Aston Martin": "#006F62",
    "Alpine": "#0090FF",
    "Williams": "#005AFF",
    "AlphaTauri": "#2B4562",
    "RB": "#2B4562",
    "Alfa Romeo": "#900000",
    "Haas F1 Team": "#FFFFFF",
    "Haas": "#FFFFFF",
  };

  // Busca parcial por nome de equipe
  for (const [key, color] of Object.entries(teamColors)) {
    if (teamName.includes(key)) {
      return color;
    }
  }

  // Cor padrão se não encontrar
  return "#777777";
}

export default Constructors;
