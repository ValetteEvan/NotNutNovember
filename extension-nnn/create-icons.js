// Script Node.js pour créer des icônes PNG simples
// Pour l'instant, des icônes SVG seront utilisées comme placeholder

const fs = require('fs');

// Créer un SVG simple qui sera converti
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1a237e" rx="${size/8}"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="#4caf50"/>
  <text x="${size/2}" y="${size/2}" font-family="Arial" font-size="${size/2.5}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">N</text>
</svg>
`;

// Note: Pour une vraie extension, utilisez des PNG.
// Vous pouvez convertir ces SVG en PNG avec un outil en ligne ou ImageMagick
console.log('SVG 16x16:', createSVG(16));
console.log('SVG 48x48:', createSVG(48));
console.log('SVG 128x128:', createSVG(128));
