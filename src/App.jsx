import { useState, useEffect } from "react";
import { Menu, X, Shield, Heart, Wrench, Zap, ChevronDown, ArrowRight, Radio, Navigation } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   PALETTE MODE CLAIR : 
   Fonds : Blanc #FFFFFF / Gris clair #F8F9FA / Gris moyen #E5E7EB
   Textes : Noir #1A1A1A / Gris foncé #4A4A4A
   Accents : Cuivre #B87333 / Rouge #C44536 / Or #D4AF37
───────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Mission",      href: "#mission"     },
  { label: "Système",      href: "#systeme"     },
  { label: "Marchés",      href: "#marches"     },
  { label: "Technologie",  href: "#technologie" },
];

/* ── DRONE VUE LATERALE (Adapté Mode Clair) ──────────────── */
function DroneSilhouette({ blur = false, opacity = 1, className = "" }) {
  return (
    <svg
      viewBox="0 0 700 280"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity, filter: blur ? "blur(2px)" : "none" }}
    >
      <defs>
        <linearGradient id="dsg-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1A1A1A" />
          <stop offset="50%" stopColor="#333333" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        <linearGradient id="dsg-wing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
        <linearGradient id="dsg-copper" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
      </defs>

      {/* fuselage */}
      <path d="M 120,130 L 165,112 L 525,112 L 565,130 L 525,148 L 165,148 Z"
        fill="url(#dsg-body)" stroke="#B87333" strokeWidth="0.9" />

      {/* nez */}
      <path d="M 120,130 L 75,132 L 65,130 L 75,128 Z"
        fill="#3A3A3A" stroke="#B87333" strokeWidth="0.6" />

      {/* queue */}
      <path d="M 525,112 L 590,96 L 610,130 L 590,164 L 525,148 Z"
        fill="#1A1A1A" stroke="#4A4A4A" strokeWidth="0.6" />

      {/* ailes haute gauche/droite */}
      <path d="M 252,112 L 240,46 L 264,48 L 284,112 Z" fill="url(#dsg-wing)" stroke="#B87333" strokeWidth="0.7" />
      <path d="M 410,112 L 424,46 L 448,48 L 452,112 Z" fill="url(#dsg-wing)" stroke="#B87333" strokeWidth="0.7" />
      {/* ailes basse */}
      <path d="M 264,148 L 240,214 L 264,212 L 284,148 Z" fill="url(#dsg-wing)" stroke="#B87333" strokeWidth="0.7" />
      <path d="M 424,148 L 424,214 L 448,212 L 460,148 Z" fill="url(#dsg-wing)" stroke="#B87333" strokeWidth="0.7" />

      {/* 4 rotors */}
      {[[252,44],[432,44],[252,216],[432,216]].map(([cx,cy],i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx={28} ry={5}
            fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.8">
            <animateTransform attributeName="transform" type="rotate"
              from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`}
              dur={`${0.75+i*0.12}s`} repeatCount="indefinite" />
          </ellipse>
          <circle cx={cx} cy={cy} r="3.5" fill="#B87333" />
        </g>
      ))}

      {/* ligne cuivre fuselage */}
      <line x1="165" y1="126" x2="525" y2="126" stroke="url(#dsg-copper)" strokeWidth="1" />

      {/* hublot */}
      <ellipse cx="158" cy="130" rx="13" ry="9" fill="#F8F9FA" stroke="#B87333" strokeWidth="1" />
      <ellipse cx="158" cy="130" rx="9" ry="6" fill="#E5E7EB" />
      <ellipse cx="155" cy="127" rx="2.5" ry="1.8" fill="#D4AF37" fillOpacity="0.6" />

      {/* sponson charge */}
      <rect x="285" y="145" width="120" height="19" fill="#1A1A1A" stroke="#C44536" strokeWidth="1" />
      {[305,340,375].map(x => (
        <line key={x} x1={x} y1="145" x2={x} y2="164" stroke="#C44536" strokeWidth="0.5" />
      ))}

      {/* panneau fuselage */}
      {[[220,113,42,14],[325,113,45,14],[380,113,45,14]].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="none" stroke="#4A4A4A" strokeWidth="0.5" />
      ))}

      {/* fil umbilical */}
      <path d="M 348,164 Q 335,188 322,204 Q 308,220 295,238"
        fill="none" stroke="#B87333" strokeWidth="1.6" strokeDasharray="5 3" strokeLinecap="square">
        <animate attributeName="stroke-dashoffset" from="0" to="16" dur="1.5s" repeatCount="indefinite" />
      </path>
      <text x="270" y="252" fontFamily="JetBrains Mono, Space Mono, monospace"
        fontSize="8" fill="#B87333" letterSpacing="2" fontWeight="bold">UMBILICAL</text>

      {/* antenne */}
      <line x1="578" y1="112" x2="584" y2="80" stroke="#B87333" strokeWidth="1" />
      <circle cx="584" cy="79" r="2.5" fill="#C44536">
        <animate attributeName="fill-opacity" values="0.3;1;0.3" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ── SCHEMA ECLATE (Adapté Mode Clair) ──────────────────── */
function DroneSchematic() {
  return (
    <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-2xl mx-auto">
      <defs>
        <marker id="arr-cu" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M 0,0 L 6,3 L 0,6 Z" fill="#B87333" />
        </marker>
      </defs>

      {/* grille claire */}
      {Array.from({length:12}).map((_,i) =>
        <line key={`v${i}`} x1={i*55} y1="0" x2={i*55} y2="320" stroke="#E5E7EB" strokeWidth="1" />
      )}
      {Array.from({length:7}).map((_,i) =>
        <line key={`h${i}`} x1="0" y1={i*55} x2="600" y2={i*55} stroke="#E5E7EB" strokeWidth="1" />
      )}

      {/* fuselage */}
      <path d="M 180,145 L 210,130 L 420,130 L 440,145 L 420,160 L 210,160 Z"
        fill="#FFFFFF" stroke="#B87333" strokeWidth="1.5" />

      {/* 6 bras */}
      {[
        [[240,130],[200,80]], [[360,130],[400,80]],
        [[240,160],[200,210]], [[360,160],[400,210]],
        [[210,145],[155,145]], [[420,145],[470,145]],
      ].map(([[x1,y1],[x2,y2]],i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A1A1A" strokeWidth="6" strokeLinecap="square" />
      ))}

      {/* 6 moteurs */}
      {[[200,80],[400,80],[200,210],[400,210],[155,145],[470,145]].map(([cx,cy],i) => (
        <g key={i}>
          <rect x={cx-14} y={cy-8} width="28" height="16" fill="#F8F9FA" stroke="#D4AF37" strokeWidth="1" />
          <ellipse cx={cx} cy={cy-16} rx="20" ry="4" fill="none" stroke="#D4AF37" strokeWidth="1.2">
            <animateTransform attributeName="transform" type="rotate"
              from={`0 ${cx} ${cy-16}`} to={`360 ${cx} ${cy-16}`}
              dur={`${0.65+i*0.1}s`} repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}

      {/* charge */}
      <rect x="270" y="162" width="80" height="22" fill="#FFFFFF" stroke="#C44536" strokeWidth="1.2" />
      <text x="310" y="177" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="8" fill="#C44536" letterSpacing="1" fontWeight="bold">50 KG</text>

      {/* fil umbilical */}
      <path d="M 310,184 L 310,230 L 278,260"
        fill="none" stroke="#B87333" strokeWidth="1.5" strokeDasharray="5 3">
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.5s" repeatCount="indefinite" />
      </path>

      {/* annotations */}
      {[
        { lx:475, ly:115, label:"MOTEUR TILT",    cx:470, cy:145 },
        { lx:445, ly:46,  label:"ROTOR 0.6M",     cx:400, cy:80  },
        { lx:345, ly:268, label:"UMBILICAL POWER",cx:310, cy:222 },
        { lx:68,  ly:162, label:"AVIONIQUE",      cx:210, cy:145 },
      ].map((a,i) => (
        <g key={i}>
          <line x1={a.cx} y1={a.cy} x2={a.lx} y2={a.ly}
            stroke="#B87333" strokeWidth="1" markerEnd="url(#arr-cu)" />
          <text x={a.lx+3} y={a.ly+4} fontFamily="Space Mono,monospace" fontSize="8"
            fill="#B87333" letterSpacing="1" fontWeight="bold">{a.label}</text>
        </g>
      ))}

      <text x="300" y="148" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="10"
        fill="#D4AF37" letterSpacing="2" fontWeight="bold">PELIDES MK-I</text>
    </svg>
  );
}

/* ── ANIMATION HEXA-TILT (Adapté Mode Clair) ──────────────── */
function TiltAnimation() {
  return (
    <svg viewBox="0 0 500 240" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto">
      <text x="50"  y="30" fontFamily="Space Mono,monospace" fontSize="10" fill="#B87333" letterSpacing="2" fontWeight="bold">MODE VTOL</text>
      <text x="325" y="30" fontFamily="Space Mono,monospace" fontSize="10" fill="#C44536" letterSpacing="2" fontWeight="bold">MODE CROISIÈRE</text>
      <line x1="248" y1="15" x2="248" y2="225" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="218" y="125" fontFamily="Space Mono,monospace" fontSize="16" fill="#1A1A1A">→</text>

      {/* VTOL */}
      <rect x="90" y="108" width="90" height="18" fill="#FFFFFF" stroke="#B87333" strokeWidth="1.5" />
      {[[110,70],[155,70],[110,165],[155,165]].map(([cx,cy],i) => (
        <g key={i}>
          <line x1={cx} y1={i<2?108:126} x2={cx} y2={cy} stroke="#1A1A1A" strokeWidth="4" strokeLinecap="square" />
          <rect x={cx-10} y={cy-4} width="20" height="8" fill="#FFFFFF" stroke="#B87333" strokeWidth="1" />
          <ellipse cx={cx} cy={cy-(i<2?12:-12)} rx="18" ry="3" fill="none" stroke="#D4AF37" strokeWidth="1.2">
            <animateTransform attributeName="transform" type="rotate"
              from={`0 ${cx} ${cy-(i<2?12:-12)}`} to={`360 ${cx} ${cy-(i<2?12:-12)}`}
              dur={`${0.7+i*0.1}s`} repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}

      {/* CROISIERE */}
      <rect x="310" y="108" width="90" height="18" fill="#FFFFFF" stroke="#C44536" strokeWidth="1.5" />
      {[[330,76],[375,76],[330,162],[375,162]].map(([cx,cy],i) => (
        <g key={i}>
          <line x1={cx} y1={i<2?108:126} x2={cx} y2={cy} stroke="#1A1A1A" strokeWidth="4" strokeLinecap="square" />
          <rect x={cx-9} y={cy-5} width="18" height="10" fill="#FFFFFF" stroke="#C44536" strokeWidth="1" />
          <ellipse cx={cx-18} cy={cy} rx="3" ry="16" fill="none" stroke="#C44536" strokeWidth="1.2">
            <animateTransform attributeName="transform" type="rotate"
              from={`0 ${cx-18} ${cy}`} to={`360 ${cx-18} ${cy}`}
              dur={`${0.5+i*0.1}s`} repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}
    </svg>
  );
}

/* ── UMBILICAL DIAGRAM (Adapté Mode Clair) ────────────────── */
function UmbilicalDiagram() {
  return (
    <svg viewBox="0 0 340 380" className="w-full max-w-xs mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="umb-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B87333" />
        </linearGradient>
      </defs>

      {/* sol */}
      <rect x="100" y="310" width="140" height="55" fill="#F8F9FA" stroke="#B87333" strokeWidth="1.5" />
      <rect x="116" y="322" width="108" height="8" fill="#E5E7EB" stroke="#1A1A1A" strokeWidth="1" />
      <text x="170" y="348" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="9" fill="#B87333" letterSpacing="2" fontWeight="bold">ALIMENTATION SOL</text>
      <text x="170" y="360" textAnchor="middle" fontFamily="Space Mono,monospace" fontSize="8" fill="#1A1A1A" letterSpacing="1">400V / 80A</text>

      {/* fil */}
      <path d="M 170,310 C 170,278 180,238 175,198 C 170,162 165,138 170,108"
        fill="none" stroke="url(#umb-grad)" strokeWidth="3" strokeDasharray="8 4">
        <animate attributeName="stroke-dashoffset" from="48" to="0" dur="1.2s" repeatCount="indefinite" />
      </path>

      {/* drone en vol */}
      <rect x="130" y="88" width="80" height="20" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" />
      {[[145,84],[185,84],[152,112],[185,112]].map(([cx,cy],i) => (
        <g key={i}>
          <ellipse cx={cx} cy={cy} rx="16" ry="3" fill="none" stroke="#D4AF37" strokeWidth="1.2">
            <animateTransform attributeName="transform" type="rotate"
              from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`}
              dur={`${0.8+i*0.1}s`} repeatCount="indefinite" />
          </ellipse>
        </g>
      ))}

      {/* axe altitude */}
      <line x1="88" y1="100" x2="88" y2="305" stroke="#1A1A1A" strokeWidth="1" />
      <text x="82" y="200" fontFamily="Space Mono,monospace" fontSize="8" fill="#1A1A1A" letterSpacing="1" transform="rotate(-90 82 200)" fontWeight="bold">ALTITUDE</text>
    </svg>
  );
}

