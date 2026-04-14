/**
 * Einmaliges Generator-Skript für OG-Image, Favicon und Apple-Touch-Icon.
 * Nutzt sharp + SVG. Läuft über `node scripts/generate-assets.mjs`.
 * Kein Build-Step — nur manuell bei Bedarf ausführen.
 */

import sharp from "sharp";
import { writeFileSync } from "node:fs";

const OG_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#000000"/>
  <text x="600" y="320"
        text-anchor="middle"
        font-family="'Playfair Display', 'Times New Roman', Georgia, serif"
        font-weight="900"
        font-size="220"
        letter-spacing="-4"
        fill="#FFFFFF">ACAB</text>
  <text x="600" y="395"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', Arial, sans-serif"
        font-weight="800"
        font-size="34"
        letter-spacing="1"
        fill="#FFFFFF">All Car&apos;s All Bike&apos;s</text>
  <line x1="555" y1="430" x2="645" y2="430"
        stroke="#B91C1C" stroke-width="3"/>
  <text x="600" y="475"
        text-anchor="middle"
        font-family="'Inter', 'Segoe UI', Arial, sans-serif"
        font-weight="500"
        font-size="20"
        letter-spacing="6"
        fill="#999999">GARAGE &#183; MALTERS</text>
</svg>
`.trim();

const FAVICON_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#000000"/>
  <text x="16" y="25"
        text-anchor="middle"
        font-family="'Playfair Display', 'Times New Roman', Georgia, serif"
        font-weight="900"
        font-size="28"
        fill="#FFFFFF">A</text>
</svg>
`.trim();

const APPLE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#000000"/>
  <text x="90" y="140"
        text-anchor="middle"
        font-family="'Playfair Display', 'Times New Roman', Georgia, serif"
        font-weight="900"
        font-size="150"
        fill="#FFFFFF">A</text>
</svg>
`.trim();

// 1. OG-Image → JPG
await sharp(Buffer.from(OG_SVG))
  .jpeg({ quality: 92, progressive: true })
  .toFile("public/og-image.jpg");
console.log("✓ public/og-image.jpg (1200×630)");

// 2. Favicon → proper ICO (PNG-based, seit Vista unterstützt)
const faviconPng = await sharp(Buffer.from(FAVICON_SVG)).png().toBuffer();
const icoHeader = Buffer.from([0, 0, 1, 0, 1, 0]);
const icoEntry = Buffer.alloc(16);
icoEntry[0] = 32; // width
icoEntry[1] = 32; // height
icoEntry[2] = 0; // colors in palette
icoEntry[3] = 0; // reserved
icoEntry.writeUInt16LE(1, 4); // color planes
icoEntry.writeUInt16LE(32, 6); // bits per pixel
icoEntry.writeUInt32LE(faviconPng.length, 8); // image size
icoEntry.writeUInt32LE(22, 12); // offset (6+16=22)
const icoBuffer = Buffer.concat([icoHeader, icoEntry, faviconPng]);
writeFileSync("public/favicon.ico", icoBuffer);
console.log("✓ public/favicon.ico (32×32 PNG-in-ICO)");

// 3. Apple-Touch-Icon → PNG
await sharp(Buffer.from(APPLE_SVG))
  .png()
  .toFile("public/apple-touch-icon.png");
console.log("✓ public/apple-touch-icon.png (180×180)");
