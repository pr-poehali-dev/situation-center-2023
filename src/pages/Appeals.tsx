import { useState } from "react";
import Icon from "@/components/ui/icon";

const allAppeals = [
  { id: "ОБ-2024-001847", date: "12.04.2024", region: "Центральный р-н", operator: "ООО «СтройПроект»", category: "Льготная ипотека", applicant: "Смирнова Е.А.", status: "done", priority: "normal", days: 3 },
  { id: "ОБ-2024-001846", date: "12.04.2024", region: "Северный р-н", operator: "ГУП «Жилфонд»", category: "Жильё для сирот", applicant: "Иванов П.С.", status: "progress", priority: "high", days: 7 },
  { id: "ОБ-2024-001845", date: "11.04.2024", region: "Южный р-н", operator: "АО «РегионЖилье»", category: "Молодые семьи", applicant: "Петров А.Н.", status: "new", priority: "normal", days: 1 },
  { id: "ОБ-2024-001844", date: "11.04.2024", region: "Западный р-н", operator: "МУП «ЖКС»", category: "Многодетные семьи", applicant: "Козлова М.В.", status: "overdue", priority: "critical", days: 18 },
  { id: "ОБ-2024-001843", date: "10.04.2024", region: "Восточный р-н", operator: "ООО «ТехСтрой»", category: "Ветхое жильё", applicant: "Сидоров К.Л.", status: "done", priority: "normal", days: 5 },
  { id: "ОБ-2024-001842", date: "10.04.2024", region: "Центральный р-н", operator: "ООО «СтройПроект»", category: "Льготная ипотека", applicant: "Новикова Т.Р.", status: "progress", priority: "high", days: 6 },
  { id: "ОБ-2024-001841", date: "09.04.2024", region: "Северный р-н", operator: "ГУП «Жилфонд»", category: "Аварийное жильё", applicant: "Федоров Д.М.", status: "overdue", priority: "critical", days: 21 },
  { id: "ОБ-2024-001840", date: "09.04.2024", region: "Южный р-н", operator: "АО «РегионЖилье»", category: "Жильё для сирот", applicant: "Волков С.А.", status: "new", priority: "normal", days: 2 },
  { id: "ОБ-2024-001839", date: "08.04.2024", region: "Западный р-н", operator: "МУП «ЖКС»", category: "Молодые семьи", applicant: "Морозова Н.К.", status: "progress", priority: "high", days: 9 },
  { id: "ОБ-2024-001838", date: "08.04.2024", region: "Восточный р-н", operator: "ООО «ТехСтрой»", category: "Многодетные семьи", applicant: "Белов В.И.", status: "done", priority: "normal", days: 4 },
  { id: "ОБ-2024-001837", date: "07.04.2024", region: "Центральный р-н", operator: "ООО «СтройПроект»", category: "Льготная ипотека", applicant: "Зайцев О.П.", status: "done", priority: "normal", days: 3 },
  { id: "ОБ-2024-001836", date: "07.04.2024", region: "Северный р-н", operator: "ГУП «Жилфонд»", category: "Ветхое жильё", applicant: "Кузнецова А.Д.", status: "overdue", priority: "critical", days: 25 },
];

const statusConfig = {
  new: { label: "Новое", color: "#60a5fa", bg: "#60a5fa20" },
  progress: { label: "В работе", color: "#facc15", bg: "#facc1520" },
  done: { label: "Выполнено", color: "#4ade80", bg: "#4ade8020" },
  overdue: { label: "Просрочено", color: "#f87171", bg: "#f8717120" },
};

const priorityConfig = {
  normal: { label: "Обычный", color: "var(--gov-muted)" },
  high: { label: "Высокий", color: "#facc15" },
  critical: { label: "Критический", color: "#f87171" },
};

const categories = ["Все категории", "Льготная ипотека", "Жильё для сирот", "Молодые семьи", "Многодетные семьи", "Ветхое жильё", "Аварийное жильё"];
const statuses = ["Все статусы", "Новое", "В работе", "Выполнено", "Просрочено"];

