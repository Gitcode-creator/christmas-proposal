import { useEffect, useRef, useState } from 'react';
import { Download, ChevronLeft, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react';

interface CardGeneratorProps {
  wishText: string;
  userName: string;
  onBack: () => void;
}

type BgColor = 'red' | 'green' | 'blue' | 'gold' | 'dark';

export function CardGenerator({ wishText, userName, onBack }: CardGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bgColor, setBgColor] = useState<BgColor>('red');
  const [fontSize, setFontSize] = useState(24);
  const [showLights, setShowLights] = useState(true);
  const [showSnow, setShowSnow] = useState(true);
  const [showSanta, setShowSanta] = useState(true);
  const [showTree, setShowTree] = useState(true);

  const colors = {
    red: { bg: '#8b0000', border: '#ffd700', text: '#ffffff', accent: '#ff4500' },
    green: { bg: '#004d26', border: '#ffd700', text: '#ffffff', accent: '#228b22' },
    blue: { bg: '#002244', border: '#e6e6fa', text: '#ffffff', accent: '#1e90ff' },
    gold: { bg: '#8a6207', border: '#ffffff', text: '#ffffff', accent: '#ca8a04' },
    dark: { bg: '#0f172a', border: '#ef4444', text: '#ffffff', accent: '#3b82f6' }
  };

  const drawCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPalette = colors[bgColor];

    // Clear and set background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background gradient for rich texture
    const grad = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, canvas.width/2);
    grad.addColorStop(0, currentPalette.bg);
    // Darken slightly towards the edges for a vignette look
    grad.addColorStop(1, '#05050e');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Outer Gold/Red Border
    ctx.strokeStyle = currentPalette.border;
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Inner thin border line
    ctx.lineWidth = 1.5;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

    // Corner decorations (gold stars)
    const corners = [
      { x: 28, y: 28 },
      { x: canvas.width - 28, y: 28 },
      { x: 28, y: canvas.height - 28 },
      { x: canvas.width - 28, y: canvas.height - 28 }
    ];
    corners.forEach(c => {
      ctx.fillStyle = currentPalette.border;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // 2. Draw Twinkling Golden Lights (Top and sides)
    if (showLights) {
      const spacing = 45;
      const count = Math.floor((canvas.width - 80) / spacing);
      for (let i = 0; i <= count; i++) {
        const x = 40 + i * spacing;
        const y = 45;
        // Alternate light bulb colors
        const bulbColors = ['#ffcc00', '#ff3333', '#33cc33', '#3399ff'];
        ctx.fillStyle = bulbColors[i % bulbColors.length];
        ctx.shadowBlur = 15;
        ctx.shadowColor = bulbColors[i % bulbColors.length];
        
        // Draw bulb
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();

        // Draw cord line connecting them
        if (i < count) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255,255,255,0.15)';
          ctx.lineWidth = 1;
          ctx.shadowBlur = 0;
          ctx.quadraticCurveTo(x + spacing/2, y + 10, x + spacing, y);
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0; // reset shadow
    }

    // 3. Draw Snowflakes
    if (showSnow) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * (canvas.width - 100) + 50;
        const y = Math.random() * (canvas.height - 100) + 50;
        const r = Math.random() * 3 + 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 4. Draw Christmas Tree (Bottom-left corner)
    if (showTree) {
      ctx.fillStyle = '#0f5132'; // dark green
      // Base trunk
      ctx.fillStyle = '#653b11'; // brown
      ctx.fillRect(80, canvas.height - 110, 20, 45);

      // Leaves triangles
      ctx.fillStyle = '#146c43'; // green
      
      // Bottom Layer
      ctx.beginPath();
      ctx.moveTo(35, canvas.height - 110);
      ctx.lineTo(145, canvas.height - 110);
      ctx.lineTo(90, canvas.height - 190);
      ctx.closePath();
      ctx.fill();

      // Middle Layer
      ctx.beginPath();
      ctx.moveTo(45, canvas.height - 160);
      ctx.lineTo(135, canvas.height - 160);
      ctx.lineTo(90, canvas.height - 230);
      ctx.closePath();
      ctx.fill();

      // Top Layer
      ctx.beginPath();
      ctx.moveTo(55, canvas.height - 200);
      ctx.lineTo(125, canvas.height - 200);
      ctx.lineTo(90, canvas.height - 270);
      ctx.closePath();
      ctx.fill();

      // Tree Star
      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(90, canvas.height - 275, 8, 0, Math.PI * 2);
      ctx.fill();

      // Simple ornaments on tree
      const baubles = [
        { x: 75, y: canvas.height - 130, c: '#ff3333' },
        { x: 105, y: canvas.height - 140, c: '#3399ff' },
        { x: 80, y: canvas.height - 180, c: '#ffcc00' },
        { x: 95, y: canvas.height - 210, c: '#ff3333' },
        { x: 90, y: canvas.height - 160, c: '#ffcc00' }
      ];
      baubles.forEach(b => {
        ctx.fillStyle = b.c;
        ctx.beginPath();
        ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Gift Box next to tree
      ctx.fillStyle = '#b91c1c';
      ctx.fillRect(125, canvas.height - 95, 25, 25);
      ctx.fillStyle = '#ffd700'; // ribbon
      ctx.fillRect(135, canvas.height - 95, 5, 25);
      ctx.fillRect(125, canvas.height - 85, 25, 5);
    }

    // 5. Draw Santa / Sleigh (Bottom-right corner)
    if (showSanta) {
      const startX = canvas.width - 150;
      const startY = canvas.height - 130;

      // Draw simple cozy Santa hat
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + 40, startY - 30);
      ctx.lineTo(startX + 60, startY);
      ctx.closePath();
      ctx.fill();

      // White hat fluff & puffball
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(startX + 40, startY - 30, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(startX - 5, startY - 2, 70, 8);

      // Beard
      ctx.beginPath();
      ctx.arc(startX + 30, startY + 25, 20, 0, Math.PI);
      ctx.fill();

      // Face
      ctx.fillStyle = '#ffdbac';
      ctx.fillRect(startX + 10, startY + 6, 40, 15);
      
      // Eyes & cheeks
      ctx.fillStyle = '#333333';
      ctx.beginPath();
      ctx.arc(startX + 22, startY + 12, 2.5, 0, Math.PI * 2);
      ctx.arc(startX + 38, startY + 12, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#e11d48';
      ctx.beginPath();
      ctx.arc(startX + 30, startY + 17, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. Draw Text Greetings
    // Header Title
    ctx.fillStyle = currentPalette.border;
    ctx.font = 'bold 44px "Mountains of Christmas", serif';
    ctx.textAlign = 'center';
    ctx.fillText('Merry Christmas', canvas.width / 2, 105);

    // Inner Greeting Frame decoration
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 140, canvas.width - 120, canvas.height - 260);

    // Draw Main Wish Text (Word Wrapped)
    ctx.fillStyle = currentPalette.text;
    ctx.font = `italic ${fontSize}px "Outfit", sans-serif`;
    ctx.textAlign = 'center';
    
    const textX = canvas.width / 2;
    const textY = 220;
    const maxWidth = canvas.width - 240;
    const lineHeight = fontSize + 12;

    wrapText(ctx, wishText, textX, textY, maxWidth, lineHeight);

    // Sign off at the bottom
    ctx.fillStyle = currentPalette.border;
    ctx.font = 'bold 20px "Great Vibes", cursive';
    ctx.fillText(`With Love, for ${userName}`, canvas.width / 2, canvas.height - 85);
  };

  // Helper function to handle canvas multi-line wrap
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  };

  useEffect(() => {
    drawCard();
  }, [bgColor, fontSize, showLights, showSnow, showSanta, showTree, wishText, userName]);

  // Download Action
  const downloadCard = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageURI = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Christmas_Card_${userName}.png`;
    link.href = imageURI;
    link.click();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 z-20 space-y-5 sm:space-y-6">
      {/* Header buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs sm:text-sm transition-all cursor-pointer min-h-[44px]"
        >
          <ChevronLeft className="w-4 h-4 mr-1 sm:mr-1.5" />
          <span className="hidden xs:inline">Back to </span>Wishes
        </button>

        <button
          onClick={downloadCard}
          className="flex items-center px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md cursor-pointer transform hover:scale-103 transition-all min-h-[44px]"
        >
          <Download className="w-4 h-4 mr-1 sm:mr-1.5" />
          <span className="hidden sm:inline">Download Card </span>PNG
        </button>
      </div>

      {/* Canvas first on mobile, grid on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
        
        {/* Editor controls (Span 4) - on desktop on left, on mobile below canvas */}
        <div className="lg:col-span-4 glass rounded-3xl p-5 sm:p-6 border border-white/20 dark:border-slate-800/80 shadow-lg space-y-5 sm:space-y-6 lg:order-first order-last">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-200/50 dark:border-slate-800/80 pb-3">
            Card Theme & Details
          </h3>

          {/* Background selection */}
          <div className="space-y-2">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Card Base Color</span>
            <div className="flex gap-2">
              {(['red', 'green', 'blue', 'gold', 'dark'] as BgColor[]).map(color => (
                <button
                  key={color}
                  onClick={() => setBgColor(color)}
                  className={`w-8 h-8 rounded-full border-2 cursor-pointer transition-transform ${
                    bgColor === color ? 'border-white scale-120 shadow-md' : 'border-transparent hover:scale-110'
                  }`}
                  style={{
                    backgroundColor: 
                      color === 'red' ? '#8b0000' :
                      color === 'green' ? '#004d26' :
                      color === 'blue' ? '#002244' :
                      color === 'gold' ? '#8a6207' : '#0f172a'
                  }}
                  title={`${color.toUpperCase()} theme`}
                />
              ))}
            </div>
          </div>

          {/* Font Size adjustments */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span>Wish Text Font Size</span>
              <span className="font-mono text-xs">{fontSize}px</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <input
                type="range"
                min="14"
                max="36"
                step="1"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <button 
                onClick={() => setFontSize(prev => Math.min(36, prev + 2))}
                className="p-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toggles for decoration assets */}
          <div className="space-y-3 pt-3 border-t border-slate-200/50 dark:border-slate-800/80">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 block mb-1">Toggle Ornaments</span>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showLights}
                onChange={(e) => setShowLights(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 accent-red-600 cursor-pointer"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Blinking Golden Lights</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showSnow}
                onChange={(e) => setShowSnow(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 accent-red-600 cursor-pointer"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Falling Snowflakes</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showTree}
                onChange={(e) => setShowTree(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 accent-red-600 cursor-pointer"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Christmas Tree & Gift</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showSanta}
                onChange={(e) => setShowSanta(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 accent-red-600 cursor-pointer"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Mini Santa Silhouette</span>
            </label>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setBgColor('red');
                setFontSize(24);
                setShowLights(true);
                setShowSnow(true);
                setShowSanta(true);
                setShowTree(true);
              }}
              className="w-full flex items-center justify-center py-2 px-4 border border-slate-300/40 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Reset Card Config
            </button>
          </div>
        </div>

        {/* Card Canvas display (Span 8) - appears first on mobile */}
        <div className="lg:col-span-8 flex justify-center items-center order-first lg:order-last">
          <div className="w-full border border-slate-300/30 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl bg-slate-950/20 max-w-[800px]">
            {/* Wrap canvas in responsive scale wrapper to ensure it is mobile friendly */}
            <div className="aspect-[4/3] w-full">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
