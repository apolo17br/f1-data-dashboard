import Layout from "@/components/Layout";
import { useTopConstructors, useTopConstructorsByWins, useConstructorNationalities, useConstructors } from "@/hooks/useConstructorsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Trophy, Medal, Flag, Database, Search, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useMemo } from "react";

const Construtores = () => {
  const { data: topConstructors, isLoading: isLoadingTop } = useTopConstructors();
  const { data: topByWins, isLoading: isLoadingWins } = useTopConstructorsByWins();
  const { data: nationalities, isLoading: isLoadingNationalities } = useConstructorNationalities();
  const { data: allConstructors, isLoading: isLoadingConstructors } = useConstructors();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredConstructors = useMemo(() => {
    if (!allConstructors) return [];
    return allConstructors.filter(constructor => 
      constructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      constructor.nationality.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allConstructors, searchTerm]);

  const isLoading = isLoadingTop || isLoadingWins || isLoadingNationalities || isLoadingConstructors;

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">História dos Construtores</h1>
          <p className="text-muted-foreground">
            Análise histórica das equipes que fizeram parte da Fórmula 1 até 2024
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Maior Pontuador
              </CardTitle>
              <Trophy className="h-4 w-4 text-f1-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topConstructors?.[0]?.name || "—"}</div>
              <p className="text-xs text-muted-foreground">
                {topConstructors?.[0]?.totalPoints?.toLocaleString() || 0} pontos na história
              </p>
              <a
                href={topConstructors?.[0]?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline"
              >
                Saiba mais
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Mais Vitórias
              </CardTitle>
              <Medal className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topByWins?.[0]?.name || "—"}</div>
              <p className="text-xs text-muted-foreground">
                {topByWins?.[0]?.totalWins?.toLocaleString() || 0} vitórias
              </p>
              <a
                href={topByWins?.[0]?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:underline"
              >
                Saiba mais
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                País com Mais Equipes
              </CardTitle>
              <Flag className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{nationalities?.[0]?.nationality || "—"}</div>
              <p className="text-xs text-muted-foreground">
                {nationalities?.[0]?.count || 0} equipes na história
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total de Equipes
              </CardTitle>
              <Database className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allConstructors?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                equipes registradas até 2024
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pontos" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pontos">Por Pontos</TabsTrigger>
            <TabsTrigger value="vitorias">Por Vitórias</TabsTrigger>
            <TabsTrigger value="nacionalidades">Por Nacionalidade</TabsTrigger>
            <TabsTrigger value="lista">Lista Completa</TabsTrigger>
          </TabsList>

          <TabsContent value="pontos">
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Construtores por Pontos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topConstructors}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-background border border-border p-2 rounded shadow">
                                <p className="font-bold text-foreground">{data.name}</p>
                                <p className="text-sm text-muted-foreground">{data.nationality}</p>
                                <p className="text-sm text-foreground">{data.totalPoints.toLocaleString()} pontos</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="totalPoints"
                        name="Pontos Totais"
                        fill="var(--f1-red)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitorias">
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Construtores por Vitórias</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={topByWins}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-background border border-border p-2 rounded shadow">
                                <p className="font-bold text-foreground">{data.name}</p>
                                <p className="text-sm text-muted-foreground">{data.nationality}</p>
                                <p className="text-sm text-foreground">{data.totalWins.toLocaleString()} vitórias</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="totalWins"
                        name="Vitórias Totais"
                        fill="#FFB800"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nacionalidades">
            <Card>
              <CardHeader>
                <CardTitle>Top 10 Nacionalidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={nationalities}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="nationality"
                        angle={-45}
                        textAnchor="end"
                        height={70}
                      />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-background border border-border p-2 rounded shadow">
                                <p className="font-bold text-foreground">{data.nationality}</p>
                                <p className="text-sm text-foreground">{data.count} equipes</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="count"
                        name="Número de Equipes"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lista">
            <Card>
              <CardHeader>
                <CardTitle>Lista Completa de Construtores</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou nacionalidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Nacionalidade</TableHead>
                        <TableHead className="text-right">Mais Informações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoadingConstructors ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            Carregando construtores...
                          </TableCell>
                        </TableRow>
                      ) : filteredConstructors.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            Nenhum construtor encontrado
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredConstructors.map((constructor) => (
                          <TableRow key={constructor.constructorId}>
                            <TableCell className="font-medium">{constructor.name}</TableCell>
                            <TableCell>{constructor.nationality}</TableCell>
                            <TableCell className="text-right">
                              <a
                                href={constructor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-700"
                              >
                                Wikipedia
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Insights sobre as Equipes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <p className="text-muted-foreground">Carregando insights...</p>
              ) : (
                <>
                  <p>
                    Com base nos dados históricos da Fórmula 1, podemos observar:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      A equipe {topConstructors?.[0]?.name || "—"} ({topConstructors?.[0]?.nationality}) é a maior pontuadora da história,
                      com {topConstructors?.[0]?.totalPoints?.toLocaleString() || 0} pontos acumulados.
                    </li>
                    <li>
                      {topByWins?.[0]?.name || "—"} ({topByWins?.[0]?.nationality}) é a equipe com mais vitórias: {topByWins?.[0]?.totalWins || 0} no total.
                    </li>
                    <li>
                      {nationalities?.[0]?.nationality || "—"} é o país com mais equipes na história ({nationalities?.[0]?.count || 0}),
                      seguido por {nationalities?.[1]?.nationality || "—"} ({nationalities?.[1]?.count || 0}).
                    </li>
                    <li>
                      As três equipes mais vitoriosas ({topByWins?.slice(0, 3).map(t => `${t.name} (${t.nationality})`).join(", ") || "—"})
                      acumulam {topByWins?.slice(0, 3).reduce((sum, team) => sum + (team?.totalWins || 0), 0)} vitórias.
                    </li>
                  </ul>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Construtores; 