
import { useState } from "react";
import { useConstructors, useConstructorStandings } from "@/hooks/useConstructorsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";

type ConstrutoresHistoryProps = {
  season: number;
};

const ConstrutoresHistory = ({ season }: ConstrutoresHistoryProps) => {
  const { data: constructors, isLoading: isLoadingConstructors } = useConstructors();
  const { data: standings, isLoading: isLoadingStandings } = useConstructorStandings(season);

  // Dados de pontuação para o gráfico de barras
  const constructorPointsData = standings?.map(standing => ({
    name: standing.constructor ? standing.constructor.name : "Desconhecido",
    points: standing.points,
  })) || [];

  // Dados históricos simulados para o gráfico de linha
  const historicalData = [
    { year: 2015, mercedes: 703, ferrari: 428, red_bull: 187, mclaren: 27 },
    { year: 2016, mercedes: 765, ferrari: 522, red_bull: 468, mclaren: 76 },
    { year: 2017, mercedes: 668, ferrari: 522, red_bull: 368, mclaren: 30 },
    { year: 2018, mercedes: 655, ferrari: 571, red_bull: 419, mclaren: 62 },
    { year: 2019, mercedes: 739, ferrari: 504, red_bull: 417, mclaren: 145 },
    { year: 2020, mercedes: 573, ferrari: 131, red_bull: 319, mclaren: 202 },
    { year: 2021, mercedes: 613, ferrari: 323, red_bull: 585, mclaren: 275 },
    { year: 2022, mercedes: 515, ferrari: 554, red_bull: 759, mclaren: 159 },
    { year: 2023, mercedes: 409, ferrari: 406, red_bull: 759, mclaren: 302 },
    { year: 2024, mercedes: 371, ferrari: 449, red_bull: 544, mclaren: 595 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Pontuação dos Construtores ({season})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingStandings ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="w-8 h-8 border-2 border-t-f1-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : constructorPointsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={constructorPointsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="points" fill="#ef4444" name="Pontos" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground text-center">Sem dados disponíveis para a temporada selecionada.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico dos Principais Construtores</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="mercedes" stroke="#00D2BE" name="Mercedes" />
              <Line type="monotone" dataKey="ferrari" stroke="#DC0000" name="Ferrari" />
              <Line type="monotone" dataKey="red_bull" stroke="#0600EF" name="Red Bull" />
              <Line type="monotone" dataKey="mclaren" stroke="#FF8700" name="McLaren" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes dos Construtores</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingConstructors ? (
            <div className="flex items-center justify-center min-h-[100px]">
              <div className="w-8 h-8 border-2 border-t-f1-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
          ) : constructors && constructors.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Construtor</TableHead>
                  <TableHead>Nacionalidade</TableHead>
                  <TableHead>Mais Informações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {constructors.map((constructor) => (
                  <TableRow key={constructor.constructorId}>
                    <TableCell className="font-medium">{constructor.name}</TableCell>
                    <TableCell>{constructor.nationality}</TableCell>
                    <TableCell>
                      <a href={constructor.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                        Wikipedia
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center">Sem dados disponíveis.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConstrutoresHistory;
