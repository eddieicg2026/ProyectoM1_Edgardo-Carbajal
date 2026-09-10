const form = document.getElementById('paletteForm');
const paletteDiv = document.getElementById('palette');
const toast = document.getElementById('toast');

form.addEventListener('submit', e => {
  e.preventDefault();
  const size = parseInt(form.size.value);
  const format = form.format.value;
  generatePalette(size, format);
});

function generatePalette(size, format) {
  paletteDiv.innerHTML = '';
  const colors = [];

  for (let i = 0; i < size; i++) {
    let color;
    do {
      color = format === 'hex' ? getRandomHex() : getRandomHSL();
    } while (colors.includes(color));
    colors.push(color);
    createColorBox(color);
  }

  localStorage.setItem('palette', JSON.stringify(colors));
}

function createColorBox(color) {
  const box = document.createElement('div');
  box.className = 'color-box';
  box.style.backgroundColor = color;
  box.innerText = color;
  box.tabIndex = 0;
  box.setAttribute('role', 'button');
  box.setAttribute('aria-label', `Color ${color}, clic para copiar`);

  box.addEventListener('click', () => copyToClipboard(color));
  box.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyToClipboard(color);
    }
  });

  paletteDiv.appendChild(box);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Código ${text} copiado al portapapeles!`);
  });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

function getRandomHex() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

function getRandomHSL() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 61) + 40; // Saturación 40-100%
  const l = Math.floor(Math.random() * 41) + 30; // Luminosidad 30-70%
  return `hsl(${h},${s}%,${l}%)`;
}
