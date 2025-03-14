
import { useState } from "react";
import Layout from "@/components/Layout";
import { useConstructors } from "@/hooks/useConstructorsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";
import SeasonSelector from "@/components/SeasonSelector";
import ConstrutoresHistory from "@/components/historia/ConstrutoresHistory";

const Historia = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const { data: constructors, isLoading } = useConstructors(selectedSeason);

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">História da F1</h1>
          <p className="text-muted-foreground">
            Explorando a rica história da Fórmula 1 através dos anos
          </p>
        </div>
        <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
      </div>

      <Tabs defaultValue="construtores" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="construtores">Construtores</TabsTrigger>
          <TabsTrigger value="pilotos">Pilotos</TabsTrigger>
          <TabsTrigger value="circuitos">Circuitos</TabsTrigger>
        </TabsList>

        <TabsContent value="construtores">
          <ConstrutoresHistory season={selectedSeason} />
        </TabsContent>

        <TabsContent value="pilotos">
          <Card>
            <CardHeader>
              <CardTitle>História dos Pilotos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Este módulo será implementado em breve com informações históricas sobre os pilotos da F1.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="circuitos">
          <Card>
            <CardHeader>
              <CardTitle>História dos Circuitos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Este módulo será implementado em breve com informações históricas sobre os circuitos da F1.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Historia;
