import { useEffect, useState } from "react";

// 30 de octubre de 2026, 8:30 pm (hora local del teléfono)
const INICIO = new Date(2026, 9, 30, 20, 30, 0);

function sumarMeses(fecha, meses) {
  const d = new Date(fecha);
  const dia = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + meses);
  const ultimo = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(dia, ultimo));
  return d;
}

function tiempoJuntos(ahora) {
  if (ahora < INICIO) return null;

  // Años y meses de calendario
  let meses =
    (ahora.getFullYear() - INICIO.getFullYear()) * 12 + (ahora.getMonth() - INICIO.getMonth());
  if (sumarMeses(INICIO, meses) > ahora) meses--;
  const base = sumarMeses(INICIO, meses);

  // Lo que sobra: días, horas, minutos, segundos
  let resto = Math.floor((ahora - base) / 1000);
  const dias = Math.floor(resto / 86400);
  resto %= 86400;
  const horas = Math.floor(resto / 3600);
  resto %= 3600;

  const totalSeg = Math.floor((ahora - INICIO) / 1000);
  return {
    partes: [
      { n: Math.floor(meses / 12), uno: "año", varios: "años" },
      { n: meses % 12, uno: "mes", varios: "meses" },
      { n: dias, uno: "día", varios: "días" },
      { n: horas, uno: "hora", varios: "horas" },
      { n: Math.floor(resto / 60), uno: "minuto", varios: "minutos" },
      { n: resto % 60, uno: "segundo", varios: "segundos" },
    ],
    totalDias: Math.floor(totalSeg / 86400),
    totalHoras: Math.floor(totalSeg / 3600),
    totalMinutos: Math.floor(totalSeg / 60),
  };
}

const num = (n) => n.toLocaleString("es");

export default function Juntos() {
  const [ahora, setAhora] = useState(() => new Date());

  // Solo corre mientras esta pantalla está abierta
  useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = tiempoJuntos(ahora);
  if (!t) return null;

  return (
    <div className="juntos">
      <figure className="juntos-foto">
        <img src="/fotos/primera-noche.jpeg" alt="Mario y ella la noche del 30 de octubre" />
        <figcaption>la noche que empezó todo</figcaption>
      </figure>
      <p className="juntos-titulo">Llevamos juntos</p>
      <div className="juntos-grid">
        {t.partes.map((p) => (
          <div key={p.uno} className="juntos-caja">
            <span className="juntos-num">{String(p.n).padStart(2, "0")}</span>
            <span className="juntos-label">{p.n === 1 ? p.uno : p.varios}</span>
          </div>
        ))}
      </div>
      <p className="juntos-total">
        o sea {num(t.totalDias)} días · {num(t.totalHoras)} horas · {num(t.totalMinutos)} minutos
      </p>
      <p className="juntos-desde">desde el 30 de octubre de 2026, 8:30 pm 💗</p>
    </div>
  );
}
