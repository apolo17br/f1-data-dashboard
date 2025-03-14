
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SeasonSelector from "@/components/SeasonSelector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNextRaceWeekend } from "@/hooks/useF1Data";
import { useProfiles, usePrediction, usePredictions, useCreateOrUpdatePrediction, Profile } from "@/hooks/usePredictionsData";
import { toast } from "sonner";

const teamColors: Record<string, string> = {
  "Red Bull": "bg-blue-600",
  "Ferrari": "bg-red-600",
  "McLaren": "bg-orange-500",
  "Mercedes": "bg-teal-600",
  "Aston Martin": "bg-green-600",
  "Alpine": "bg-blue-400",
};

const Predictions = () => {
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const { data: profiles, isLoading: isLoadingProfiles } = useProfiles();
  const { data: nextRace, isLoading: isLoadingNextRace } = useNextRaceWeekend();
  
  const [selectedWinner, setSelectedWinner] = useState<string>("");
  const [selectedPole, setSelectedPole] = useState<string>("");
  const [selectedPodium, setSelectedPodium] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  
  // Setup the default profile if none is selected
  useEffect(() => {
    if (profiles && profiles.length > 0 && !selectedProfile) {
      setSelectedProfile(profiles[0].id);
    }
  }, [profiles, selectedProfile]);
  
  // Get current prediction for selected profile
  const { data: currentPrediction, isLoading: isLoadingPrediction } = usePrediction(
    selectedProfile,
    nextRace?.grandPrix || "",
    selectedSeason
  );
  
  // Get all predictions for the selected profile and season
  const { data: profilePredictions, isLoading: isLoadingPredictions } = usePredictions(
    selectedProfile,
    selectedSeason
  );
  
  // Mutation to create or update predictions
  const createOrUpdatePrediction = useCreateOrUpdatePrediction();
  
  // Load existing prediction data if available
  useEffect(() => {
    if (currentPrediction) {
      setSelectedWinner(currentPrediction.winner || "");
      setSelectedPole(currentPrediction.pole || "");
      setSelectedPodium(currentPrediction.podium || []);
      setSelectedTeam(currentPrediction.winning_team || "");
    } else {
      // Reset form if no prediction exists
      setSelectedWinner("");
      setSelectedPole("");
      setSelectedPodium([]);
      setSelectedTeam("");
    }
  }, [currentPrediction]);
  
  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };
  
  const handleProfileChange = (profileId: string) => {
    setSelectedProfile(profileId);
  };
  
  const handlePodiumSelection = (driver: string) => {
    if (selectedPodium.includes(driver)) {
      setSelectedPodium(selectedPodium.filter(d => d !== driver));
    } else {
      if (selectedPodium.length < 3) {
        setSelectedPodium([...selectedPodium, driver]);
      } else {
        // Remove the first driver and add the new one
        setSelectedPodium([...selectedPodium.slice(1), driver]);
      }
    }
  };
  
  const handleSavePrediction = () => {
    if (!selectedProfile || !nextRace) {
      toast.error("Perfil ou corrida não selecionados.");
      return;
    }
    
    if (!selectedWinner || !selectedPole || selectedPodium.length < 3 || !selectedTeam) {
      toast.error("Por favor, complete todos os campos de previsão.");
      return;
    }
    
    createOrUpdatePrediction.mutate({
      profile_id: selectedProfile,
      grand_prix_id: nextRace.grandPrix,
      season: selectedSeason,
      winner: selectedWinner,
      pole: selectedPole,
      podium: selectedPodium,
      winning_team: selectedTeam
    }, {
      onSuccess: () => {
        toast.success("Palpites salvos com sucesso!");
      },
      onError: (error) => {
        toast.error(`Erro ao salvar palpites: ${error.message}`);
      }
    });
  };
  
  // Mock drivers data (this would come from API in production)
  const drivers = [
    { name: "Verstappen", team: "Red Bull" },
    { name: "Pérez", team: "Red Bull" },
    { name: "Leclerc", team: "Ferrari" },
    { name: "Sainz", team: "Ferrari" },
    { name: "Norris", team: "McLaren" },
    { name: "Piastri", team: "McLaren" },
    { name: "Hamilton", team: "Mercedes" },
    { name: "Russell", team: "Mercedes" },
    { name: "Alonso", team: "Aston Martin" },
    { name: "Stroll", team: "Aston Martin" },
    { name: "Ocon", team: "Alpine" },
    { name: "Gasly", team: "Alpine" },
  ];
  
  // Mock teams data (this would come from API in production)
  const teams = [
    "Red Bull",
    "Ferrari",
    "McLaren",
    "Mercedes",
    "Aston Martin",
    "Alpine"
  ];
  
  // Find partner profile
  const partnerProfile = profiles?.find(p => p.id !== selectedProfile);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nossos Palpites</h1>
          <p className="text-muted-foreground">
            Competição de palpites para os GPs da temporada {selectedSeason}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Perfil:</span>
            <Select 
              value={selectedProfile} 
              onValueChange={handleProfileChange}
              disabled={isLoadingProfiles}
            >
              <SelectTrigger className="w-[150px] h-8 text-sm">
                <SelectValue placeholder="Selecionar perfil" />
              </SelectTrigger>
              <SelectContent>
                {profiles?.map(profile => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <SeasonSelector onChange={handleSeasonChange} defaultSeason={selectedSeason} />
        </div>
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
                <CardTitle>
                  {isLoadingProfiles ? "Carregando..." : 
                   profiles?.find(p => p.id === selectedProfile)?.name || "Seus"} Palpites: {isLoadingNextRace ? "Carregando..." : nextRace?.grandPrix || "Próximo GP"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Vencedor da Corrida</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {drivers.map(driver => (
                        <Button 
                          key={driver.name}
                          variant={selectedWinner === driver.name ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => setSelectedWinner(driver.name)}
                        >
                          {driver.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Pole Position</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {drivers.map(driver => (
                        <Button 
                          key={driver.name}
                          variant={selectedPole === driver.name ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => setSelectedPole(driver.name)}
                        >
                          {driver.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Pódio (Top 3) - {selectedPodium.length}/3 selecionados</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {drivers.map(driver => (
                        <Button 
                          key={driver.name}
                          variant={selectedPodium.includes(driver.name) ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => handlePodiumSelection(driver.name)}
                        >
                          {driver.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Equipe Vencedora</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {teams.map(team => (
                        <Button 
                          key={team}
                          variant={selectedTeam === team ? "default" : "outline"} 
                          className="justify-start"
                          onClick={() => setSelectedTeam(team)}
                        >
                          {team}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleSavePrediction}
                    disabled={createOrUpdatePrediction.isPending}
                  >
                    {createOrUpdatePrediction.isPending ? "Salvando..." : "Salvar Palpites"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  Palpites do Parceiro: {isLoadingNextRace ? "Carregando..." : nextRace?.grandPrix || "Próximo GP"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingProfiles || !partnerProfile ? (
                  <p>Carregando perfil do parceiro...</p>
                ) : (
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
                )}
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
                        <td className="p-3">0</td>
                        <td className="p-3">0</td>
                        <td className="p-3 text-yellow-500">Empate</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Arábia Saudita</td>
                        <td className="p-3">0</td>
                        <td className="p-3">0</td>
                        <td className="p-3 text-yellow-500">Empate</td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Austrália</td>
                        <td className="p-3">0</td>
                        <td className="p-3">0</td>
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
                      <span className="text-3xl font-bold">0</span>
                      <span className="text-xs text-muted-foreground">Seus pontos</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-3xl font-bold">0</span>
                      <span className="text-xs text-muted-foreground">Pontos do parceiro</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Diferença</span>
                    <span className="block text-xl font-semibold text-yellow-500">0 pts</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Desempenho por Categoria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <h4 className="text-sm font-medium mb-2">Acertos de Vencedor</h4>
                      <div className="flex justify-between">
                        <div>
                          <span className="text-2xl font-bold">0</span>
                          <span className="text-xs text-muted-foreground ml-1">Você</span>
                        </div>
                        <div>
                          <span className="text-2xl font-bold">0</span>
                          <span className="text-xs text-muted-foreground ml-1">Parceiro</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <h4 className="text-sm font-medium mb-2">Acertos de Pole</h4>
                      <div className="flex justify-between">
                        <div>
                          <span className="text-2xl font-bold">0</span>
                          <span className="text-xs text-muted-foreground ml-1">Você</span>
                        </div>
                        <div>
                          <span className="text-2xl font-bold">0</span>
                          <span className="text-xs text-muted-foreground ml-1">Parceiro</span>
                        </div>
                      </div>
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