const summaryStats = [
  { label: "Всего обращений", value: "2 847", color: "var(--gov-gold)", icon: "FileText" },
  { label: "В работе", value: "1 203", color: "#60a5fa", icon: "Clock" },
  { label: "Выполнено", value: "1 401", color: "#4ade80", icon: "CheckCircle" },
  { label: "Просрочено", value: "243", color: "#f87171", icon: "AlertCircle" },
];

export default function Appeals() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Все категории");
  const [statusFilter, setStatusFilter] = useState("Все статусы");

  const statusKeyMap: Record<string, string> = {
    "Новое": "new", "В работе": "progress", "Выполнено": "done", "Просрочено": "overdue"
  };

  const filtered = allAppeals.filter((a) => {
    const matchSearch = !search || a.id.toLowerCase().includes(search.toLowerCase()) || a.applicant.toLowerCase().includes(search.toLowerCase()) || a.operator.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "Все категории" || a.category === categoryFilter;
    const matchStatus = statusFilter === "Все статусы" || a.status === statusKeyMap[statusFilter];
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="gov-card p-4 flex items-center gap-3">
            <div className="p-2" style={{ background: `${s.color}20`, borderRadius: "2px" }}>
              <Icon name={s.icon} size={16} style={{ color: s.color }} />
            </div>
            <div>
              <div className="stat-number text-xl font-semibold" style={{ color: "var(--gov-text)" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "var(--gov-muted)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="gov-card p-4 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-48" style={{ background: "var(--gov-panel)", border: "1px solid var(--gov-border)", borderRadius: "2px", padding: "6px 10px" }}>
          <Icon name="Search" size={13} style={{ color: "var(--gov-muted)" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по номеру, заявителю, оператору..."
            className="text-xs bg-transparent outline-none flex-1"
            style={{ color: "var(--gov-text)" }}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="text-xs px-3 py-1.5 outline-none"
          style={{ background: "var(--gov-panel)", border: "1px solid var(--gov-border)", borderRadius: "2px", color: "var(--gov-text)" }}
        >
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs px-3 py-1.5 outline-none"
          style={{ background: "var(--gov-panel)", border: "1px solid var(--gov-border)", borderRadius: "2px", color: "var(--gov-text)" }}
        >
          {statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <span className="text-xs ml-auto" style={{ color: "var(--gov-muted)" }}>Найдено: {filtered.length}</span>
      </div>

      {/* Table */}
      <div className="gov-card overflow-hidden">
        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--gov-border)", background: "var(--gov-panel)" }}>
          <span className="text-xs font-medium" style={{ color: "var(--gov-text)" }}>Реестр обращений</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--gov-border)" }}>
                {["№ обращения", "Дата", "Район", "Оператор", "Категория", "Заявитель", "Дней", "Приоритет", "Статус"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-medium whitespace-nowrap" style={{ color: "var(--gov-muted)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => {
                const sc = statusConfig[a.status as keyof typeof statusConfig];
                const pc = priorityConfig[a.priority as keyof typeof priorityConfig];
                return (
                  <tr key={a.id} className="transition-colors cursor-pointer" style={{ borderBottom: "1px solid var(--gov-border)" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "var(--gov-panel)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td className="px-4 py-3 text-xs font-mono-gov" style={{ color: "var(--gov-gold)" }}>{a.id}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--gov-muted)" }}>{a.date}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--gov-text)" }}>{a.region}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--gov-muted)", maxWidth: "160px" }}><span className="truncate block">{a.operator}</span></td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--gov-text)" }}>{a.category}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--gov-text)" }}>{a.applicant}</td>
                    <td className="px-4 py-3 text-xs font-mono-gov text-center" style={{ color: a.days > 14 ? "#f87171" : "var(--gov-text)" }}>{a.days}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: pc.color }}>{pc.label}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 whitespace-nowrap" style={{ background: sc.bg, color: sc.color, borderRadius: "2px" }}>
                        {sc.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
