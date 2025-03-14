import { supabase } from './client';

const constructors = [
  {
    constructorId: 1,
    constructorRef: "red_bull",
    name: "Red Bull Racing",
    nationality: "Austrian",
    url: "http://en.wikipedia.org/wiki/Red_Bull_Racing"
  },
  {
    constructorId: 2,
    constructorRef: "ferrari",
    name: "Ferrari",
    nationality: "Italian",
    url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari"
  },
  {
    constructorId: 3,
    constructorRef: "mercedes",
    name: "Mercedes",
    nationality: "German",
    url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One"
  },
  {
    constructorId: 4,
    constructorRef: "mclaren",
    name: "McLaren",
    nationality: "British",
    url: "http://en.wikipedia.org/wiki/McLaren"
  },
  {
    constructorId: 5,
    constructorRef: "aston_martin",
    name: "Aston Martin",
    nationality: "British",
    url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One"
  },
  {
    constructorId: 6,
    constructorRef: "alpine",
    name: "Alpine F1 Team",
    nationality: "French",
    url: "http://en.wikipedia.org/wiki/Alpine_F1_Team"
  },
  {
    constructorId: 7,
    constructorRef: "williams",
    name: "Williams",
    nationality: "British",
    url: "http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering"
  },
  {
    constructorId: 8,
    constructorRef: "rb",
    name: "RB",
    nationality: "Italian",
    url: "http://en.wikipedia.org/wiki/Visa_Cash_App_RB_Formula_One_Team"
  },
  {
    constructorId: 9,
    constructorRef: "sauber",
    name: "Stake F1 Team Kick Sauber",
    nationality: "Swiss",
    url: "http://en.wikipedia.org/wiki/Sauber"
  },
  {
    constructorId: 10,
    constructorRef: "haas",
    name: "Haas F1 Team",
    nationality: "American",
    url: "http://en.wikipedia.org/wiki/Haas_F1_Team"
  }
];

const constructorStandings = [
  {
    constructorStandingsId: 1,
    raceId: 1,
    constructorId: 1,
    points: 97,
    position: 1,
    positionText: "1",
    wins: 2
  },
  {
    constructorStandingsId: 2,
    raceId: 1,
    constructorId: 2,
    points: 93,
    position: 2,
    positionText: "2",
    wins: 0
  },
  {
    constructorStandingsId: 3,
    raceId: 1,
    constructorId: 3,
    points: 26,
    position: 3,
    positionText: "3",
    wins: 0
  },
  {
    constructorStandingsId: 4,
    raceId: 1,
    constructorId: 4,
    points: 55,
    position: 4,
    positionText: "4",
    wins: 0
  },
  {
    constructorStandingsId: 5,
    raceId: 1,
    constructorId: 5,
    points: 13,
    position: 5,
    positionText: "5",
    wins: 0
  },
  {
    constructorStandingsId: 6,
    raceId: 1,
    constructorId: 6,
    points: 8,
    position: 6,
    positionText: "6",
    wins: 0
  },
  {
    constructorStandingsId: 7,
    raceId: 1,
    constructorId: 7,
    points: 0,
    position: 7,
    positionText: "7",
    wins: 0
  },
  {
    constructorStandingsId: 8,
    raceId: 1,
    constructorId: 8,
    points: 1,
    position: 8,
    positionText: "8",
    wins: 0
  },
  {
    constructorStandingsId: 9,
    raceId: 1,
    constructorId: 9,
    points: 3,
    position: 9,
    positionText: "9",
    wins: 0
  },
  {
    constructorStandingsId: 10,
    raceId: 1,
    constructorId: 10,
    points: 0,
    position: 10,
    positionText: "10",
    wins: 0
  }
];

async function seedData() {
  try {
    console.log("Inserindo dados no Supabase...");
    
    // Inserir construtores
    console.log("\nInserindo construtores...");
    const { error: constructorsError } = await supabase
      .from("constructors")
      .insert(constructors);
    
    if (constructorsError) {
      console.error("❌ Erro ao inserir construtores:", constructorsError);
    } else {
      console.log("✅ Construtores inseridos com sucesso!");
    }

    // Inserir classificação
    console.log("\nInserindo classificação...");
    const { error: standingsError } = await supabase
      .from("constructor_standings")
      .insert(constructorStandings);
    
    if (standingsError) {
      console.error("❌ Erro ao inserir classificação:", standingsError);
    } else {
      console.log("✅ Classificação inserida com sucesso!");
    }

  } catch (error) {
    console.error("❌ Erro ao inserir dados:", error);
  }
}

seedData(); 