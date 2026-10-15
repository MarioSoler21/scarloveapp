import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { DIBUJOS, tipoAzar } from "../dibujos.js";

const reducido =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const MAX = reducido ? 40 : 160;
const azar = (a, b) => a + Math.random() * (b - a);

// Capa fija de cositas que caen. Se maneja por fuera con ref.current.explosion(...)
const Lluvia = forwardRef(function Lluvia({ modo }, ref) {
  const capa = useRef(null);
  const piezas = useRef([]);

  const crear = (tipo, x, y, vx, vy, g) => {
    if (!capa.current) return;
    if (piezas.current.length >= MAX) piezas.current.shift().el.remove();
    const lista = DIBUJOS[tipo];
    const el = document.createElement("img");
    el.alt = "";
    el.src = lista[Math.floor(Math.random() * lista.length)];
    const tam = tipo === "corazon" ? azar(30, 60) : azar(52, 86);
    el.style.width = el.style.height = tam + "px";
    capa.current.appendChild(el);
    piezas.current.push({
      el, vx, vy, g,
      x: x - tam / 2,
      y: y - tam / 2,
      r: azar(-20, 20),
      vr: azar(-3, 3),
      t: azar(0, 6),
    });
  };

  useImperativeHandle(ref, () => ({
    explosion(tipo, x, y, n) {
      for (let i = 0; i < n; i++) {
        const t = tipo === "todo" ? ["husky", "pollo", "fresa", "corazon"][i % 4] : tipo;
        crear(t, x, y, azar(-5, 5), azar(-13, -6), 0.32);
      }
    },
  }), []);

  useEffect(() => {
    let ultimo = performance.now();
    let id;
    const paso = (ahora) => {
      const dt = Math.min((ahora - ultimo) / 16.67, 3);
      ultimo = ahora;
      const alto = window.innerHeight;
      piezas.current = piezas.current.filter((p) => {
        p.vy += p.g * dt;
        p.x += (p.vx + Math.sin((p.t += 0.04 * dt)) * 0.4) * dt;
        p.y += p.vy * dt;
        p.r += p.vr * dt;
        if (p.y > alto + 120 || p.y < -260) {
          p.el.remove();
          return false;
        }
        p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.r}deg)`;
        return true;
      });
      id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => {
      cancelAnimationFrame(id);
      piezas.current.forEach((p) => p.el.remove());
      piezas.current = [];
    };
  }, []);

  // Portada: corazones que suben. Pantalla de amor: lluvia suave de todo.
  useEffect(() => {
    const id =
      modo === "portada"
        ? setInterval(
            () => crear("corazon", azar(0, innerWidth), innerHeight + 40, azar(-0.5, 0.5), azar(-2.2, -1.2), 0),
            reducido ? 1400 : 420
          )
        : setInterval(
            () => crear(tipoAzar(), azar(0, innerWidth), -60, azar(-0.6, 0.6), azar(1, 2.5), 0.03),
            reducido ? 1500 : 550
          );
    return () => clearInterval(id);
  }, [modo]);

  return <div className="lluvia" ref={capa} aria-hidden="true" />;
});

export default Lluvia;
