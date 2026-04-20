const fs = require('fs');
const path = require('path');

const browserDir = path.join(__dirname, 'docs', 'browser');
const docsDir = path.join(__dirname, 'docs');

try {
  // Verificar si existe la carpeta browser
  if (!fs.existsSync(browserDir)) {
    console.log('⚠️ Carpeta docs/browser no encontrada. Build puede haber fallado.');
    process.exit(1);
  }

  // Copiar archivos de docs/browser a docs
  const files = fs.readdirSync(browserDir);
  console.log(`📦 Moviendo ${files.length} archivo(s) de docs/browser...`);

  files.forEach(file => {
    const src = path.join(browserDir, file);
    const dest = path.join(docsDir, file);
    
    try {
      if (fs.lstatSync(src).isDirectory()) {
        if (fs.existsSync(dest)) {
          fs.rmSync(dest, { recursive: true, force: true });
        }
        fs.cpSync(src, dest, { recursive: true });
        console.log(`  ✓ Carpeta: ${file}`);
      } else {
        fs.copyFileSync(src, dest);
        console.log(`  ✓ Archivo: ${file}`);
      }
    } catch (err) {
      console.error(`  ✗ Error moviendo ${file}:`, err.message);
    }
  });

  // Eliminar carpeta browser
  fs.rmSync(browserDir, { recursive: true, force: true });
  console.log('✅ Build completado: docs/browser/* movido a docs/');
} catch (err) {
  console.error('❌ Error en build-fix.js:', err.message);
  process.exit(1);
}

