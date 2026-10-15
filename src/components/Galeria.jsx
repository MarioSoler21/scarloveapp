import { useState } from "react";
import { FOTOS } from "../fotos.js";

function Polaroid({ foto, i, onAmor }) {
  const [brinca, setBrinca] = useState(false);

  const tocar = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    onAmor("corazon", r.left + r.width / 2, r.top + r.height / 3, 12);
    setBrinca(false);
    requestAnimationFrame(() => setBrinca(true));
  };

  return (
    <button
      type="button"
      className={`polaroid${brinca ? " brinca" : ""}`}
      style={{ "--giro": `${i % 2 ? 2 : -2}deg` }}
      onClick={tocar}
      onAnimationEnd={() => setBrinca(false)}
    >
      <img src={foto.src} alt={foto.titulo} loading="lazy" style={{ objectPosition: foto.pos }} />
      <span className="polaroid-titulo">{foto.titulo}</span>
      <span className="polaroid-texto">{foto.texto}</span>
    </button>
  );
}

export default function Galeria({ onAmor }) {
  return (
    <section className="seccion">
      <h2 className="titulo-seccion">Cosas que me encantan de ti</h2>
      <p className="sub-seccion">Toca una foto para mandarle corazones.</p>
      <div className="galeria">
        {FOTOS.map((foto, i) => (
          <Polaroid key={foto.src} foto={foto} i={i} onAmor={onAmor} />
        ))}
      </div>
    </section>
  );
}
