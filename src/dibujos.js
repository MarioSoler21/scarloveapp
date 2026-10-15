// Dibujitos hechos a mano en SVG: husky, pollo chuco, bebida de fresa y corazones.
const svg = (s) => "data:image/svg+xml;utf8," + encodeURIComponent(s);

const HUSKY = svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M16 46 L26 6 L46 30 Z" fill="#5d6577"/><path d="M84 46 L74 6 L54 30 Z" fill="#5d6577"/>
  <path d="M23 38 L28 17 L39 31 Z" fill="#ffb3cb"/><path d="M77 38 L72 17 L61 31 Z" fill="#ffb3cb"/>
  <ellipse cx="50" cy="56" rx="36" ry="32" fill="#6c7487"/>
  <path d="M50 26 L42 50 L58 50 Z" fill="#fff"/>
  <ellipse cx="50" cy="68" rx="27" ry="21" fill="#fff"/>
  <ellipse cx="36" cy="50" rx="10" ry="8" fill="#fff"/><ellipse cx="64" cy="50" rx="10" ry="8" fill="#fff"/>
  <circle cx="36" cy="54" r="6" fill="#56b6ff"/><circle cx="64" cy="54" r="6" fill="#56b6ff"/>
  <circle cx="36" cy="54" r="3" fill="#1d2433"/><circle cx="64" cy="54" r="3" fill="#1d2433"/>
  <circle cx="38" cy="52" r="1.4" fill="#fff"/><circle cx="66" cy="52" r="1.4" fill="#fff"/>
  <ellipse cx="50" cy="67" rx="6.5" ry="4.5" fill="#1d2433"/>
  <path d="M43 75 Q50 81 57 75" fill="none" stroke="#1d2433" stroke-width="2.4" stroke-linecap="round"/>
  <path d="M47 78 Q50 88 53 78 Z" fill="#ff6f9f"/>
  <circle cx="27" cy="68" r="5" fill="#ffb3cb" opacity=".8"/><circle cx="73" cy="68" r="5" fill="#ffb3cb" opacity=".8"/>
</svg>`);

const POLLO = svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <ellipse cx="50" cy="62" rx="46" ry="30" fill="#ffffff" stroke="#f2c7d6" stroke-width="3"/>
  <g fill="#f6d36b" stroke="#d9a93a" stroke-width="1.5">
    <ellipse cx="22" cy="60" rx="13" ry="7" transform="rotate(-20 22 60)"/>
    <ellipse cx="28" cy="72" rx="13" ry="7" transform="rotate(10 28 72)"/>
    <ellipse cx="74" cy="72" rx="13" ry="7" transform="rotate(-12 74 72)"/>
    <ellipse cx="80" cy="58" rx="12" ry="6.5" transform="rotate(25 80 58)"/>
  </g>
  <g fill="#9bd16f"><circle cx="40" cy="76" r="4"/><circle cx="46" cy="80" r="3.5"/><circle cx="58" cy="79" r="4"/><circle cx="64" cy="75" r="3"/></g>
  <rect x="58" y="22" width="22" height="9" rx="4" fill="#fff6ea" transform="rotate(-35 69 26)"/>
  <circle cx="80" cy="16" r="6" fill="#fff6ea"/><circle cx="85" cy="23" r="6" fill="#fff6ea"/>
  <path d="M22 52 C18 30 40 18 58 28 C70 34 68 54 56 60 C44 66 26 64 22 52 Z" fill="#c9752e"/>
  <path d="M28 46 C30 34 42 28 52 32" fill="none" stroke="#e8a35a" stroke-width="4" stroke-linecap="round"/>
  <g fill="#9a5520"><circle cx="38" cy="50" r="2"/><circle cx="48" cy="44" r="2"/><circle cx="46" cy="55" r="1.8"/><circle cx="32" cy="40" r="1.6"/></g>
  <g fill="#e2384b"><circle cx="34" cy="62" r="3"/><circle cx="52" cy="64" r="2.6"/><circle cx="62" cy="58" r="2.2"/></g>
</svg>`);

const FRESA = svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="56" y="2" width="7" height="40" rx="3" fill="#1f8a4c" transform="rotate(14 60 22)"/>
  <path d="M26 30 L74 30 L67 94 L33 94 Z" fill="#ff8db6"/>
  <path d="M30 46 L70 46 L67 94 L33 94 Z" fill="#ff6fa3"/>
  <path d="M26 30 L74 30 L67 94 L33 94 Z" fill="none" stroke="#ffffff" stroke-width="2.5" opacity=".9"/>
  <path d="M33 36 L37 88" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity=".6"/>
  <circle cx="46" cy="62" r="8" fill="#e8304f"/><circle cx="59" cy="78" r="7" fill="#e8304f"/>
  <g fill="#ffe08a"><circle cx="44" cy="60" r="1"/><circle cx="48" cy="64" r="1"/><circle cx="46" cy="66" r="1"/><circle cx="58" cy="76" r="1"/><circle cx="61" cy="80" r="1"/></g>
  <path d="M22 31 Q50 8 78 31 Z" fill="#ffffff" opacity=".85"/>
  <rect x="20" y="28" width="60" height="6" rx="3" fill="#ffffff"/>
</svg>`);

const corazon = (c) => svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M50 88 C20 66 6 50 6 32 C6 18 17 8 30 8 C39 8 46 13 50 20 C54 13 61 8 70 8 C83 8 94 18 94 32 C94 50 80 66 50 88 Z" fill="${c}"/>
  <ellipse cx="28" cy="28" rx="9" ry="6" fill="#ffffff" opacity=".45" transform="rotate(-30 28 28)"/>
</svg>`);

export const DIBUJOS = {
  husky: [HUSKY],
  pollo: [POLLO],
  fresa: [FRESA],
  corazon: [corazon("#ff4f8f"), corazon("#ff86b3"), corazon("#e2296f"), corazon("#c9a2ff")],
};

export const TIPOS = ["husky", "pollo", "fresa", "corazon"];

export const tipoAzar = () => TIPOS[Math.floor(Math.random() * TIPOS.length)];
