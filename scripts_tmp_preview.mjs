import path from "path";
import sharp from "sharp";

function wrap(bgFrom, bgTo, iconPaths) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bgFrom}"/><stop offset="100%" stop-color="${bgTo}"/>
    </linearGradient></defs>
    <rect width="600" height="600" fill="url(#g)"/>
    <g fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
      ${iconPaths}
    </g>
  </svg>`;
}

const shirtBase = `<path d="M190,150 L240,150 A60,60 0 0 0 360,150 L410,150 L470,220 L410,270 L390,250 L390,450 L210,450 L210,250 L190,270 L130,220 Z" fill="#ffffff" stroke="none"/>`;

const PALETTES = [
  ["#4338ca", "#6366f1"], ["#0f766e", "#14b8a6"], ["#b91c1c", "#ef4444"], ["#a16207", "#eab308"],
  ["#7e22ce", "#a855f7"], ["#0369a1", "#0ea5e9"], ["#166534", "#22c55e"], ["#9d174d", "#ec4899"],
  ["#c2410c", "#f97316"], ["#334155", "#64748b"], ["#78350f", "#b45309"], ["#3f3f46", "#71717a"],
];
let pi = 0;
const nextPalette = () => PALETTES[pi++ % PALETTES.length];

const TYPES = {};
function define(name, iconFn) {
  const [from, to] = nextPalette();
  TYPES[name] = wrap(from, to, iconFn());
}

define("Cap", () => `
  <path d="M220,280 A80,80 0 0 1 380,280 Z" fill="#ffffff" stroke="none"/>
  <path d="M150,280 Q300,320 450,280 L450,300 Q300,345 150,300 Z" fill="#ffffff" stroke="none"/>`);

define("Bluetooth Speaker", () => `
  <rect x="200" y="140" width="200" height="320" rx="40" fill="#ffffff" stroke="none"/>
  ${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<circle cx="${250 + c * 50}" cy="${210 + r * 50}" r="14" fill="#0f766e"/>`)).join("")}`);

define("Camera Bag", () => `
  <rect x="150" y="200" width="300" height="220" rx="24" fill="#ffffff" stroke="none"/>
  <rect x="230" y="160" width="140" height="60" rx="16" fill="#ffffff" stroke="none"/>
  <circle cx="300" cy="320" r="55" fill="#b91c1c"/>
  <circle cx="300" cy="320" r="30" fill="#ffffff"/>`);

define("Coffee Mug", () => `
  <rect x="180" y="220" width="200" height="200" rx="16" fill="#ffffff" stroke="none"/>
  <path d="M380,250 A60,60 0 0 1 380,390" fill="none" stroke="#ffffff" stroke-width="22"/>
  <path d="M210,180 Q220,160 230,180" stroke="#ffffff" stroke-width="10" fill="none"/>
  <path d="M250,180 Q260,155 270,180" stroke="#ffffff" stroke-width="10" fill="none"/>`);

define("Cotton T-Shirt", () => shirtBase);

define("Denim Jacket", () => `
  ${shirtBase.replace('fill="#ffffff"', 'fill="#6366f1"')}
  <line x1="300" y1="150" x2="300" y2="450" stroke="#ffffff" stroke-width="8"/>
  <rect x="235" y="260" width="50" height="40" rx="4" fill="none" stroke="#ffffff" stroke-width="8"/>
  <rect x="315" y="260" width="50" height="40" rx="4" fill="none" stroke="#ffffff" stroke-width="8"/>`);

define("Desk Lamp", () => `
  <ellipse cx="300" cy="450" rx="90" ry="18" fill="#ffffff" stroke="none"/>
  <rect x="290" y="260" width="20" height="190" fill="#ffffff" stroke="none"/>
  <path d="M230,150 L370,150 L400,260 L200,260 Z" fill="#ffffff" stroke="none"/>`);

define("Desk Organizer", () => `
  <rect x="160" y="220" width="280" height="160" rx="16" fill="#ffffff" stroke="none"/>
  <line x1="253" y1="220" x2="253" y2="380" stroke="#7e22ce" stroke-width="8"/>
  <line x1="346" y1="220" x2="346" y2="380" stroke="#7e22ce" stroke-width="8"/>
  <line x1="300" y1="220" x2="230" y2="120" stroke="#ffffff" stroke-width="10"/>`);

