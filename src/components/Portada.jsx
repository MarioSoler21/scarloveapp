export default function Portada({ onAbrir }) {
  return (
    <main className="pantalla portada entrar">
      <p className="sobre">Para Nena Scar</p>
      <h1>Tengo algo para ti, mi amor</h1>
      <button className="boton-grande" type="button" onClick={onAbrir}>
        Toca aquí
      </button>
      <p className="pista">(con cuidado, está lleno de amor)</p>
    </main>
  );
}
