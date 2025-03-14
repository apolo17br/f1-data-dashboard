
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  CalendarDays, 
  BarChart2, 
  Trophy, 
  Clock, 
  Users,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
};

const NavItem = ({ icon, label, href, isActive, onClick }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group",
      isActive
        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
    )}
    onClick={onClick}
  >
    <div className={cn(
      "w-5 h-5 transition-transform duration-300",
      isActive ? "text-f1-red" : "text-sidebar-foreground/70 group-hover:text-sidebar-foreground"
    )}>
      {icon}
    </div>
    <span>{label}</span>
    {isActive && (
      <div className="ml-auto w-1 h-4 bg-f1-red rounded-full animate-pulse-slow" />
    )}
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const navItems = [
    { icon: <Home />, label: "Dashboard", href: "/" },
    { icon: <CalendarDays />, label: "Calendário", href: "/calendar" },
    { icon: <BarChart2 />, label: "Estatísticas", href: "/stats" },
    { icon: <Trophy />, label: "Campeonato", href: "/championship" },
    { icon: <Clock />, label: "Telemetria", href: "/telemetry" },
    { icon: <Users />, label: "Nossos Palpites", href: "/predictions" },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-f1-black/80 backdrop-blur-lg text-white md:hidden"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar - desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-sidebar sticky top-0 border-r border-sidebar-border">
        <div className="p-6">
          <h1 className="text-xl font-bold text-sidebar-foreground flex items-center gap-2">
            <span className="text-f1-red">F1</span> Data Dashboard
          </h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-300"
          >
            {isDarkMode ? (
              <>
                <Sun size={18} className="text-sidebar-foreground/70" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon size={18} className="text-sidebar-foreground/70" />
                <span>Modo Escuro</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-0 z-40 flex flex-col w-64 h-screen bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6">
          <h1 className="text-xl font-bold text-sidebar-foreground flex items-center gap-2">
            <span className="text-f1-red">F1</span> Data Dashboard
          </h1>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={location.pathname === item.href}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all duration-300"
          >
            {isDarkMode ? (
              <>
                <Sun size={18} className="text-sidebar-foreground/70" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon size={18} className="text-sidebar-foreground/70" />
                <span>Modo Escuro</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