define("Duffel Bag", () => `
  <rect x="150" y="230" width="300" height="170" rx="70" fill="#ffffff" stroke="none"/>
  <path d="M240,230 A60,50 0 0 1 360,230" fill="none" stroke="#ffffff" stroke-width="16"/>
  <line x1="300" y1="230" x2="300" y2="400" stroke="#0369a1" stroke-width="8"/>`);

define("Gaming Chair", () => `
  <rect x="220" y="140" width="160" height="220" rx="24" fill="#ffffff" stroke="none"/>
  <rect x="200" y="360" width="200" height="60" rx="16" fill="#ffffff" stroke="none"/>
  <rect x="170" y="370" width="40" height="90" rx="10" fill="#ffffff" stroke="none"/>
  <rect x="390" y="370" width="40" height="90" rx="10" fill="#ffffff" stroke="none"/>
  <circle cx="300" cy="470" r="16" fill="#166534"/>`);

define("Headphones", () => `
  <path d="M180,300 A120,120 0 0 1 420,300" fill="none" stroke="#ffffff" stroke-width="20"/>
  <rect x="150" y="290" width="60" height="100" rx="20" fill="#ffffff" stroke="none"/>
  <rect x="390" y="290" width="60" height="100" rx="20" fill="#ffffff" stroke="none"/>`);

define("Hoodie", () => `
  <path d="M215,155 Q300,90 385,155 L360,175 Q300,130 240,175 Z" fill="#ffffff" stroke="none"/>
  ${shirtBase}
  <circle cx="285" cy="330" r="7" fill="#c2410c"/>
  <circle cx="315" cy="330" r="7" fill="#c2410c"/>`);

define("Jacket", () => `
  ${shirtBase}
  <line x1="300" y1="155" x2="300" y2="450" stroke="#334155" stroke-width="8"/>`);

define("Keyboard", () => `
  <rect x="150" y="230" width="300" height="140" rx="16" fill="#ffffff" stroke="none"/>
  ${[0, 1, 2].flatMap((r) => [0, 1, 2, 3, 4].map((c) => `<rect x="${175 + c * 52}" y="${255 + r * 38}" width="34" height="24" rx="4" fill="#3f3f46"/>`)).join("")}`);

define("Kitchen Knife Set", () => `
  <rect x="200" y="300" width="200" height="140" rx="12" fill="#ffffff" stroke="none"/>
  <path d="M240,300 L240,150 L260,120 L280,150 L280,300 Z" fill="#ffffff" stroke="none"/>
  <path d="M300,300 L300,130 L320,100 L340,130 L340,300 Z" fill="#ffffff" stroke="none"/>
  <path d="M360,300 L360,160 L380,135 L400,160 L400,300 Z" fill="#ffffff" stroke="none"/>`);

define("Laptop Stand", () => `
  <rect x="180" y="200" width="240" height="20" rx="10" fill="#ffffff" stroke="none"/>
  <path d="M220,220 L180,400 L230,400 L260,220 Z" fill="#ffffff" stroke="none"/>
  <path d="M380,220 L420,400 L370,400 L340,220 Z" fill="#ffffff" stroke="none"/>`);

define("Leather Belt", () => `
  <rect x="130" y="270" width="340" height="60" rx="20" fill="#ffffff" stroke="none"/>
  <rect x="255" y="255" width="90" height="90" rx="10" fill="none" stroke="#78350f" stroke-width="10"/>
  <circle cx="180" cy="300" r="8" fill="#78350f"/>
  <circle cx="210" cy="300" r="8" fill="#78350f"/>`);

define("Monitor Stand", () => `
  <rect x="170" y="380" width="260" height="30" rx="14" fill="#ffffff" stroke="none"/>
  <rect x="280" y="270" width="40" height="110" fill="#ffffff" stroke="none"/>
  <rect x="190" y="230" width="220" height="40" rx="16" fill="#ffffff" stroke="none"/>`);

