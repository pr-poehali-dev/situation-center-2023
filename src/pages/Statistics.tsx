import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";

const programs = [
  {
    id: "mortgage",
    name: "Льготная ипотека",
    icon: "Home",
    color: "#2563eb",
    metrics: [
      { label: "Выдано кредитов", value: "7 735", unit: "шт.", change: "+15.2%" },
      { label: "Общая сумма", value: "48.4 млрд", unit: "руб.", change: "+18.7%" },
      { label: "Ср. ставка", value: "6.2%", unit: "", change: "-0.3%" },
      { label: "Отказов", value: "1 203", unit: "шт.", change: "-8.1%" },
    ],
  },
  {
    id: "orphans",
    name: "Жильё для сирот",
    icon: "Heart",
    color: "#f472b6",
    metrics: [
      { label: "В очереди", value: "2 147", unit: "чел.", change: "+3.4%" },
      { label: "Получили жильё", value: "401", unit: "чел.", change: "+12.8%" },
      { label: "Ср. ожидание", value: "4.2", unit: "года", change: "-0.3" },
      { label: "Нарушений", value: "18", unit: "шт.", change: "+2" },
    ],
  },
  {
    id: "large",
    name: "Многодетные семьи",
    icon: "Users",
    color: "#a78bfa",
    metrics: [
      { label: "На учёте", value: "8 420", unit: "семей", change: "+5.1%" },
      { label: "Получили субсидию", value: "1 155", unit: "семей", change: "+9.3%" },
      { label: "Сумма субсидий", value: "2.3 млрд", unit: "руб.", change: "+11.2%" },
      { label: "В ожидании", value: "7 265", unit: "семей", change: "+3.8%" },
    ],
  },
  {
    id: "young",
    name: "Молодые семьи",
    icon: "Star",
    color: "#4ade80",
    metrics: [
      { label: "Участников программы", value: "12 840", unit: "семей", change: "+7.2%" },
      { label: "Улучшили условия", value: "2 108", unit: "семей", change: "+14.1%" },
      { label: "Ср. субсидия", value: "1.8 млн", unit: "руб.", change: "+4.6%" },
      { label: "Ожидают решения", value: "10 732", unit: "семей", change: "+5.9%" },
    ],
  },
];

const quarterData = [
  { q: "Q1 2023", ипотека: 1820, сироты: 87, многодетные: 245, молодые: 420 },
  { q: "Q2 2023", ипотека: 2100, сироты: 92, многодетные: 280, молодые: 510 },
  { q: "Q3 2023", ипотека: 1950, сироты: 105, многодетные: 298, молодые: 489 },
  { q: "Q4 2023", ипотека: 2420, сироты: 118, многодетные: 332, молодые: 601 },
  { q: "Q1 2024", ипотека: 1940, сироты: 95, многодетные: 270, молодые: 468 },
  { q: "Q2 2024", ипотека: 2310, сироты: 112, многодетные: 305, молодые: 548 },
  { q: "Q3 2024", ипотека: 2180, сироты: 108, многодетные: 318, молодые: 524 },
];

const pieData = [
  { name: "Льготная ипотека", value: 54, color: "#2563eb" },
  { name: "Молодые семьи", value: 25, color: "#16a34a" },
  { name: "Многодетные", value: 14, color: "#a78bfa" },
  { name: "Сироты", value: 7, color: "#f472b6" },
];

const waitTrend = [
  { year: "2020", сироты: 5.8, молодые: 3.2, многодетные: 4.1 },
  { year: "2021", сироты: 5.4, молодые: 3.0, многодетные: 3.8 },
  { year: "2022", сироты: 5.1, молодые: 2.8, многодетные: 3.5 },
  { year: "2023", сироты: 4.6, молодые: 2.5, многодетные: 3.2 },
  { year: "2024", сироты: 4.2, молодые: 2.3, многодетные: 2.9 },
];

