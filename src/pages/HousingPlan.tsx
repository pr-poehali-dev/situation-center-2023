import { useState } from "react";
import Icon from "@/components/ui/icon";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from "recharts";

const yearData2024 = [
  { month: "Янв", план: 42.5, факт: 38.2, дома: 3 },
  { month: "Фев", план: 45.0, факт: 44.8, дома: 4 },
  { month: "Мар", план: 48.0, факт: 51.3, дома: 5 },
  { month: "Апр", план: 50.0, факт: 48.7, дома: 4 },
  { month: "Май", план: 55.0, факт: 58.1, дома: 6 },
  { month: "Июн", план: 60.0, факт: 62.4, дома: 7 },
  { month: "Июл", план: 65.0, факт: 60.2, дома: 5 },
  { month: "Авг", план: 68.0, факт: 71.8, дома: 8 },
  { month: "Сен", план: 70.0, факт: 68.5, дома: 6 },
  { month: "Окт", план: 72.0, факт: 75.3, дома: 7 },
  { month: "Ноя", план: 75.0, факт: 72.1, дома: 6 },
  { month: "Дек", план: 80.0, факт: null, дома: null },
];

const yearData2023 = [
  { month: "Янв", план: 38, факт: 35 },
  { month: "Фев", план: 40, факт: 39 },
  { month: "Мар", план: 44, факт: 42 },
  { month: "Апр", план: 46, факт: 44 },
  { month: "Май", план: 50, факт: 52 },
  { month: "Июн", план: 54, факт: 55 },
  { month: "Июл", план: 58, факт: 54 },
  { month: "Авг", план: 62, факт: 64 },
  { month: "Сен", план: 64, факт: 61 },
  { month: "Окт", план: 66, факт: 69 },
  { month: "Ноя", план: 68, факт: 65 },
  { month: "Дек", план: 72, факт: 70 },
];

const compareData = yearData2024.map((d, i) => ({
  month: d.month,
  "2024": d.факт,
  "2023": yearData2023[i].факт,
}));

const districts = [
  { name: "Центральный р-н", plan: 182.4, fact: 167.3, objects: 14, ontime: 11 },
  { name: "Северный р-н", plan: 145.8, fact: 118.2, objects: 10, ontime: 7 },
  { name: "Южный р-н", plan: 201.6, fact: 198.4, objects: 17, ontime: 16 },
  { name: "Западный р-н", plan: 98.2, fact: 62.1, objects: 8, ontime: 4 },
  { name: "Восточный р-н", plan: 163.0, fact: 159.7, objects: 13, ontime: 12 },
];

const objects = [
  { name: "ЖК «Северный берег», корп. 1", district: "Северный р-н", area: 18420, planDate: "15.09.2024", factDate: "12.09.2024", status: "done", flats: 214 },
  { name: "МКД пр. Ленина, 45", district: "Центральный р-н", area: 9840, planDate: "30.10.2024", factDate: null, status: "progress", flats: 98 },
  { name: "ЖК «Семейный», корп. 2", district: "Южный р-н", area: 24100, planDate: "20.11.2024", factDate: null, status: "progress", flats: 312 },
  { name: "МКД ул. Садовая, 18", district: "Западный р-н", area: 7200, planDate: "01.08.2024", factDate: null, status: "overdue", flats: 72 },
  { name: "ЖК «Горизонт», корп. 3", district: "Восточный р-н", area: 15600, planDate: "15.12.2024", factDate: null, status: "progress", flats: 180 },
  { name: "МКД ул. Мира, 7", district: "Центральный р-н", area: 11200, planDate: "30.09.2024", factDate: "28.09.2024", status: "done", flats: 126 },
];

const statusCfg = {
  done: { label: "Введён", color: "#16a34a" },
  progress: { label: "Строится", color: "#d97706" },
  overdue: { label: "Отставание", color: "#dc2626" },
};

