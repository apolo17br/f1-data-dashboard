import { supabase } from './client';

async function testConnection() {
  console.log("Testando conexão com o Supabase...\n");

  // Teste 1: Verificar estrutura da tabela constructors
  console.log("Teste 1: Verificando estrutura da tabela constructors...");
  const { data: constructors, error: constructorsError } = await supabase
    .from("constructors")
    .select("*")
    .limit(1);

  if (constructorsError) {
    console.log("❌ Erro ao buscar construtores:", constructorsError);
  } else {
    console.log("✅ Estrutura da tabela constructors:", constructors[0]);
  }

  // Teste 2: Verificar estrutura da tabela constructor_results
  console.log("\nTeste 2: Verificando estrutura da tabela constructor_results...");
  const { data: results, error: resultsError } = await supabase
    .from("constructor_results")
    .select("*")
    .limit(1);

  if (resultsError) {
    console.log("❌ Erro ao buscar resultados:", resultsError);
  } else {
    console.log("✅ Estrutura da tabela constructor_results:", results[0]);
  }

  // Teste 3: Verificar estrutura da tabela constructor_standings
  console.log("\nTeste 3: Verificando estrutura da tabela constructor_standings...");
  const { data: standings, error: standingsError } = await supabase
    .from("constructor_standings")
    .select("*")
    .limit(1);

  if (standingsError) {
    console.log("❌ Erro ao buscar classificação:", standingsError);
  } else {
    console.log("✅ Estrutura da tabela constructor_standings:", standings[0]);
  }
}

testConnection(); 