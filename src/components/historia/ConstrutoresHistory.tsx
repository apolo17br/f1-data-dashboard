
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConstructors } from "@/hooks/useConstructorsData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

type ConstrutoresHistoryProps = {
  season: number;
};

const ConstrutoresHistory = ({ season }: ConstrutoresHistoryProps) => {
  const { data: constructors, isLoading } = useConstructors(season);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (constructors && constructors.length > 0) {
      const transformedData = constructors.map(constructor => ({
        name: constructor.name,
        wins: constructor.wins || 0,
        points: constructor.points || 0
      }));
      setChartData(transformedData);
    }
  }, [constructors]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-2 border-t-f1-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Desempenho dos Construtores - {season}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Pontos por Equipe</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="points" fill="#ef4444" name="Pontos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Vitórias por Equipe</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="wins" fill="#3b82f6" name="Vitórias" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Tabela de Construtores</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posição</TableHead>
                    <TableHead>Equipe</TableHead>
                    <TableHead className="text-right">Pontos</TableHead>
                    <TableHead className="text-right">Vitórias</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {constructors?.map((constructor, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{constructor.name}</TableCell>
                      <TableCell className="text-right">{constructor.points || 0}</TableCell>
                      <TableCell className="text-right">{constructor.wins || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConstrutoresHistory;