export default function HousingPlan() {
  const [compareMode, setCompareMode] = useState(false);

  const totalPlan = yearData2024.reduce((s, d) => s + d.план, 0);
  const totalFact = yearData2024.reduce((s, d) => s + (d.факт || 0), 0);
  const pct = Math.round((totalFact / totalPlan) * 100);

  return (
    <div className="space-y-5">
      {/* Topline */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Плановый ввод 2024", value: `${totalPlan.toFixed(0)} тыс. м²`, icon: "Target", color: "var(--gov-muted)" },
          { label: "Фактический ввод", value: `${totalFact.toFixed(0)} тыс. м²`, icon: "TrendingUp", color: "var(--gov-gold)" },
          { label: "Выполнение плана", value: `${pct}%`, icon: "Percent", color: pct >= 90 ? "#16a34a" : pct >= 75 ? "#d97706" : "#dc2626" },
          { label: "Объектов введено", value: "61 из 71", icon: "Building", color: "#2563eb" },
        ].map((s) => (
          <div key={s.label} className="gov-card p-4 flex items-center gap-3" style={{ borderTop: `2px solid ${s.color}` }}>
            <Icon name={s.icon} size={20} style={{ color: s.color }} />
            <div>
              <div className="stat-number text-xl font-semibold" style={{ color: "var(--gov-text)" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "var(--gov-muted)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main chart */}
      <div className="gov-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm font-medium" style={{ color: "var(--gov-text)" }}>
              Динамика ввода жилья
            </div>
            <div className="text-xs" style={{ color: "var(--gov-muted)" }}>тыс. м² по месяцам</div>
          </div>
          <div className="flex items-center gap-1" style={{ background: "var(--gov-panel)", border: "1px solid var(--gov-border)", borderRadius: "2px", padding: "2px" }}>
            <button
              onClick={() => setCompareMode(false)}
              className="px-3 py-1.5 text-xs transition-all"
              style={{
                borderRadius: "2px",
                background: !compareMode ? "var(--gov-card)" : "transparent",
                color: !compareMode ? "var(--gov-gold)" : "var(--gov-muted)",
              }}
            >
              2024: план/факт
            </button>
            <button
              onClick={() => setCompareMode(true)}
              className="px-3 py-1.5 text-xs transition-all"
              style={{
                borderRadius: "2px",
                background: compareMode ? "var(--gov-card)" : "transparent",
                color: compareMode ? "var(--gov-gold)" : "var(--gov-muted)",
              }}
            >
              Сравнение 2023/2024
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          {!compareMode ? (
            <BarChart data={yearData2024}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gov-border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--gov-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--gov-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--gov-card)", border: "1px solid var(--gov-border)", borderRadius: "2px", color: "var(--gov-text)" }}
                cursor={{ fill: "var(--gov-border)", opacity: 0.3 }}
              />
              <Legend iconType="square" iconSize={8} wrapperStyle={{ fontSize: "11px", color: "var(--gov-muted)" }} />
              <Bar dataKey="план" fill="var(--gov-border)" radius={[2, 2, 0, 0]} name="План" />
              <Bar dataKey="факт" fill="var(--gov-gold)" radius={[2, 2, 0, 0]} name="Факт" />
            </BarChart>
          ) : (
            <LineChart data={compareData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gov-border)" />
              <XAxis dataKey="month" tick={{ fill: "var(--gov-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--gov-muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "var(--gov-card)", border: "1px solid var(--gov-border)", borderRadius: "2px", color: "var(--gov-text)" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", color: "var(--gov-muted)" }} />
              <Line type="monotone" dataKey="2023" stroke="var(--gov-muted)" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="2024" stroke="var(--gov-gold)" strokeWidth={2} dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* By district */}
        <div className="gov-card overflow-hidden">
          <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--gov-border)", background: "var(--gov-panel)" }}>
            <span className="text-xs font-medium" style={{ color: "var(--gov-text)" }}>Выполнение по районам</span>
          </div>
          <div className="p-4 space-y-3">
            {districts.map((d) => {
              const pct = Math.round((d.fact / d.plan) * 100);
              const color = pct >= 90 ? "#16a34a" : pct >= 75 ? "#d97706" : "#dc2626";
              return (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "var(--gov-text)" }}>{d.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono-gov" style={{ color: "var(--gov-muted)" }}>{d.fact} / {d.plan}</span>
                      <span className="text-xs font-mono-gov w-10 text-right" style={{ color }}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "var(--gov-panel)" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: color, transition: "width 0.6s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Objects */}
        <div className="gov-card overflow-hidden">
          <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--gov-border)", background: "var(--gov-panel)" }}>
            <span className="text-xs font-medium" style={{ color: "var(--gov-text)" }}>Объекты — статус ввода</span>
          </div>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--gov-border)" }}>
                  {["Объект", "Площадь", "Срок", "Статус"].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-xs font-medium" style={{ color: "var(--gov-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {objects.map((obj) => {
                  const sc = statusCfg[obj.status as keyof typeof statusCfg];
                  return (
                    <tr key={obj.name} style={{ borderBottom: "1px solid var(--gov-border)" }}>
                      <td className="px-3 py-2.5">
                        <div className="text-xs font-medium" style={{ color: "var(--gov-text)", lineHeight: 1.3 }}>{obj.name}</div>
                        <div className="text-xs" style={{ color: "var(--gov-muted)" }}>{obj.district}</div>
                      </td>
                      <td className="px-3 py-2.5 text-xs font-mono-gov" style={{ color: "var(--gov-muted)" }}>{(obj.area / 1000).toFixed(1)}к м²</td>
                      <td className="px-3 py-2.5 text-xs font-mono-gov" style={{ color: obj.status === "overdue" ? "#f87171" : "var(--gov-muted)" }}>
                        {obj.factDate || obj.planDate}
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-xs px-1.5 py-0.5" style={{ background: `${sc.color}20`, color: sc.color, borderRadius: "2px" }}>
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
    </div>
  );
}