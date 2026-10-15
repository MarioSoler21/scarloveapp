import { useCallback, useEffect, useRef, useState } from "react";
import { DIBUJOS, tipoAzar } from "../dibujos.js";
import Carta from "./Carta.jsx";
import Galeria from "./Galeria.jsx";

const FRASES = [
  "eres mi persona favorita",
  "me encantas, muñeca",
  "huskies para la más bonita",
  "un pollo chuco por cada beso",
  "bebidita de fresa para mi reina",
  "te quiero un montón",
  "eres mi lugar feliz",
  "contigo todo es rosa",
  "mi corazón es tuyo",
  "perdóname, nena",
];

let ultimaFrase = -1;
function fraseAzar() {
  let i;
  do i = Math.floor(Math.random() * FRASES.length);
  while (i === ultimaFrase);
  ultimaFrase = i;
  return FRASES[i];
}

const FICHAS = [
  { tipo: "husky", nombre: "Huskies" },
  { tipo: "pollo", nombre: "Pollo chuco" },
  { tipo: "fresa", nombre: "Bebida de fresa" },
  { tipo: "corazon", nombre: "Corazones" },
];

export default function Amor({ lluvia, onVolver }) {
  const [total, setTotal] = useState(0);
  const [frase, setFrase] = useState("toca la pantalla donde quieras");
  const [fraseVisible, setFraseVisible] = useState(true);
  const [globitos, setGlobitos] = useState([]);
  const idGlobito = useRef(0);

  const lanzar = useCallback(
    (tipo, x, y, n) => {
      lluvia.current?.explosion(tipo, x, y, n);
      setTotal((t) => t + n);
    },
    [lluvia]
  );

  // Explosión de bienvenida
  useEffect(() => {
    const cx = innerWidth / 2;
    const cy = innerHeight / 2;
    const ids = [
      setTimeout(() => lanzar("todo", cx, cy, 24), 0),
      setTimeout(() => lanzar("corazon", cx * 0.5, cy, 10), 250),
      setTimeout(() => lanzar("corazon", cx * 1.5, cy, 10), 450),
    ];
    return () => ids.forEach(clearTimeout);
  }, [lanzar]);

  // Frases que van cambiando
  useEffect(() => {
    let fade;
    const id = setInterval(() => {
      setFraseVisible(false);
      fade = setTimeout(() => {
        setFrase(fraseAzar());
        setFraseVisible(true);
      }, 300);
    }, 3500);
    return () => {
      clearInterval(id);
      clearTimeout(fade);
    };
  }, []);

  const tocarFondo = (e) => {
    if (e.target.closest("button, .carta, a")) return;
    lanzar(tipoAzar(), e.clientX, e.clientY, 7);
    lanzar("corazon", e.clientX, e.clientY, 3);
    if (Math.random() < 0.45) {
      const id = ++idGlobito.current;
      const x = Math.min(Math.max(e.clientX, 110), innerWidth - 110);
      setGlobitos((g) => [...g, { id, x, y: e.clientY, texto: fraseAzar() }]);
      setTimeout(() => setGlobitos((g) => g.filter((b) => b.id !== id)), 1900);
    }
  };

  const desdeBoton = (e, tipo, n) => {
    const r = e.currentTarget.getBoundingClientRect();
    lanzar(tipo, r.left + r.width / 2, r.top, n);
  };

  return (
    <main className="amor entrar" onPointerDown={tocarFondo}>
      <button className="volver" type="button" onClick={onVolver}>
        ← volver
      </button>

      <section className="pantalla hero">
        <span className="contador">Amor lanzado: {total}</span>
        <div className="hero-centro">
          <h1 className="te-amo">
            Te amo<span>muñeca hermosa</span>
          </h1>
          <p className="frase" style={{ opacity: fraseVisible ? 1 : 0 }}>
            {frase}
          </p>
        </div>
        <div className="barra">
          {FICHAS.map((f) => (
            <button key={f.tipo} className="ficha" type="button" onClick={(e) => desdeBoton(e, f.tipo, 10)}>
              <img alt="" src={DIBUJOS[f.tipo][0]} />
              {f.nombre}
            </button>
          ))}
          <button className="ficha todo" type="button" onClick={(e) => desdeBoton(e, "todo", 20)}>
            ¡Todo junto!
          </button>
        </div>
        <p className="baja">baja, que hay más ↓</p>
      </section>

      <Carta />

      <Galeria onAmor={lanzar} />

      <footer className="firma">
        Hecho con todo mi amor por <b>Mario Soler</b>
      </footer>

      <div className="globos" aria-hidden="true">
        {globitos.map((g) => (
          <div key={g.id} className="globito" style={{ left: g.x, top: g.y }}>
            {g.texto}
          </div>
        ))}
      </div>
    </main>
  );
}
