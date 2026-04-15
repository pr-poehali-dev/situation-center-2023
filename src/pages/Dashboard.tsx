import Icon from "@/components/ui/icon";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const kpiData = [
  { label: "Введено жилья", value: "847 320", unit: "м²", change: "+12.4%", trend: "up", color: "var(--gov-gold)", icon: "Building2" },
  { label: "Семей улучшили жильё", value: "14 230", unit: "семей", change: "+8.1%", trend: "up", color: "#16a34a", icon: "Users" },
  { label: "Обращений в работе", value: "2 847", unit: "шт.", change: "-5.3%", trend: "down", color: "#2563eb", icon: "MessageSquare" },
  { label: "Нарушений сроков", value: "34", unit: "шт.", change: "+2", trend: "up-bad", color: "#dc2626", icon: "AlertTriangle" },
];

const programs = [
  { name: "Переселение из ветхого жилья", progress: 78, target: 1200, fact: 936, status: "ok" },
  { name: "Поддержка молодых семей", progress: 62, target: 3400, fact: 2108, status: "ok" },
  { name: "Жильё для сирот", progress: 45, target: 890, fact: 401, status: "warn" },
  { name: "Льготная ипотека", progress: 91, target: 8500, fact: 7735, status: "ok" },
  { name: "Многодетные семьи", progress: 55, target: 2100, fact: 1155, status: "warn" },
  { name: "Расселение аварийного жилья", progress: 33, target: 560, fact: 185, status: "err" },
];

const monthlyData = [
  { month: "Янв", план: 42, факт: 38 },
  { month: "Фев", план: 45, факт: 44 },
  { month: "Мар", план: 48, факт: 51 },
  { month: "Апр", план: 50, факт: 48 },
  { month: "Май", план: 55, факт: 58 },
  { month: "Июн", план: 60, факт: 62 },
  { month: "Июл", план: 65, факт: 60 },
  { month: "Авг", план: 68, факт: 71 },
  { month: "Сен", план: 70, факт: 68 },
  { month: "Окт", план: 72, факт: 75 },
  { month: "Ноя", план: 75, факт: 72 },
  { month: "Дек", план: 80, факт: 78 },
];

const operators = [
  { region: "Центральный р-н", operator: "ООО «СтройПроект»", appeals: 412, done: 389, status: "ok" },
  { region: "Северный р-н", operator: "ГУП «Жилфонд»", appeals: 287, done: 241, status: "warn" },
  { region: "Южный р-н", operator: "АО «РегионЖилье»", appeals: 534, done: 498, status: "ok" },
  { region: "Западный р-н", operator: "МУП «ЖКС»", appeals: 198, done: 92, status: "err" },
  { region: "Восточный р-н", operator: "ООО «ТехСтрой»", appeals: 321, done: 298, status: "ok" },
];

const statusColor = { ok: "#16a34a", warn: "#d97706", err: "#dc2626" };
const statusLabel = { ok: "В норме", warn: "Внимание", err: "Отклонение" };

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div>
        <SectionHeader title="Ключевые показатели" subtitle="2024 год · накопительный итог" />
        <div className="grid grid-cols-4 gap-4 mt-3">
          {kpiData.map((kpi) => (
            <div key={kpi.label} className="gov-card p-4" style={{ borderTop: `2px solid ${kpi.color}` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="p-1.5" style={{ background: "var(--gov-panel)", borderRadius: "2px" }}>
                  <Icon name={kpi.icon} size={14} style={{ color: kpi.color }} />
                </div>
                <span
                  className="text-xs font-mono-gov"
                  style={{ color: kpi.trend === "up-bad" ? "#dc2626" : kpi.trend === "up" ? "#16a34a" : "#d97706" }}
                >
                  {kpi.change}
                </span>
              </div>
              <div className="stat-number text-2xl font-semibold" style={{ color: "var(--gov-text)" }}>
                {kpi.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--gov-muted)" }}>{kpi.unit}</div>
              <div className="text-xs mt-2" style={{ color: "var(--gov-muted)", lineHeight: 1.3 }}>{kpi.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {/* Chart */}
        <div className="col-span-3 gov-card p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium" style={{ color: "var(--gov-text)" }}>Ввод жилья — план / факт</div>
              <div className="text-xs" style={{ color: "var(--gov-muted)" }}>тыс. м² · 2024</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gov-border)" />
              <XAxis dataKey="month" tick={{ fill: "var(--gov-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--gov-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--gov-card)", border: "1px solid var(--gov-border)", borderRadius: "2px", color: "var(--gov-text)" }}
                labelStyle={{ color: "var(--gov-text)" }}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", color: "var(--gov-muted)" }} />
              <Line type="monotone" dataKey="план" stroke="var(--gov-muted)" strokeWidth={1.5} dot={false} strokeDasharray="4 3" />
              <Line type="monotone" dataKey="факт" stroke="var(--gov-gold)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Programs status */}
        <div className="col-span-2 gov-card p-4">
          <div className="text-sm font-medium mb-4" style={{ color: "var(--gov-text)" }}>Статус программ</div>
          <div className="space-y-3">
            {programs.map((p) => (
              <div key={p.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs truncate pr-2" style={{ color: "var(--gov-muted)", maxWidth: "70%" }}>{p.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono-gov" style={{ color: "var(--gov-text)" }}>{p.progress}%</span>
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: statusColor[p.status as keyof typeof statusColor] }}></div>
                  </div>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "var(--gov-panel)" }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${p.progress}%`,
                      background: statusColor[p.status as keyof typeof statusColor],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operators summary */}
      <div>
        <SectionHeader title="Региональные операторы" subtitle="Сводка по обращениям" />
        <div className="gov-card mt-3 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--gov-border)", background: "var(--gov-panel)" }}>
                <th className="text-left px-4 py-2.5 text-xs font-medium" style={{ color: "var(--gov-muted)" }}>Район</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium" style={{ color: "var(--gov-muted)" }}>Оператор</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium" style={{ color: "var(--gov-muted)" }}>Обращений</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium" style={{ color: "var(--gov-muted)" }}>Выполнено</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium" style={{ color: "var(--gov-muted)" }}>%</th>
                <th className="text-center px-4 py-2.5 text-xs font-medium" style={{ color: "var(--gov-muted)" }}>Статус</th>
              </tr>
            </thead>
            <tbody>
              {operators.map((op, i) => {
                const pct = Math.round((op.done / op.appeals) * 100);
                return (
                  <tr key={i} style={{ borderBottom: "1px solid var(--gov-border)" }} className="hover:bg-opacity-50 transition-colors">
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--gov-text)" }}>{op.region}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--gov-muted)" }}>{op.operator}</td>
                    <td className="px-4 py-3 text-xs text-right font-mono-gov" style={{ color: "var(--gov-text)" }}>{op.appeals}</td>
                    <td className="px-4 py-3 text-xs text-right font-mono-gov" style={{ color: "var(--gov-text)" }}>{op.done}</td>
                    <td className="px-4 py-3 text-xs text-right font-mono-gov" style={{ color: statusColor[op.status as keyof typeof statusColor] }}>{pct}%</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs px-2 py-0.5" style={{ background: `${statusColor[op.status as keyof typeof statusColor]}20`, color: statusColor[op.status as keyof typeof statusColor], borderRadius: "2px" }}>
                        {statusLabel[op.status as keyof typeof statusLabel]}
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

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <h2 className="text-sm font-semibold" style={{ color: "var(--gov-text)" }}>{title}</h2>
      {subtitle && <span className="text-xs" style={{ color: "var(--gov-muted)" }}>{subtitle}</span>}
    </div>
  );
}