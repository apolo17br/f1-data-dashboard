
import { useEffect, useState } from "react";
import { useConstructors, useConstructorStandings } from "@/hooks/useConstructorsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";

type ConstrutoresHistoryProps = {
  season: number;
};

const ConstrutoresHistory = ({ season }: ConstrutoresHistoryProps) => {
  const { data: constructors, isLoading: isLoadingConstructors } = useConstructors(season);
  const { data: standings, isLoading: isLoadingStandings } = useConstructorStandings(season);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (standings && constructors) {
      const data = constructors.map((constructor) => {
        const constructorStanding = standings.find(
          (s) => s.constructorId === constructor.constructorId
        );
        
        return {
          name: constructor.name,
          nationality: constructor.nationality,
          points: constructorStanding?.points || 0,
          wins: constructorStanding?.wins || 0,
        };
      });
      
      setChartData(data.sort((a, b) => b.points - a.points));
    }
  }, [constructors, standings]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Construtores - {season}</CardTitle>
        </CardHeader>
        <CardContent>
          {(isLoadingConstructors || isLoadingStandings) ? (
            <p>Carregando dados dos construtores...</p>
          ) : constructors && constructors.length > 0 ? (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Pontuação por Equipe</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="points" fill="#8884d8" name="Pontos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Vitórias por Equipe</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wins" fill="#82ca9d" name="Vitórias" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Lista de Construtores</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Nacionalidade</TableHead>
                      <TableHead className="text-right">Pontos</TableHead>
                      <TableHead className="text-right">Vitórias</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {chartData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.nationality}</TableCell>
                        <TableCell className="text-right">{item.points}</TableCell>
                        <TableCell className="text-right">{item.wins}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <p>Nenhum dado de construtor encontrado para a temporada {season}.</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Insights Históricos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Dominância de Equipes</h3>
              <p>Ao longo da história da F1, algumas equipes dominaram diferentes eras:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Ferrari: A equipe mais antiga e bem-sucedida, com 16 títulos de construtores</li>
                <li>Williams: Dominou nos anos 80 e 90 com 9 títulos</li>
                <li>McLaren: 8 títulos de construtores, grande rival da Ferrari</li>
                <li>Red Bull: 6 títulos, dominou no início dos anos 2010 e novamente a partir de 2022</li>
                <li>Mercedes: Domínio incomparável de 2014 a 2021 com 8 títulos consecutivos</li>
              </ul>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Evolução Tecnológica</h3>
              <p>Os construtores foram responsáveis por várias inovações revolucionárias:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Lotus: Efeito solo e suspensão ativa</li>
                <li>Brabham: Carro-ventilador e pit stops rápidos</li>
                <li>Williams: Suspensão ativa e telemetria avançada</li>
                <li>Ferrari: Aperfeiçoamento de motores e aerodinâmica</li>
                <li>McLaren: O primeiro chassi de fibra de carbono</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConstrutoresHistory;
