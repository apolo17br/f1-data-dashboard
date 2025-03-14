
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Flag } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
        <div className="animate-fade-in text-center">
          <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <Flag className="h-12 w-12 text-f1-red" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">404 - Bandeira Amarela</h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Esta página está fora da pista. Volte para a zona de segurança.
          </p>
          <a 
            href="/" 
            className="f1-button inline-flex items-center gap-2"
          >
            Voltar para a Grid
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