define("Mouse", () => `
  <path d="M300,150 C220,150 200,230 200,330 C200,410 240,460 300,460 C360,460 400,410 400,330 C400,230 380,150 300,150 Z" fill="#ffffff" stroke="none"/>
  <line x1="300" y1="150" x2="300" y2="260" stroke="#0369a1" stroke-width="8"/>
  <line x1="240" y1="230" x2="360" y2="230" stroke="#0369a1" stroke-width="6"/>`);

define("Notebook", () => `
  <rect x="190" y="140" width="230" height="320" rx="12" fill="#ffffff" stroke="none"/>
  ${[0, 1, 2, 3, 4, 5].map((i) => `<circle cx="190" cy="${170 + i * 55}" r="10" fill="#9d174d"/>`).join("")}
  <line x1="250" y1="220" x2="380" y2="220" stroke="#9d174d" stroke-width="6"/>
  <line x1="250" y1="260" x2="380" y2="260" stroke="#9d174d" stroke-width="6"/>
  <line x1="250" y1="300" x2="350" y2="300" stroke="#9d174d" stroke-width="6"/>`);

define("Office Chair", () => `
  <rect x="230" y="130" width="140" height="200" rx="40" fill="#ffffff" stroke="none"/>
  <rect x="210" y="340" width="180" height="50" rx="14" fill="#ffffff" stroke="none"/>
  <rect x="290" y="390" width="20" height="60" fill="#ffffff" stroke="none"/>
  <ellipse cx="300" cy="460" rx="80" ry="14" fill="#ffffff" stroke="none"/>`);

define("Phone Case", () => `
  <rect x="220" y="130" width="160" height="340" rx="30" fill="#ffffff" stroke="none"/>
  <circle cx="355" cy="165" r="12" fill="#c2410c"/>
  <rect x="212" y="230" width="8" height="60" rx="4" fill="#ffffff" stroke="none"/>`);

define("Power Bank", () => `
  <rect x="220" y="150" width="160" height="300" rx="24" fill="#ffffff" stroke="none"/>
  <rect x="250" y="190" width="20" height="60" fill="#334155"/>
  <rect x="290" y="190" width="20" height="60" fill="#334155"/>
  <rect x="330" y="190" width="20" height="60" fill="#334155"/>
  <circle cx="300" cy="380" r="16" fill="#334155"/>`);

define("Running Shoes", () => `
  <path d="M140,340 L140,300 L220,300 L270,250 L340,260 L400,310 L460,330 L460,370 L140,370 Z" fill="#ffffff" stroke="none"/>
  <rect x="140" y="370" width="320" height="30" rx="10" fill="#ffffff" stroke="none"/>`);

define("Sandals", () => `
  <ellipse cx="300" cy="330" rx="150" ry="60" fill="#ffffff" stroke="none"/>
  <path d="M180,290 L300,190 L420,290" fill="none" stroke="#78350f" stroke-width="16"/>
  <line x1="300" y1="190" x2="300" y2="290" stroke="#78350f" stroke-width="16"/>`);

define("Scarf", () => `
  <path d="M150,180 Q300,130 450,180 L430,260 Q300,215 170,260 Z" fill="#ffffff" stroke="none"/>
  <path d="M260,250 L230,430 Q300,460 300,430 L280,250 Z" fill="#ffffff" stroke="none"/>`);

define("Sneakers", () => `
  <path d="M140,340 L140,290 L200,290 L260,240 L420,270 L460,310 L460,370 L140,370 Z" fill="#ffffff" stroke="none"/>
  <rect x="140" y="370" width="320" height="30" rx="10" fill="#ffffff" stroke="none"/>`);

define("Sunglasses", () => `
  <circle cx="220" cy="290" r="80" fill="none" stroke="#ffffff" stroke-width="18"/>
  <circle cx="380" cy="290" r="80" fill="none" stroke="#ffffff" stroke-width="18"/>
  <line x1="300" y1="280" x2="300" y2="280" stroke="#ffffff" stroke-width="18"/>
  <line x1="300" y1="280" x2="300" y2="280.1" stroke="#ffffff" stroke-width="18"/>
  <line x1="140" y1="270" x2="90" y2="240" stroke="#ffffff" stroke-width="14"/>
  <line x1="460" y1="270" x2="510" y2="240" stroke="#ffffff" stroke-width="14"/>
  <line x1="300" y1="280" x2="300" y2="280" stroke="#ffffff" stroke-width="1"/>`);

