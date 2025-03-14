import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, Trophy, Users } from "lucide-react";

const Historia = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">História da Fórmula 1</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link to="/historia/construtores">
            <Card className="hover:bg-accent transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Construtores</CardTitle>
                <Building2 className="h-8 w-8 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  História completa das equipes que fizeram parte da F1
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/historia/pilotos">
            <Card className="hover:bg-accent transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Pilotos</CardTitle>
                <Users className="h-8 w-8 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Todos os pilotos que já competiram na F1
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/historia/campeonatos">
            <Card className="hover:bg-accent transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">Campeonatos</CardTitle>
                <Trophy className="h-8 w-8 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  História dos campeonatos mundiais
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Historia;
