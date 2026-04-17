/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Lock, 
  Unlock, 
  Camera, 
  BookHeart, 
  Mail, 
  Gift, 
  Calendar, 
  Home, 
  Plus, 
  X,
  Music,
  Pause
} from 'lucide-react';
import confetti from 'canvas-confetti';

// --- Constants & Types ---
const PASSCODE = "1810";
const HUSBAND_NAME = "Salman Noor";
const WIFE_NAME = "Wania Shahid";
const BIRTHDAY = "18 April";

type Page = 'home' | 'gallery' | 'notes' | 'letter' | 'surprise' | 'journey';

interface Note {
  id: string;
  text: string;
  date: string;
}

interface TimelineItem {
  date: string;
  title: string;
  description: string;
}

// --- Components ---

const FloatingHearts = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%", 
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0.3 
          }}
          animate={{ 
            y: "-10%",
            rotate: 360,
            x: (Math.random() * 20 - 10) + (Math.random() * 100) + "%"
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10 
          }}
        >
          <Heart className="text-warm-pink fill-warm-pink" size={Math.random() * 30 + 10} />
        </motion.div>
      ))}
    </div>
  );
};

const PasscodeLock = ({ onUnlock }: { onUnlock: () => void }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleInput = (val: string) => {
    if (code.length < 4) {
      const newCode = code + val;
      setCode(newCode);
      if (newCode.length === 4) {
        if (newCode === PASSCODE) {
          onUnlock();
        } else {
          setError(true);
          setTimeout(() => {
            setCode("");
            setError(false);
          }, 1000);
        }
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-soft-pink px-6"
    >
      <FloatingHearts />
      <div className="glass-card max-w-md w-full p-10 text-center relative z-10">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 bg-deep-rose rounded-full flex items-center justify-center animate-heartbeat shadow-lg shadow-deep-rose/30">
            <Lock className="text-white" size={32} />
          </div>
        </div>
        
        <h2 className="text-3xl font-serif text-deep-rose mb-2 italic">For Wania's Eyes Only</h2>
        <p className="text-romantic-purple mb-8 text-sm tracking-widest uppercase">Enter the special date (DDMM)</p>

        <div className="flex justify-center gap-4 mb-10">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={error ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 text-xl font-bold transition-all ${
                code[i] ? 'bg-deep-rose text-white border-deep-rose' : 'bg-white/50 border-warm-pink/30 text-deep-rose'
              }`}
            >
              {code[i] ? "●" : ""}
            </motion.div>
          ))}
        </div>

        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 mb-6 font-medium"
          >
            Oops baby, wrong code 💔 try again ❤️
          </motion.p>
        )}

        <div className="grid grid-cols-3 gap-4 max-w-[240px] mx-auto">
          {[1,2,3,4,5,6,7,8,9,0].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num.toString())}
              className={`w-14 h-14 rounded-full bg-white border border-warm-pink/20 text-deep-rose text-xl font-medium hover:bg-soft-pink hover:scale-110 active:scale-95 transition-all shadow-sm ${num === 0 ? 'col-start-2' : ''}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Page Components ---

const HomePage = ({ onEnter }: { onEnter: () => void }) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="max-w-3xl"
    >
      <header className="mb-12">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-romantic-purple text-lg uppercase tracking-[0.3em] mb-4"
        >
          Happy Birthday My Love
        </motion.p>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-6xl md:text-8xl font-romantic text-deep-rose mb-6 drop-shadow-sm"
        >
          {WIFE_NAME}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 text-lg flex items-center justify-center gap-2"
        >
          From <span className="font-semibold text-romantic-purple">{HUSBAND_NAME}</span>, with all my heart <Heart className="fill-deep-rose text-deep-rose inline" size={18} />
        </motion.p>
      </header>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        className="px-8 py-4 bg-deep-rose text-white rounded-full font-semibold text-lg shadow-xl shadow-deep-rose/30 hover:bg-deep-rose/90 transition-all flex items-center gap-3 mx-auto"
      >
        Enter Our World 💖
      </motion.button>
    </motion.div>
  </div>
);

const GalleryPage = () => {
  const [selectedImg, setSelectedImg] = useState<number | null>(null);
  
  const images = [
    { url: "/IMG_20241003_194538 (1).jpg", caption: "This moment means everything to me ❤️" },
    { url: "/IMG_20241231_170439.jpg", caption: "Your smile is my favorite view 😍" },
    { url: "/IMG_20241231_170518.jpg", caption: "Together is my favorite place to be 👫" },
    { url: "/IMG_20241231_170614 (1).jpg", caption: "Every day with you is a blessing ✨" },
    { url: "/IMG-20240410-WA0093 (1).jpg", caption: "You make my world so much brighter ☀️" },
    { url: "/IMG-20240414-WA0027.jpg", caption: "Holding your hand solves all my problems 💗" },
    { url: "/IMG-20241012-WA0035 (1).jpg", caption: "Our journey together is my favorite story 📖" },
    { url: "/IMG-20241022-WA0008 (1).jpg", caption: "Forever wouldn't be enough with you ♾️" },
    { url: "/IMG-20241231-WA0117 (1).jpg", caption: "The highlight of my life is you ✨" },
    { url: "/IMG-20250128-WA0047 (1).jpg", caption: "My heart belongs to you only 💖" },
    { url: "/IMG-20250128-WA0052.jpg", caption: "Every second with you is precious ⏳" },
    { url: "/IMG-20250128-WA0070.jpg", caption: "You are the best gift life gave me 🎁" },
    { url: "/IMG-20250128-WA0073.jpg", caption: "I love you more than words can say 💋" },
    { url: "/IMG-20250314-WA0087.jpg", caption: "My soul mate, my wife, my life 💍" },
    { url: "/IMG-20250418-WA0033 (1).jpg", caption: "Happy Birthday my Queen 👑" },
    { url: "/IMG-20251129-WA0050 (1).jpg", caption: "You are my heart's desire 💖" },
    { url: "/IMG-20251202-WA0006 (1).jpg", caption: "Every moment is a memory worth keeping 📸" },
    { url: "/IMG-20251202-WA0008.jpg", caption: "Forever by your side 👫" },
    { url: "/IMG20240817205849 (1).jpg", caption: "The brightest star in my sky 🌟" },
    { url: "/IMG20240822214416.jpg", caption: "I am yours, forever 💍" },
    { url: "/PXL_20250808_131006701.MP.jpg", caption: "Beautiful memories of us ✨" },
    { url: "/Snapchat-1379905297 (1).jpg", caption: "I love your laughter 😍" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-4xl font-serif text-deep-rose italic mb-12 text-center">Our Memories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -10 }}
            onClick={() => setSelectedImg(idx)}
            className="group relative aspect-square overflow-hidden rounded-3xl cursor-pointer shadow-md bg-white border-4 border-white"
          >
            <img 
              src={img.url} 
              alt="Memory" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
              <p className="text-white text-center font-medium">{img.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-6"
          >
            <button className="absolute top-6 right-6 text-white"><X size={32} /></button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={images[selectedImg].url} 
                className="w-full h-auto rounded-3xl" 
                alt="Selected" 
                referrerPolicy="no-referrer"
              />
              <p className="text-white text-center mt-6 text-2xl font-serif italic">
                {images[selectedImg].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('love_notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    } else {
      const initial = [
        { id: '1', text: "Wania, you are the piece of my soul I never knew was missing. From the moment I first saw you in October, I felt a spark that turned into a flame, and now that flame is the very sunlight of my life. I promise to cherish every part of you, always.", date: "April 18, 2026" },
        { id: '2', text: "Every time I look into your eyes, I see my entire future. You aren't just my wife; you are my home, my anchor, and my greatest adventure. April 08 was the day my soul finally found its way back to you, and I am forever grateful for your love.", date: "April 18, 2026" },
        { id: '3', text: "I love you not just for who you are, but for who I am when I'm with you. You make me want to be the best version of myself, just so I can be worthy of your beautiful heart. You are my greatest inspiration and my ultimate peace.", date: "April 18, 2026" }
      ];
      setNotes(initial);
      localStorage.setItem('love_notes', JSON.stringify(initial));
    }
  }, []);

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    const updated = [note, ...notes];
    setNotes(updated);
    localStorage.setItem('love_notes', JSON.stringify(updated));
    setNewNote("");
    setShowInput(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-4xl font-serif text-deep-rose italic">Love Notes</h2>
        <button 
          onClick={() => setShowInput(true)}
          className="flex items-center gap-2 px-5 py-2 bg-deep-rose text-white rounded-full font-medium shadow-md hover:bg-deep-rose/90 transition-all"
        >
          <Plus size={20} /> Add Note
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {notes.map((note) => (
          <motion.div
            layout
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 border-l-4 border-l-deep-rose relative group"
          >
            <p className="text-lg text-gray-700 leading-relaxed italic mb-4">"{note.text}"</p>
            <div className="text-xs text-romantic-purple font-medium uppercase tracking-wider">{note.date}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="glass-card max-w-lg w-full p-8" onClick={e => e.stopPropagation()}>
              <h3 className="text-2xl font-serif text-deep-rose mb-4 italic">Write a Note</h3>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full h-32 p-4 rounded-2xl border border-warm-pink/30 focus:outline-none focus:ring-2 focus:ring-deep-rose/20 bg-soft-pink/30 mb-6"
                placeholder="Write your feelings here..."
              />
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowInput(false)}
                  className="flex-1 py-3 text-gray-500 font-medium hover:bg-gray-100 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={addNote}
                  className="flex-1 py-3 bg-deep-rose text-white font-medium rounded-xl hover:bg-deep-rose/90 transition-all shadow-lg shadow-deep-rose/20"
                >
                  Save Note
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LetterPage = () => {
  const fullText = `Dear Wania,

From the moment you walked into my life, everything changed in ways I never thought possible. You didn't just walk into my life; you became it. You are the heartbeat in my chest, the rhythm in my soul, and the peace that I find at the end of every long day. I never knew I could love someone this deeply, this purely, until I met you.

You are my partner, my best friend, my confidante, and my greatest blessing. Your kindness is a light that guides me, your laughter is a song that lifts me, and the simple way you look at me makes me feel like the luckiest man alive. Every moment spent with you is a treasure I keep locked in the vault of my heart.

On this special day, your birthday, I want to take a moment to promise you my forever. I promise that my love for you will only grow stronger with every passing second, every breath I take. I will be your shield against the world, your comfort in the silence, and your constant through every high and every low. 

I see our future stretched out before us, filled with a thousand more sunsets, a million more smiles, and a lifetime of holding your hand. You are my today, my tomorrow, and my forever. 

Happy Birthday, my beautiful wife. You are the Queen of my heart and the light of my world.

With all my love, forever and always,
Salman Noor ❤️`;

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.substring(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="glass-card p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Mail size={120} className="text-deep-rose" />
        </div>
        <h2 className="text-4xl font-romantic text-deep-rose mb-8">A Letter to You</h2>
        <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-serif italic">
          {displayText}
          {isTyping && <span className="inline-block w-1 h-6 bg-deep-rose animate-pulse ml-1" />}
        </div>
      </div>
    </div>
  );
};

const SurprisePage = () => {
  const [revealed, setRevealed] = useState(false);

  const handleSurprise = () => {
    setRevealed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffb7c5', '#d63384', '#9d7bb0', '#ffffff']
    });
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl mb-8 border-4 border-warm-pink animate-bounce">
              <Gift className="text-deep-rose" size={48} />
            </div>
            <h2 className="text-3xl font-serif text-deep-rose mb-8 italic">Ready for your surprise?</h2>
            <button
              onClick={handleSurprise}
              className="px-10 py-4 bg-deep-rose text-white rounded-full font-bold text-xl shadow-2xl shadow-deep-rose/30 hover:scale-105 active:scale-95 transition-all"
            >
              Click for Surprise 🎁
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="text-8xl mb-8"
            >
              💖
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-romantic text-deep-rose mb-6">
              You are the best thing that ever happened to me
            </h2>
            <p className="text-xl text-romantic-purple italic">
              Thank you for being mine, Wania. I love you more than words can express. 💍
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TimelinePage = () => {
  const events: TimelineItem[] = [
    { date: "October 18, 2023", title: "The Day We Met ❤️", description: "The moment our paths crossed and the universe finally made sense. I still remember the way my heart skipped a beat." },
    { date: "April 08, 2024", title: "You Became My Everything 💕", description: "The day I realized that my life would never be complete without you by my side. My soul found its home in you." },
    { date: "April 18, 2026", title: "Your Special Day 🎂", description: "Celebrating the birth of the most beautiful soul I've ever known. My Queen, my life, my Wania." }
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-4xl font-serif text-deep-rose italic text-center mb-16">Our Journey</h2>
      <div className="relative border-l-2 border-dashed border-warm-pink ml-4 space-y-12">
        {events.map((event, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="pl-10 relative"
          >
            <div className="absolute -left-[11px] top-0 w-5 h-5 bg-white border-2 border-deep-rose rounded-full flex items-center justify-center">
              <Heart className="text-deep-rose fill-deep-rose" size={8} />
            </div>
            <div className="glass-card p-6 py-4">
              <span className="text-xs font-bold text-deep-rose uppercase tracking-widest">{event.date}</span>
              <h3 className="text-xl font-serif italic text-romantic-purple my-2">{event.title}</h3>
              <p className="text-gray-600 leading-relaxed">{event.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Navbar ---

const Navbar = ({ active, setPage }: { active: Page, setPage: (p: Page) => void }) => {
  const tabs: { id: Page, icon: any, label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'gallery', icon: Camera, label: 'Memories' },
    { id: 'notes', icon: BookHeart, label: 'Notes' },
    { id: 'letter', icon: Mail, label: 'Letter' },
    { id: 'journey', icon: Calendar, label: 'Journey' },
    { id: 'surprise', icon: Gift, label: 'Surprise' },
  ];

  return (
    <nav className="fixed bottom-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-40">
      <div className="glass-card px-6 py-3 flex justify-between items-center shadow-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPage(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all ${
              active === tab.id ? 'text-deep-rose' : 'text-gray-400 hover:text-romantic-purple'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${active === tab.id ? 'bg-soft-pink' : ''}`}>
              <tab.icon size={20} className={active === tab.id ? 'fill-deep-rose' : ''} />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- Main App ---

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isPlaying, setIsPlaying] = useState(false);

  // Persistence for unlock (optional)
  useEffect(() => {
    const unlocked = sessionStorage.getItem('unlocked');
    if (unlocked === 'true') setIsUnlocked(true);
  }, []);

  const handleUnlock = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('unlocked', 'true');
  };

  if (!isUnlocked) {
    return <PasscodeLock onUnlock={handleUnlock} />;
  }

  return (
    <div className="min-h-screen romantic-gradient pb-32">
      <FloatingHearts />
      
      {/* Background Decor */}
      <div className="fixed top-20 left-10 opacity-20 pointer-events-none">
        <div className="w-64 h-64 bg-deep-rose rounded-full blur-[100px]" />
      </div>
      <div className="fixed bottom-20 right-10 opacity-20 pointer-events-none">
        <div className="w-64 h-64 bg-romantic-purple rounded-full blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="relative z-10"
        >
          {currentPage === 'home' && <HomePage onEnter={() => setCurrentPage('gallery')} />}
          {currentPage === 'gallery' && <GalleryPage />}
          {currentPage === 'notes' && <NotesPage />}
          {currentPage === 'letter' && <LetterPage />}
          {currentPage === 'surprise' && <SurprisePage />}
          {currentPage === 'journey' && <TimelinePage />}
        </motion.div>
      </AnimatePresence>

      <Navbar active={currentPage} setPage={setCurrentPage} />

      <footer className="fixed top-6 right-6 z-40 hidden md:block">
        <div className="glass-card px-4 py-2 flex items-center gap-2 text-xs font-semibold text-romantic-purple uppercase tracking-tight">
          {HUSBAND_NAME} <Heart size={12} className="fill-deep-rose text-deep-rose animate-heartbeat" /> {WIFE_NAME}
        </div>
      </footer>

      {/* Audio Toggle (Visual Only) */}
      <div className="fixed top-6 left-6 z-40">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="glass-card w-10 h-10 flex items-center justify-center text-deep-rose hover:scale-110 transition-all"
        >
          {isPlaying ? <Music size={18} className="animate-spin" /> : <Pause size={18} />}
        </button>
      </div>

      {/* Mobile Footer Name */}
      <div className="md:hidden fixed top-6 right-6 z-40">
        <div className="glass-card p-1.5 px-3 flex items-center gap-1.5 text-[10px] font-bold text-romantic-purple tracking-tighter">
          {HUSBAND_NAME.split(' ')[0]} <Heart size={10} className="fill-deep-rose text-deep-rose" /> {WIFE_NAME.split(' ')[0]}
        </div>
      </div>
    </div>
  );
}