export default function Statistics() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      {/* Program cards */}
      <div className="grid grid-cols-4 gap-4">
        {programs.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            className="gov-card p-4 cursor-pointer transition-all duration-200"
            style={{
              borderTop: `2px solid ${p.color}`,
              outline: selected === p.id ? `1px solid ${p.color}` : "none",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5" style={{ background: `${p.color}20`, borderRadius: "2px" }}>
                <Icon name={p.icon} size={14} style={{ color: p.color }} />
              </div>
              <span className="text-xs font-medium" style={{ color: "var(--gov-text)" }}>{p.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {p.metrics.slice(0, 2).map((m) => (
                <div key={m.label}>
                  <div className="stat-number text-base font-semibold" style={{ color: "var(--gov-text)" }}>{m.value}</div>
                  <div className="text-xs" style={{ color: "var(--gov-muted)", fontSize: "10px", lineHeight: 1.3 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (() => {
        const prog = programs.find((p) => p.id === selected)!;
        return (
          <div className="gov-card p-5 animate-fade-in" style={{ borderTop: `2px solid ${prog.color}` }}>
            <div className="flex items-center gap-3 mb-4">
              <Icon name={prog.icon} size={16} style={{ color: prog.color }} />
              <span className="text-sm font-semibold" style={{ color: "var(--gov-text)" }}>{prog.name} — детальные показатели</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {prog.metrics.map((m) => (
                <div key={m.label} className="p-3" style={{ background: "var(--gov-panel)", borderRadius: "2px", border: "1px solid var(--gov-border)" }}>
                  <div className="stat-number text-xl font-semibold" style={{ color: "var(--gov-text)" }}>{m.value}</div>
                  {m.unit && <div className="text-xs" style={{ color: "var(--gov-muted)" }}>{m.unit}</div>}
                  <div className="text-xs mt-1" style={{ color: "var(--gov-muted)", lineHeight: 1.3 }}>{m.label}</div>
                  <div className="text-xs mt-1 font-mono-gov" style={{ color: m.change.startsWith("+") && m.label !== "Нарушений" && m.label !== "Отказов" ? "#4ade80" : m.change.startsWith("-") ? "#facc15" : "#f87171" }}>
                    {m.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      <div className="grid grid-cols-3 gap-4">
        {/* Quarterly bar chart */}
        <div className="col-span-2 gov-card p-4">
          <div className="text-sm font-medium mb-1" style={{ color: "var(--gov-text)" }}>Семьи, улучшившие жилищные условия</div>
          <div className="text-xs mb-4" style={{ color: "var(--gov-muted)" }}>По программам / по кварталам</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={quarterData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gov-border)" vertical={false} />
              <XAxis dataKey="q" tick={{ fill: "var(--gov-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--gov-muted)", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--gov-card)", border: "1px solid var(--gov-border)", borderRadius: "2px", color: "var(--gov-text)", fontSize: "11px" }} cursor={{ fill: "var(--gov-border)", opacity: 0.3 }} />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: "10px", color: "var(--gov-muted)" }} />
              <Bar dataKey="ипотека" stackId="a" fill="#2563eb" />
              <Bar dataKey="молодые" stackId="a" fill="#16a34a" />
              <Bar dataKey="многодетные" stackId="a" fill="#a78bfa" />
              <Bar dataKey="сироты" stackId="a" fill="#f472b6" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie */}
        <div className="gov-card p-4">
          <div className="text-sm font-medium mb-1" style={{ color: "var(--gov-text)" }}>Структура помощи</div>
          <div className="text-xs mb-2" style={{ color: "var(--gov-muted)" }}>Доля программ в 2024</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value">
                {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--gov-card)", border: "1px solid var(--gov-border)", borderRadius: "2px", color: "var(--gov-text)", fontSize: "11px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }}></div>
                  <span className="text-xs" style={{ color: "var(--gov-muted)", fontSize: "10px" }}>{d.name}</span>
                </div>
                <span className="text-xs font-mono-gov" style={{ color: "var(--gov-text)" }}>{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wait time trend */}
      <div className="gov-card p-4">
        <div className="text-sm font-medium mb-1" style={{ color: "var(--gov-text)" }}>Среднее время ожидания улучшения жилья</div>
        <div className="text-xs mb-4" style={{ color: "var(--gov-muted)" }}>лет · динамика 2020–2024</div>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={waitTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--gov-border)" />
            <XAxis dataKey="year" tick={{ fill: "var(--gov-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "var(--gov-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "var(--gov-card)", border: "1px solid var(--gov-border)", borderRadius: "2px", color: "var(--gov-text)", fontSize: "11px" }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", color: "var(--gov-muted)" }} />
            <Line type="monotone" dataKey="сироты" stroke="#f472b6" strokeWidth={2} dot={{ fill: "#f472b6", r: 3 }} />
            <Line type="monotone" dataKey="многодетные" stroke="#a78bfa" strokeWidth={2} dot={{ fill: "#a78bfa", r: 3 }} />
            <Line type="monotone" dataKey="молодые" stroke="#4ade80" strokeWidth={2} dot={{ fill: "#4ade80", r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}