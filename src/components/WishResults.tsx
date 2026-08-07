import { useState } from 'react';
import { 
  Copy, Check, Share2, Heart, RotateCcw, 
  Printer, FileText, Image as ImageIcon,
  MessageSquare, Sparkles, Send
} from 'lucide-react';
import type { WishesResult, UserInputs } from '../utils/generator';

import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

interface WishResultsProps {
  results: WishesResult;
  inputs: UserInputs;
  onGenerateAgain: () => void;
  onFavoriteToggle: (wishText: string, category: string) => void;
  isFavorited: (wishText: string) => boolean;
  onOpenCardEditor: (wishText: string) => void;
}

export function WishResults({ 
  results, 
  inputs, 
  onGenerateAgain, 
  onFavoriteToggle, 
  isFavorited,
  onOpenCardEditor
}: WishResultsProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const categories = [
    { key: 'main', label: '🎄 Main Wish', icon: Sparkles, group: 'Wishes' },
    { key: 'emotional', label: '❤️ Emotional', icon: Sparkles, group: 'Wishes' },
    { key: 'funny', label: '😂 Funny Wish', icon: Sparkles, group: 'Wishes' },
    { key: 'inspirational', label: '✨ Inspirational', icon: Sparkles, group: 'Wishes' },
    { key: 'religious', label: '🙏 Religious', icon: Sparkles, group: 'Wishes' },
    { key: 'short', label: '💬 Short Wish', icon: Sparkles, group: 'Wishes' },
    { key: 'quote', label: '📜 Quote', icon: Sparkles, group: 'Wishes' },
    { key: 'santa', label: '🎅 Santa Message', icon: Sparkles, group: 'Wishes' },
    
    { key: 'whatsapp', label: '📱 WhatsApp Status', icon: MessageSquare, group: 'Social' },
    { key: 'instagram', label: '📸 Instagram Caption', icon: MessageSquare, group: 'Social' },
    { key: 'twitter', label: '🐦 X / Twitter', icon: MessageSquare, group: 'Social' },
    { key: 'linkedin', label: '💼 LinkedIn', icon: MessageSquare, group: 'Social' },
    
    { key: 'gift', label: '🎁 Gift Pick', icon: Send, group: 'Extras' },
    { key: 'movie', label: '🎬 Movie Pick', icon: Send, group: 'Extras' },
    { key: 'song', label: '🎵 Song Pick', icon: Send, group: 'Extras' },
  ] as const;

  const [activeTab, setActiveTab] = useState<keyof WishesResult>('main');
  const currentWishText = results[activeTab];

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAll = () => {
    let fullText = `🎄 CHRISTMAS WISHES FOR ${inputs.name.toUpperCase()} 🎄\n\n`;
    categories.forEach(cat => {
      fullText += `${cat.label.toUpperCase()}:\n"${results[cat.key as keyof WishesResult]}"\n\n`;
    });
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Trigger celebration on favorite
  const handleFavoriteClick = (text: string, category: string) => {
    onFavoriteToggle(text, category);
    if (!isFavorited(text)) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.85 }
      });
    }
  };

  // Share using Native Web Share API or copies link/text
  const handleShare = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Christmas Wish for ${inputs.name}`,
          text: text,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard and alert
      navigator.clipboard.writeText(text);
      alert('Sharing details copied to clipboard!');
    }
  };

  // PDF Exporter
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(185, 28, 28); // Dark Red
    doc.text(`Christmas Wishes for ${inputs.name}`, 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);

    let yOffset = 35;
    categories.forEach(cat => {
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(`${cat.label.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDFFF]/g, '')}:`, 20, yOffset);
      yOffset += 6;
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(results[cat.key as keyof WishesResult], 170);
      doc.text(lines, 20, yOffset);
      yOffset += (lines.length * 6) + 8;
    });

    doc.save(`Christmas_Wishes_${inputs.name}.pdf`);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Christmas Wishes for ${inputs.name}</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #333; line-height: 1.6; }
            h1 { color: #b91c1c; text-align: center; border-bottom: 2px dashed #b91c1c; padding-bottom: 10px; }
            .category { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px; }
            .label { font-weight: bold; color: #166534; font-size: 1.1em; }
            .content { margin-top: 5px; italic: true; }
          </style>
        </head>
        <body>
          <h1>Christmas Wishes for ${inputs.name}</h1>
          ${categories.map(cat => `
            <div class="category">
              <div class="label">${cat.label}</div>
              <div class="content">"${results[cat.key as keyof WishesResult]}"</div>
            </div>
          `).join('')}
          <script>window.print(); window.close();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 z-20 space-y-6 sm:space-y-8 animate-[fadeIn_0.4s_ease-out]">
      {/* Greetings Title Header */}
      <div className="text-center">
        <h2 className="font-festive font-bold text-3xl md:text-5xl text-slate-900 dark:text-white">
          Wishes for {inputs.name} ✨
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Your holiday cards and status messages are fully generated and ready.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Tab Selectors (Span 4) */}
        <div className="lg:col-span-4 glass rounded-3xl p-3 sm:p-4 border border-white/20 dark:border-slate-800/80 shadow-lg space-y-4">
          <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest px-2 block">
            Wish Formats
          </span>

          {/* Horizontal scroll on mobile, vertical list on desktop */}
          <div className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-y-visible pb-2 lg:pb-0 scrollbar-none -mx-1 px-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveTab(cat.key as keyof WishesResult)}
                  className={`flex items-center flex-shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/20 scale-102'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={handleCopyAll}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-sm transition-all cursor-pointer"
            >
              {copiedAll ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-600" />
                  Copied All Wishes!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All Wishes
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPDF}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-sm transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download Wishes PDF
            </button>

            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-sm transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Wishes Ledger
            </button>
          </div>
        </div>

        {/* Right Column: Display Card & Active content (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Card Viewer Frame */}
          <div className="glass rounded-3xl p-6 md:p-8 border border-white/20 dark:border-slate-800/80 shadow-xl flex flex-col justify-between min-h-[350px] relative overflow-hidden bg-gradient-to-tr from-red-950/20 via-slate-900/10 to-green-950/20">
            {/* Twinkle background shapes */}
            <div className="absolute top-4 right-4 text-3xl opacity-20">❄️</div>
            <div className="absolute bottom-4 left-4 text-3xl opacity-20">🎁</div>

            {/* Card Header tag */}
            <div className="flex justify-between items-center border-b border-slate-200/50 dark:border-slate-800/80 pb-4">
              <span className="text-xs font-bold text-green-600 dark:text-green-500 uppercase tracking-widest">
                Category: {activeTab.toUpperCase()} WISH
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleFavoriteClick(currentWishText, activeTab)}
                  className={`p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                    isFavorited(currentWishText) ? 'text-red-500 bg-red-100/10' : 'text-slate-400'
                  }`}
                  title="Save to Favorites"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
                <button
                  onClick={() => handleShare(currentWishText)}
                  className="p-2 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                  title="Share Wish"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Large text display body */}
            <div className="my-6 sm:my-8 py-4 text-center">
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 dark:text-white leading-relaxed italic font-serif">
                "{currentWishText}"
              </p>
            </div>

            {/* Actions for active wish - stacked on mobile */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-slate-200/50 dark:border-slate-800/80 pt-5 gap-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleCopy(currentWishText, activeTab)}
                  className="flex items-center justify-center px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer min-h-[44px]"
                >
                  {copiedKey === activeTab ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1.5" />
                      Copy Text
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenCardEditor(currentWishText)}
                  className="flex items-center justify-center px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl text-sm transition-all cursor-pointer min-h-[44px]"
                >
                  <ImageIcon className="w-4 h-4 mr-1.5" />
                  Custom Card Editor
                </button>
              </div>

              <button
                onClick={onGenerateAgain}
                className="flex items-center justify-center text-xs font-bold text-slate-500 hover:text-red-600 dark:hover:text-red-400 cursor-pointer transition-colors min-h-[44px]"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                Generate Again
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