define("Table Lamp", () => `
  <ellipse cx="300" cy="450" rx="70" ry="16" fill="#ffffff" stroke="none"/>
  <rect x="292" y="290" width="16" height="160" fill="#ffffff" stroke="none"/>
  <path d="M240,180 L360,180 L390,290 L210,290 Z" fill="#ffffff" stroke="none"/>`);

define("Travel Pillow", () => `
  <path d="M180,180 A150,150 0 1 0 420,180" fill="none" stroke="#ffffff" stroke-width="70" stroke-linecap="round"/>`);

define("Wallet", () => `
  <rect x="150" y="200" width="300" height="200" rx="24" fill="#ffffff" stroke="none"/>
  <line x1="150" y1="300" x2="450" y2="300" stroke="#78350f" stroke-width="8"/>
  <circle cx="410" cy="300" r="18" fill="#78350f"/>`);

define("Watch", () => `
  <rect x="270" y="120" width="60" height="70" rx="10" fill="#ffffff" stroke="none"/>
  <rect x="270" y="410" width="60" height="70" rx="10" fill="#ffffff" stroke="none"/>
  <circle cx="300" cy="300" r="110" fill="#ffffff" stroke="none"/>
  <line x1="300" y1="300" x2="300" y2="225" stroke="#3f3f46" stroke-width="10"/>
  <line x1="300" y1="300" x2="355" y2="300" stroke="#3f3f46" stroke-width="10"/>`);

define("Water Bottle", () => `
  <rect x="250" y="130" width="100" height="50" rx="14" fill="#ffffff" stroke="none"/>
  <path d="M260,180 L260,220 L230,260 L230,440 Q230,460 250,460 L350,460 Q370,460 370,440 L370,260 L340,220 L340,180 Z" fill="#ffffff" stroke="none"/>
  <line x1="240" y1="330" x2="360" y2="330" stroke="#0ea5e9" stroke-width="10"/>`);

define("Wool Sweater", () => `
  ${shirtBase}
  <line x1="230" y1="165" x2="370" y2="165" stroke="#9d174d" stroke-width="8"/>
  <line x1="215" y1="440" x2="385" y2="440" stroke="#9d174d" stroke-width="8"/>`);

define("Wristband", () => `
  <circle cx="300" cy="300" r="130" fill="none" stroke="#ffffff" stroke-width="60"/>`);

define("Yoga Mat", () => `
  <rect x="150" y="270" width="260" height="60" rx="30" fill="#ffffff" stroke="none"/>
  <ellipse cx="410" cy="300" rx="45" ry="45" fill="#ffffff" stroke="none"/>
  <line x1="370" y1="270" x2="370" y2="330" stroke="#166534" stroke-width="8"/>`);

define("Backpack", () => `
  <rect x="180" y="200" width="240" height="260" rx="60" fill="#ffffff" stroke="none"/>
  <rect x="220" y="150" width="160" height="90" rx="30" fill="#ffffff" stroke="none"/>
  <path d="M230,200 Q220,150 240,120" fill="none" stroke="#4338ca" stroke-width="14"/>
  <path d="M370,200 Q380,150 360,120" fill="none" stroke="#4338ca" stroke-width="14"/>`);

const outDir = "C:/Users/Waqas/AppData/Local/Temp/claude/d--ecommrce/91b06003-15d8-4c87-af08-bfdbee8d5066/scratchpad/catimg/products";

async function main() {
  const fs = await import("fs");
  fs.mkdirSync(outDir, { recursive: true });
  for (const [name, svg] of Object.entries(TYPES)) {
    const safe = name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(path.join(outDir, `${safe}.jpg`));
  }
  console.log("generated", Object.keys(TYPES).length, "icons ->", outDir);
}

main();