/* ── COMPONENTS ─────────────────────────────────────────────── */
function StatBlock({ value, unit, label }) {
  return (
    <div className="border-l-2 pl-4 md:pl-6 py-1" style={{ borderColor: "#B87333" }}>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span className="font-display-serif text-4xl md:text-5xl" style={{ color: "#1A1A1A" }}>{value}</span>
        {unit && <span className="font-mono text-base md:text-lg" style={{ color: "#B87333" }}>{unit}</span>}
      </div>
      <span className="font-mono text-[11px] tracking-widest text-gray-500 uppercase font-bold">{label}</span>
    </div>
  );
}

function MarcheCard({ icon: Icon, title, tag, accent, text }) {
  return (
    <div
      className="relative p-6 md:p-8 bg-white border-2 group transition-all duration-300 hover:shadow-lg"
      style={{
        borderColor: "#E5E7EB",
        clipPath: "polygon(0 0,calc(100% - 18px) 0,100% 18px,100% 100%,18px 100%,0 calc(100% - 18px))",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 20% 20%, ${accent}15 0%, transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 border-2" style={{ borderColor: accent, background: `${accent}10` }}>
            <Icon size={22} style={{ color: accent }} strokeWidth={2} />
          </div>
          <span className="font-mono text-[10px] tracking-[3px] uppercase font-bold" style={{ color: accent }}>{tag}</span>
        </div>
        <h3 className="font-display-serif text-xl md:text-2xl text-gray-900 mb-4 leading-snug font-bold">{title}</h3>
        <p className="font-mono text-xs text-gray-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

function Divider({ index, label }) {
  return (
    <div className="flex items-center gap-4 mb-12 md:mb-16">
      <span className="font-mono text-[11px] tracking-[4px] font-bold" style={{ color: "#B87333" }}>{index}</span>
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,#B87333,#E5E7EB)" }} />
      <span className="font-mono text-[10px] tracking-[3px] text-gray-500 uppercase font-bold">{label}</span>
    </div>
  );
}

/* ── MAIN ───────────────────────────────────────────────────── */
export default function App() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [ready,    setReady]      = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", fn); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Space+Mono:wght@400;700&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#F8F9FA;color:#1A1A1A;-webkit-font-smoothing:antialiased;}

        .font-display-serif{font-family:'Playfair Display',serif;}
        .font-mono{font-family:'Space Mono','JetBrains Mono',monospace;}

        @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
        @keyframes slideL{from{opacity:0;transform:translateX(-18px);}to{opacity:1;transform:translateX(0);}}

        .anim-fade-up{animation:fadeUp .9s cubic-bezier(.22,.68,0,1.1) both;}
        .anim-fade-in{animation:fadeIn .8s ease both;}
        .anim-slide-l{animation:slideL .6s ease both;}

        .d1{animation-delay:.10s;} .d2{animation-delay:.25s;}
        .d3{animation-delay:.42s;} .d4{animation-delay:.60s;}

        /* technical grid light mode */
        .grid-light{
          background-image:
            repeating-linear-gradient(45deg,transparent,transparent 2px,rgba(0,0,0,.02) 2px,rgba(0,0,0,.02) 4px),
            repeating-linear-gradient(-45deg,transparent,transparent 2px,rgba(0,0,0,.01) 2px,rgba(0,0,0,.01) 4px);
        }
        
        .hero-glow-light{
          background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(184,115,51,.08) 0%,transparent 70%);
        }

        .btn-cu{
          display:inline-flex;align-items:center;gap:8px;
          background:#1A1A1A;color:#FFFFFF;
          font-family:'Space Mono',monospace;font-size:11px;
          font-weight:700;letter-spacing:.2em;text-transform:uppercase;
          padding:14px 32px;text-decoration:none;border:none;cursor:pointer;
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          transition:all .22s;
        }
        .btn-cu:hover{background:#B87333;transform:translateY(-2px);}

        .btn-ou{
          display:inline-flex;align-items:center;gap:8px;
          background:transparent;color:#1A1A1A;
          font-family:'Space Mono',monospace;font-size:11px;
          font-weight:700;letter-spacing:.2em;text-transform:uppercase;
          padding:12px 30px;text-decoration:none;cursor:pointer;
          border:2px solid #1A1A1A;
          clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
          transition:all .22s;
        }
        .btn-ou:hover{background:#1A1A1A;color:#FFFFFF;}

        .tech-label{
          font-family:'Space Mono',monospace;font-size:10px;
          letter-spacing:3px;text-transform:uppercase;color:#B87333;font-weight:bold;
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,.95)" : "transparent",
          borderBottom: scrolled ? "1px solid #E5E7EB" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
        }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <svg width="26" height="26" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
              <polygon points="14,2 26,20 2,20" fill="none" stroke="#1A1A1A" strokeWidth="2" />
              <polygon points="14,8 21,20 7,20" fill="#B87333" />
              <line x1="14" y1="2" x2="14" y2="26" stroke="#1A1A1A" strokeWidth="1.5" />
            </svg>
            <span className="font-display-serif font-bold text-2xl md:text-3xl text-gray-900 tracking-[.18em] group-hover:text-[#B87333] transition-colors">
              PELIDES
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href}
                className="font-mono font-bold text-[11px] tracking-widest uppercase text-gray-600 hover:text-[#B87333] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="mailto:contact@pelides.fr" className="btn-cu">Contacter</a>
          </nav>

          <button className="md:hidden p-2 focus:outline-none" onClick={() => setMenuOpen(true)}
            aria-label="Menu" style={{ color: "#1A1A1A" }}>
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ─────────────────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: "#FFFFFF", animation: "fadeIn .2s ease both" }}>
          <div className="flex items-center justify-between px-5 h-16 border-b" style={{ borderColor: "#E5E7EB" }}>
            <span className="font-display-serif font-bold text-2xl tracking-[.18em]" style={{ color: "#1A1A1A" }}>PELIDES</span>
            <button onClick={() => setMenuOpen(false)} style={{ color: "#1A1A1A" }}><X size={24} /></button>
          </div>
          <nav className="flex flex-col justify-center flex-1 px-8 gap-8">
            {NAV_LINKS.map((l, i) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                className="font-display-serif font-bold text-5xl text-gray-900 hover:text-[#B87333] transition-colors tracking-wide"
                style={{ animation: `slideL .45s ease ${i * .07}s both` }}>
                {l.label}
              </a>
            ))}
            <a href="mailto:contact@pelides.fr" className="btn-cu mt-4" style={{ width: "fit-content" }}>
              contact@pelides.fr
            </a>
          </nav>
          <div className="px-8 pb-8 font-mono text-[10px] tracking-[3px] text-gray-500 uppercase font-bold">
            Ingénierie Souveraine — France
          </div>
        </div>
      )}

      <main>
        {/* ── HERO (Ultra Épuré) ────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-light"
          style={{ background: "#FFFFFF" }}>
          <div className="absolute inset-0 hero-glow-light pointer-events-none" />

          {/* Drone silhouette filigrane */}
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
            <div className="w-[120%] md:w-[80%] max-w-4xl mt-32 md:mt-10 opacity-10">
              <DroneSilhouette blur={false} opacity={0.8} />
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full mt-16 md:mt-0">
            <div className={`flex items-center gap-3 mb-6 ${ready ? "anim-fade-in" : "opacity-0"}`}>
              <span className="h-0.5 w-10 bg-[#B87333] inline-block" />
              <span className="tech-label">Ingénierie Aéronautique</span>
            </div>

            <h1 className={`font-display-serif font-bold leading-none mb-6 text-gray-900 ${ready ? "anim-fade-up d1" : "opacity-0"}`}
              style={{ fontSize: "clamp(50px, 10vw, 130px)" }}>
              FRET LOURD.<br/>
              <span style={{ color: "#B87333" }}>AUTONOME.</span>
            </h1>

            <p className={`font-mono text-sm md:text-base text-gray-600 max-w-xl leading-relaxed mb-10 font-bold ${ready ? "anim-fade-up d2" : "opacity-0"}`}>
              S'affranchir des infrastructures. La logistique lourde là où la route s'arrête. 50 kg. 50 km. Sans pilote ni piste.
            </p>

            <div className={`flex flex-wrap gap-4 mb-16 ${ready ? "anim-fade-up d3" : "opacity-0"}`}>
              <a href="#mission" className="btn-cu">La Technologie <ArrowRight size={14} /></a>
              <a href="mailto:contact@pelides.fr" className="btn-ou">Nous Contacter</a>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
            <ChevronDown size={20} className="animate-bounce" style={{ color: "#1A1A1A" }} />
          </div>
        </section>

        {/* ── MISSION ───────────────────────────────────────── */}
        <section id="mission" className="py-24 md:py-36" style={{ background: "#F8F9FA" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <Divider index="01" label="Notre Mission" />

            <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
              <div>
                <h2 className="font-display-serif font-bold text-4xl md:text-6xl text-gray-900 leading-tight mb-8">
                  Débloquer<br /><span style={{ color: "#B87333" }}>l'impossible.</span>
                </h2>

                <p className="font-mono text-sm text-gray-600 font-bold leading-relaxed mb-6">
                  Le transport de matériel critique est aujourd'hui entravé dans les zones inaccessibles ou hostiles. Notre innovation de rupture réside dans le développement du système exclusif Umbilical Power.
                </p>

                <div className="p-6 mb-6 border-l-4" style={{ borderColor: "#B87333", background: "#FFFFFF", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap size={16} style={{ color: "#B87333" }} strokeWidth={2} />
                    <span className="tech-label" style={{ color: "#B87333" }}>Umbilical Power — Brevet en cours</span>
                  </div>
                  <p className="font-mono text-sm text-gray-700 leading-relaxed">
                    Cette technologie d'alimentation filaire largable permet au vecteur de décoller en surcharge grâce à l'énergie du sol. Le câble est largué à l'altitude de transition, libérant le drone pour sa mission.
                  </p>
                </div>

                <p className="font-mono text-sm text-gray-600 font-bold leading-relaxed">
                  En maximisant la capacité d'emport sans surdimensionner les batteries embarquées, nous redéfinissons les standards de la logistique tactique.
                </p>
              </div>

              <UmbilicalDiagram />
            </div>
          </div>
        </section>

        {/* ── SYSTEME ───────────────────────────────────────── */}
        <section id="systeme" className="py-24 md:py-36 grid-light" style={{ background: "#FFFFFF", borderTop: "1px solid #E5E7EB" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <Divider index="02" label="Le Système" />

            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="font-display-serif font-bold text-4xl md:text-6xl text-gray-900 leading-tight mb-8">
                  Conçu pour<br /><span style={{ color: "#C44536" }}>l'extrême.</span>
                </h2>

                <p className="font-mono text-sm text-gray-600 font-bold leading-relaxed mb-10">
                  Notre architecture s'affranchit des contraintes aéroportuaires. Une zone d'opération rudimentaire suffit au déploiement immédiat.
                </p>

                <div className="space-y-6 mb-10">
                  {[
                    { l: "Charge Utile",  v: "50 KG",       p: 100 },
                    { l: "Rayon d'Action",v: "50 KM",       p: 75  },
                    { l: "Déploiement",   v: "VTOL",        p: 65  },
                    { l: "Résilience EM", v: "DÉNI GPS",    p: 90  },
                  ].map(s => (
                    <div key={s.l} className="font-mono font-bold">
                      <div className="flex justify-between mb-2">
                        <span className="text-[11px] text-gray-500 tracking-widest uppercase">{s.l}</span>
                        <span className="text-[12px]" style={{ color: "#1A1A1A" }}>{s.v}</span>
                      </div>
                      <div className="h-1.5 bg-[#F8F9FA] w-full rounded-full overflow-hidden border border-[#E5E7EB]">
                        <div className="h-full transition-all duration-1000"
                          style={{ width: `${s.p}%`, background: "linear-gradient(90deg,#B87333,#D4AF37)" }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-4 p-6 bg-[#F8F9FA] border-2 border-[#E5E7EB]"
                  style={{ clipPath: "polygon(0 0,calc(100% - 16px) 0,100% 16px,100% 100%,16px 100%,0 calc(100% - 16px))" }}>
                  <Navigation size={20} style={{ color: "#C44536" }} strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="tech-label mb-2" style={{ color: "#C44536" }}>Avionique Endurcie</div>
                    <p className="font-mono text-xs text-gray-600 leading-relaxed font-bold">
                      Navigation inertielle et fusion de capteurs tolérante au brouillage. Vol autonome maintenu en condition de déni de signal GPS.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <DroneSchematic />
              </div>
            </div>
          </div>
        </section>

        {/* ── MARCHES ───────────────────────────────────────── */}
        <section id="marches" className="py-24 md:py-36" style={{ background: "#F8F9FA", borderTop: "1px solid #E5E7EB" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <Divider index="03" label="Marchés Cibles" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <h2 className="font-display-serif font-bold text-4xl md:text-6xl text-gray-900 leading-tight">
                Des missions<br /><span style={{ color: "#B87333" }}>sans compromis.</span>
              </h2>
              <p className="font-mono font-bold text-xs text-gray-500 max-w-sm leading-relaxed tracking-wide uppercase">
                Trois verticalités. Un vecteur unique pour les opérations où la logistique conventionnelle échoue.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <MarcheCard icon={Shield}  title="Défense & Sécurité"  tag="PÉNÉTRATION"  accent="#C44536"
                text="Répondre aux appels d'offres de l'Agence de l'Innovation de Défense. Ravitaillement tactique du dernier kilomètre sans exposition humaine." />
              <MarcheCard icon={Heart}   title="Médical d'Urgence"    tag="CIVIL CRITIQUE" accent="#D4AF37"
                text="Transport inter-hôpitaux d'organes à température contrôlée. L'infrastructure routière ne doit plus être un obstacle à la survie." />
              <MarcheCard icon={Wrench}  title="Industrie Offshore" tag="MARCHÉ OUVERT" accent="#B87333"
                text="Logistique de haute complexité pour les sites énergétiques isolés, les plateformes pétrolières et les zones de haute montagne." />
            </div>
          </div>
        </section>

        {/* ── TECHNOLOGIE ───────────────────────────────────── */}
        <section id="technologie" className="py-24 md:py-36 grid-light" style={{ background: "#FFFFFF", borderTop: "1px solid #E5E7EB" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <Divider index="04" label="Technologie" />

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-display-serif font-bold text-4xl md:text-6xl text-gray-900 leading-tight mb-8">
                  Architecture<br /><span style={{ color: "#B87333" }}>Hexa-Tilt.</span>
                </h2>

                <p className="font-mono text-sm text-gray-600 font-bold leading-relaxed mb-8">
                  Une hybridation technologique alliant la capacité d'emport d'un hélicoptère et la vitesse de croisière d'un avion cargo militaire type A400M.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Radio,      label: "Résilience Électromagnétique", color: "#D4AF37",
                      text: "Avionique conçue pour résister au brouillage en environnements hostiles." },
                    { icon: Navigation, label: "Indépendance Satellitaire",      color: "#B87333",
                      text: "Navigation autonome sans dépendance aux constellations GPS." },
                    { icon: Zap,        label: "Umbilical Power",              color: "#C44536",
                      text: "Alimentation filaire largable pour une poussée maximale au décollage." },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4 p-5 bg-[#F8F9FA] border-2 border-[#E5E7EB]">
                      <item.icon size={20} style={{ color: item.color }} strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-mono text-[10px] tracking-[2px] font-bold uppercase mb-1" style={{ color: item.color }}>
                          {item.label}
                        </div>
                        <p className="font-mono text-xs text-gray-600 font-bold leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8 bg-white border-2 border-[#E5E7EB] shadow-lg"
                style={{ clipPath: "polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,24px 100%,0 calc(100% - 24px))" }}>
                <div className="tech-label mb-8 flex items-center gap-2">
                  <span className="h-0.5 w-6 bg-[#B87333] inline-block" />
                  Cinématique des Rotors
                </div>
                <TiltAnimation />
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA CONTACT ───────────────────────────────────── */}
        <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#F8F9FA", borderTop: "1px solid #E5E7EB" }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
            <span className="font-display-serif font-bold leading-none text-[#1A1A1A]" aria-hidden="true"
              style={{ fontSize: "22vw", letterSpacing: ".1em" }}>
              PELIDES
            </span>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10">
            <div className="p-10 md:p-16 bg-white border-2 border-[#E5E7EB] shadow-xl"
              style={{ clipPath: "polygon(0 0,calc(100% - 32px) 0,100% 32px,100% 100%,32px 100%,0 calc(100% - 32px))" }}>
              <div className="max-w-2xl">
                <span className="tech-label block mb-6">Phase d'Ingénierie — Startup Deeptech</span>
                <h2 className="font-display-serif font-bold text-5xl md:text-7xl text-gray-900 leading-none mb-6">
                  Le futur est<br /><span style={{ color: "#B87333" }}>en construction.</span>
                </h2>
                <p className="font-mono font-bold text-sm text-gray-600 leading-relaxed mb-10 max-w-lg">
                  Investisseurs, partenaires industriels, agences de défense. Pour discuter de nos avancées technologiques ou d'un partenariat souverain, contactez l'équipe fondatrice.
                </p>
                <a href="mailto:contact@pelides.fr" className="btn-cu">
                  contact@pelides.fr <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <footer className="py-12 bg-[#FFFFFF]" style={{ borderTop: "2px solid #E5E7EB" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <polygon points="14,2 26,20 2,20" fill="none" stroke="#1A1A1A" strokeWidth="2" />
                <polygon points="14,8 21,20 7,20" fill="#B87333" />
              </svg>
              <span className="font-display-serif font-bold text-xl text-gray-900 tracking-[.18em]">PELIDES</span>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <a href="mailto:contact@pelides.fr" className="font-mono font-bold text-sm transition-colors hover:text-[#B87333]" style={{ color: "#1A1A1A" }}>
                contact@pelides.fr
              </a>
              <span className="font-mono font-bold text-[10px] tracking-[3px] text-gray-500 uppercase">Ingénierie Souveraine Française</span>
            </div>
          </div>
          <div className="pt-8 border-t border-[#E5E7EB] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <span className="font-mono font-bold text-[11px] text-gray-500 tracking-wide">
              © 2026 Pelides Aero. Tous droits réservés.
            </span>
            <span className="font-mono font-bold text-[10px] tracking-[2px] text-gray-400 uppercase">
              Occitanie — France
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}