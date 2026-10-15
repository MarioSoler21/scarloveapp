import { useRef, useState } from "react";
import Lluvia from "./components/Lluvia.jsx";
import Portada from "./components/Portada.jsx";
import Amor from "./components/Amor.jsx";

export default function App() {
  const [pantalla, setPantalla] = useState("portada");
  const lluvia = useRef(null);

  const ir = (destino) => {
    setPantalla(destino);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Lluvia ref={lluvia} modo={pantalla} />
      {pantalla === "portada" ? (
        <Portada onAbrir={() => ir("amor")} />
      ) : (
        <Amor lluvia={lluvia} onVolver={() => ir("portada")} />
      )}
    </>
  );
}
