import { useEffect, useRef, useState } from 'react';

interface Note {
  frequency: number;
  duration: number; // duration in beats
}

// "We Wish You a Merry Christmas" in C major / G major style
const MELODY: Note[] = [
  { frequency: 392.00, duration: 1 }, // We (G4)
  { frequency: 523.25, duration: 1 }, // wish (C5)
  { frequency: 523.25, duration: 0.5 }, // you (C5)
  { frequency: 587.33, duration: 0.5 }, // a (D5)
  { frequency: 523.25, duration: 0.5 }, // mer- (C5)
  { frequency: 493.88, duration: 0.5 }, // ry (B4)
  { frequency: 440.00, duration: 1 }, // Christ- (A4)
  { frequency: 440.00, duration: 1 }, // mas (A4)
  
  { frequency: 440.00, duration: 1 }, // We (A4)
  { frequency: 587.33, duration: 1 }, // wish (D5)
  { frequency: 587.33, duration: 0.5 }, // you (D5)
  { frequency: 659.25, duration: 0.5 }, // a (E5)
  { frequency: 587.33, duration: 0.5 }, // mer- (D5)
  { frequency: 523.25, duration: 0.5 }, // ry (C5)
  { frequency: 493.88, duration: 1 }, // Christ- (B4)
  { frequency: 392.00, duration: 1 }, // mas (G4)

  { frequency: 392.00, duration: 1 }, // We (G4)
  { frequency: 659.25, duration: 1 }, // wish (E5)
  { frequency: 659.25, duration: 0.5 }, // you (E5)
  { frequency: 698.46, duration: 0.5 }, // a (F5)
  { frequency: 659.25, duration: 0.5 }, // mer- (E5)
  { frequency: 587.33, duration: 0.5 }, // ry (D5)
  { frequency: 523.25, duration: 1 }, // Christ- (C5)
  { frequency: 440.00, duration: 1 }, // mas (A4)
  { frequency: 392.00, duration: 0.5 }, // and (G4)
  { frequency: 392.00, duration: 0.5 }, // a (G4)

  { frequency: 440.00, duration: 1 }, // hap- (A4)
  { frequency: 587.33, duration: 1 }, // py (D5)
  { frequency: 493.88, duration: 1 }, // New (B4)
  { frequency: 523.25, duration: 2 }, // Year! (C5)

  // Chorus
  { frequency: 392.00, duration: 1 }, // Glad (G4)
  { frequency: 523.25, duration: 1 }, // ti- (C5)
  { frequency: 523.25, duration: 1 }, // dings (C5)
  { frequency: 523.25, duration: 1 }, // we (C5)
  { frequency: 493.88, duration: 2 }, // bring (B4)

  { frequency: 493.88, duration: 1 }, // to (B4)
  { frequency: 523.25, duration: 1 }, // you (C5)
  { frequency: 493.88, duration: 1 }, // and (B4)
  { frequency: 440.00, duration: 1 }, // your (A4)
  { frequency: 392.00, duration: 2 }, // kin (G4)

  { frequency: 587.33, duration: 1 }, // Glad (D5)
  { frequency: 659.25, duration: 1 }, // ti- (E5)
  { frequency: 587.33, duration: 0.5 }, // dings (D5)
  { frequency: 523.25, duration: 0.5 }, // for (C5)
  { frequency: 783.99, duration: 1 }, // Christ- (G5)
  { frequency: 392.00, duration: 1 }, // mas (G4)
  { frequency: 392.00, duration: 0.5 }, // and (G4)
  { frequency: 392.00, duration: 0.5 }, // a (G4)

  { frequency: 440.00, duration: 1 }, // hap- (A4)
  { frequency: 587.33, duration: 1 }, // py (D5)
  { frequency: 493.88, duration: 1 }, // New (B4)
  { frequency: 523.25, duration: 2 }  // Year! (C5)
];

const TEMPO = 140; // beats per minute
const BEAT_DURATION = 60 / TEMPO;

export function useAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('musicVolume');
    return saved !== null ? parseFloat(saved) : 0.3;
  });
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('musicMuted') === 'true';
  });

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const noteIndexRef = useRef<number>(0);
  const schedulerTimerRef = useRef<number | null>(null);

  // Initialize Audio Context on demand
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const masterGain = audioCtxRef.current.createGain();
      masterGain.connect(audioCtxRef.current.destination);
      masterGainRef.current = masterGain;
      
      // Update gain value based on volume and mute
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume, audioCtxRef.current.currentTime);
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Synthesize a single chime (music box sound)
  const playChime = (freq: number, time: number, duration: number) => {
    const ctx = audioCtxRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;

    // Create primary oscillator (sine wave for fundamental tone)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    // Create secondary oscillator (triangle wave at 2x frequency for metallic harmonic)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    // Gain node for sound envelope (music box: click at start, fast decay, long release)
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(0.4, time + 0.01); // attack
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.95); // decay/release

    // Gain node for harmonic (much quieter than fundamental)
    const harmonicGain = ctx.createGain();
    harmonicGain.gain.setValueAtTime(0.08, time);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.5);

    // Connect nodes
    osc1.connect(noteGain);
    osc2.connect(harmonicGain);
    harmonicGain.connect(noteGain);
    noteGain.connect(masterGain);

    // Start & Stop
    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  };

  // The scheduler loop
  const scheduleNextNotes = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Schedule notes that fall within the next 200ms
    const scheduleAheadTime = 0.2; 
    while (nextNoteTimeRef.current < ctx.currentTime + scheduleAheadTime) {
      const note = MELODY[noteIndexRef.current];
      const durationSeconds = note.duration * BEAT_DURATION;
      
      playChime(note.frequency, nextNoteTimeRef.current, durationSeconds);

      // Advance time and note index
      nextNoteTimeRef.current += durationSeconds;
      noteIndexRef.current = (noteIndexRef.current + 1) % MELODY.length;
    }

    // Call scheduleNextNotes again in 100ms
    schedulerTimerRef.current = window.setTimeout(scheduleNextNotes, 100);
  };

  // Start playing
  const start = () => {
    initAudio();
    if (isPlaying) return;

    const ctx = audioCtxRef.current!;
    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    setIsPlaying(true);
  };

  // Stop playing
  const stop = () => {
    if (schedulerTimerRef.current) {
      clearTimeout(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
  };

  // Handle master volume adjustments
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(isMuted ? 0 : volume, audioCtxRef.current.currentTime);
    }
    localStorage.setItem('musicVolume', volume.toString());
    localStorage.setItem('musicMuted', isMuted ? 'true' : 'false');
  }, [volume, isMuted]);

  // Start playing automatically if user previously playing (but browser autoplay policies might block this, so we handle it gracefully)
  useEffect(() => {
    if (isPlaying) {
      scheduleNextNotes();
    }
    return () => {
      if (schedulerTimerRef.current) {
        clearTimeout(schedulerTimerRef.current);
      }
    };
  }, [isPlaying]);

  return {
    isPlaying,
    volume,
    isMuted,
    start,
    stop,
    togglePlay,
    setVolume,
    setIsMuted: (muted: boolean) => setIsMuted(muted),
  };
}
