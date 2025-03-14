
import { useState } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const Predictions = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nossos Palpites</h1>
          <p className="text-muted-foreground">
            Competição de palpites para os GPs da temporada {selectedSeason}
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>

      <Tabs defaultValue="proxima" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="proxima">Próxima Corrida</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
        </TabsList>
        
        <TabsContent value="proxima">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seus Palpites: GP de Miami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Vencedor da Corrida</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">Verstappen</Button>
                      <Button variant="outline" className="justify-start">Norris</Button>
                      <Button variant="outline" className="justify-start">Leclerc</Button>
                      <Button variant="outline" className="justify-start">Sainz</Button>
                      <Button variant="outline" className="justify-start">Hamilton</Button>
                      <Button variant="outline" className="justify-start">Russell</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Pole Position</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">Verstappen</Button>
                      <Button variant="outline" className="justify-start">Norris</Button>
                      <Button variant="outline" className="justify-start">Leclerc</Button>
                      <Button variant="outline" className="justify-start">Sainz</Button>
                      <Button variant="outline" className="justify-start">Hamilton</Button>
                      <Button variant="outline" className="justify-start">Russell</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Pódio (Top 3)</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">Verstappen</Button>
                      <Button variant="outline" className="justify-start">Norris</Button>
                      <Button variant="outline" className="justify-start">Leclerc</Button>
                      <Button variant="outline" className="justify-start">Sainz</Button>
                      <Button variant="outline" className="justify-start">Hamilton</Button>
                      <Button variant="outline" className="justify-start">Russell</Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Equipe Vencedora</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="justify-start">Red Bull</Button>
                      <Button variant="outline" className="justify-start">Ferrari</Button>
                      <Button variant="outline" className="justify-start">McLaren</Button>
                      <Button variant="outline" className="justify-start">Mercedes</Button>
                      <Button variant="outline" className="justify-start">Aston Martin</Button>
                      <Button variant="outline" className="justify-start">Alpine</Button>
                    </div>
                  </div>
                  
                  <Button className="w-full">Salvar Palpites</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Palpites do Parceiro: GP de Miami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Vencedor</h3>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                      <span>Leclerc (Ferrari)</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Pole Position</h3>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                      <span>Leclerc (Ferrari)</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Pódio</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                        <span>Leclerc (Ferrari)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                        <span>Verstappen (Red Bull)</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                        <span>Norris (McLaren)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="text-sm font-medium mb-2">Equipe Vencedora</h3>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                      <span>Ferrari</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Palpites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Histórico dos palpites e resultados das corridas anteriores.
                </p>
                
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="p-3 text-left">GP</th>
                        <th className="p-3 text-left">Seus Pontos</th>
                        <th className="p-3 text-left">Pontos do Parceiro</th>
                        <th className="p-3 text-left">Resultado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">Bahrein</td>
                        <td className="p-3">14</td>
                        <td className="p-3">8</td>
                        <td className="p-3 text-green-500">Vitória</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Arábia Saudita</td>
                        <td className="p-3">5</td>
                        <td className="p-3">12</td>
                        <td className="p-3 text-red-500">Derrota</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Austrália</td>
                        <td className="p-3">10</td>
                        <td className="p-3">10</td>
                        <td className="p-3 text-yellow-500">Empate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranking">
          <Card>
            <CardHeader>
              <CardTitle>Ranking da Temporada {selectedSeason}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-muted rounded-md">
                  <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold">120</span>
                      <span className="text-xs text-muted-foreground">Seus pontos</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold">105</span>
                      <span className="text-xs text-muted-foreground">Pontos do parceiro</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Diferença</span>
                    <span className="block text-xl font-semibold text-green-500">+15 pts</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Desempenho por Categoria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <h4 className="text-sm font-medium mb-2">Acertos de Vencedor</h4>
                      <div className="flex justify-between">
                        <div>
                          <span className="text-2xl font-bold">4</span>
                          <span className="text-xs text-muted-foreground ml-1">Você</span>
                        </div>
                        <div>
                          <span className="text-2xl font-bold">3</span>
                          <span className="text-xs text-muted-foreground ml-1">Parceiro</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="text-sm font-medium mb-2">Acertos de Pole</h4>
                      <div className="flex justify-between">
                        <div>
                          <span className="text-2xl font-bold">5</span>
                          <span className="text-xs text-muted-foreground ml-1">Você</span>
                        </div>
                        <div>
                          <span className="text-2xl font-bold">6</span>
                          <span className="text-xs text-muted-foreground ml-1">Parceiro</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Prêmios Pendentes</h3>
                  <div className="p-4 border rounded-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Jantar temático F1</h4>
                        <p className="text-sm text-muted-foreground">Seu parceiro deve pagar um jantar temático de F1</p>
                      </div>
                      <Button variant="outline" size="sm">Marcar como realizado</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Predictions;
