import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Appeals from "./pages/Appeals";
import HousingPlan from "./pages/HousingPlan";
import Statistics from "./pages/Statistics";
import Icon from "@/components/ui/icon";

type Page = "dashboard" | "appeals" | "housing" | "statistics";

const navItems = [
  { id: "dashboard" as Page, label: "Дашборд", icon: "LayoutDashboard" },
  { id: "appeals" as Page, label: "Обращения", icon: "MessageSquare" },
  { id: "housing" as Page, label: "Ввод жилья", icon: "Building2" },
  { id: "statistics" as Page, label: "Статистика", icon: "BarChart3" },
];

function LiveClock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString("ru-RU"));
  useState(() => {
    const t = setInterval(() => setTime(new Date().toLocaleTimeString("ru-RU")), 1000);
    return () => clearInterval(t);
  });
  return <span>{time}</span>;
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");

  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex h-screen overflow-hidden" style={{ background: "var(--gov-navy)", fontFamily: "'IBM Plex Sans', sans-serif" }}>
        {/* Sidebar */}
        <aside className="flex flex-col w-64 flex-shrink-0" style={{ background: "var(--gov-panel)", borderRight: "1px solid var(--gov-border)" }}>
          {/* Logo */}
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--gov-border)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: "var(--gov-gold)", borderRadius: "2px" }}>
                <Icon name="Shield" size={16} style={{ color: "var(--gov-navy)" }} />
              </div>
              <div>
                <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--gov-gold)" }}>ЦУ ЖКХ</div>
                <div className="text-xs leading-tight" style={{ color: "var(--gov-muted)" }}>Жилищные программы</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            <div className="px-3 mb-3">
              <span className="text-xs tracking-widest uppercase" style={{ color: "var(--gov-muted)", fontSize: "10px" }}>Разделы</span>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150"
                style={{
                  borderRadius: "2px",
                  background: page === item.id ? "var(--gov-card)" : "transparent",
                  color: page === item.id ? "var(--gov-gold)" : "var(--gov-muted)",
                  borderLeft: page === item.id ? "2px solid var(--gov-gold)" : "2px solid transparent",
                  fontWeight: page === item.id ? 500 : 400,
                  cursor: "pointer",
                }}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Status indicator */}
          <div className="px-5 py-4" style={{ borderTop: "1px solid var(--gov-border)" }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }}></div>
              <span className="text-xs" style={{ color: "var(--gov-muted)" }}>Система активна</span>
            </div>
            <div className="text-xs" style={{ color: "var(--gov-muted)", fontFamily: "'IBM Plex Mono', monospace" }}>
              {new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" })}
              {" · "}
              <LiveClock />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {/* Top bar */}
          <header className="px-6 py-3 flex items-center justify-between sticky top-0 z-10" style={{ background: "var(--gov-panel)", borderBottom: "1px solid var(--gov-border)" }}>
            <div>
              <h1 className="text-sm font-semibold" style={{ color: "var(--gov-text)" }}>
                {navItems.find((n) => n.id === page)?.label}
              </h1>
              <p className="text-xs" style={{ color: "var(--gov-muted)" }}>
                Министерство строительства и ЖКХ · Региональный уровень
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5" style={{ background: "var(--gov-card)", border: "1px solid var(--gov-border)", borderRadius: "2px" }}>
                <Icon name="Bell" size={13} style={{ color: "var(--gov-muted)" }} />
                <span className="text-xs" style={{ color: "var(--gov-muted)" }}>3 уведомления</span>
                <div className="w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--gov-gold)", color: "var(--gov-navy)" }}>3</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--gov-gold)", color: "var(--gov-navy)" }}>АК</div>
                <span className="text-xs" style={{ color: "var(--gov-text)" }}>А. Козлов</span>
              </div>
            </div>
          </header>

          <div className="p-6 animate-fade-in" key={page}>
            {page === "dashboard" && <Dashboard />}
            {page === "appeals" && <Appeals />}
            {page === "housing" && <HousingPlan />}
            {page === "statistics" && <Statistics />}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
