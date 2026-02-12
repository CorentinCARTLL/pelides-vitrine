import React from 'react';
import { Shield, Cpu, Anchor, ArrowRight, Mail } from 'lucide-react';

// --- COMPOSANTS UI MINIMALISTES ---

// Logo Casque
const MyrmidonLogo = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 C30 5, 15 25, 15 45 C15 65, 25 80, 25 80 L35 80 C35 80, 30 65, 30 55 C30 40, 40 30, 50 30 C60 30, 70 40, 70 55 C70 65, 65 80, 65 80 L75 80 C75 80, 85 65, 85 45 C85 25, 70 5, 50 5 Z" />
    <path d="M50 5 L50 25 M30 15 L40 25 M70 15 L60 25" stroke="currentColor" strokeWidth="4" />
  </svg>
);

// Représentation Drone
const DroneSchematic = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="1">
    <circle cx="100" cy="100" r="30" strokeWidth="2" />
    <circle cx="100" cy="100" r="10" className="opacity-50" />
    <line x1="100" y1="70" x2="100" y2="20" />
    <line x1="100" y1="130" x2="100" y2="180" />
    <line x1="70" y1="100" x2="20" y2="100" />
    <line x1="130" y1="100" x2="180" y2="100" />
    <circle cx="100" cy="20" r="15" strokeDasharray="4 4" className="opacity-60" />
    <circle cx="100" cy="180" r="15" strokeDasharray="4 4" className="opacity-60" />
    <circle cx="20" cy="100" r="15" strokeDasharray="4 4" className="opacity-60" />
    <circle cx="180" cy="100" r="15" strokeDasharray="4 4" className="opacity-60" />
    <circle cx="100" cy="100" r="80" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-30" />
  </svg>
);

// Composant Carte
const ValueCard = ({ icon: Icon, title, subtitle, detail }) => (
  <div className="flex flex-col items-start p-6 border-l border-[#a07828]/30 hover:border-[#a07828] transition-colors duration-300 bg-white/40 backdrop-blur-sm">
    <Icon className="w-8 h-8 md:w-6 md:h-6 text-[#a07828] mb-4" strokeWidth={1.5} />
    <h3 className="font-cinzel text-xl md:text-base font-bold text-[#2c3e50] mb-2">{title}</h3>
    <p className="font-inter text-xs md:text-[10px] font-bold uppercase tracking-wider text-[#a07828] mb-3">{subtitle}</p>
    <p className="font-inter text-sm md:text-xs text-[#2c3e50]/80 leading-relaxed">{detail}</p>
  </div>
);

export default function PelidesStealth() {
  return (
    <div className="min-h-screen bg-[#e6e2d3] text-[#2c3e50] font-sans selection:bg-[#a07828] selection:text-white overflow-x-hidden">
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;600&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* --- HEADER --- */}
      <header className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center bg-[#e6e2d3]/95 backdrop-blur-md border-b border-[#a07828]/10">
        <div className="flex items-center space-x-3">
          <MyrmidonLogo className="w-8 h-8 md:w-6 md:h-6 text-[#a07828]" />
          <span className="font-cinzel font-bold tracking-widest text-lg md:text-base text-[#2c3e50]">PELIDES</span>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center">
        
        {/* HERO SECTION */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
          
          {/* Colonne Texte */}
          <div className="space-y-6">
            <div className="inline-block border-b border-[#a07828] text-[#a07828] text-xs md:text-[10px] font-mono tracking-widest uppercase pb-1">
              Systemes Aeriens Autonomes
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-black leading-tight text-[#2c3e50]">
              LOGISTIQUE AÉRIENNE LOURDE.<br/>
              <span className="text-[#a07828]">SOUVERAINE.</span>
            </h1>
            
            <p className="text-base md:text-sm font-inter text-[#2c3e50]/70 max-w-md leading-relaxed">
              Développement de vecteurs de fret tactique pour environnements critiques.
            </p>
          </div>

          {/* Colonne Visuelle */}
          <div className="relative h-[300px] flex items-center justify-center">
             <div className="w-full h-full flex items-center justify-center opacity-80 text-[#2c3e50]">
                <DroneSchematic className="w-72 h-72 md:w-80 md:h-80 animate-spin-slow duration-[60s]" />
             </div>
          </div>
        </div>

        {/* PROPOSITION DE VALEUR */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 border-t border-[#2c3e50]/10 pt-12">
          <ValueCard 
            icon={Anchor}
            title="Capacité"
            subtitle="OBJECTIF : FRET LOURD"
            detail="Architecture composite en développement pour maximiser le ratio poids/puissance et la charge utile."
          />
          <ValueCard 
            icon={Shield}
            title="Opérabilité"
            subtitle="CIBLE : TOUT TERRAIN"
            detail="Conception visant un déploiement sans infrastructure au sol et une navigation en zones non-préparées."
          />
          <ValueCard 
            icon={Cpu}
            title="Technologie"
            subtitle="AUTONOMIE EMBARQUEE"
            detail="Recherche axée sur le pilotage hybride, la résilience aux pannes et la sécurité des liaisons."
          />
        </div>

        {/* PREUVE SOCIALE */}
        <div className="w-full text-center py-8 border-t border-b border-[#a07828]/10">
          <div className="flex justify-center items-center space-x-3 opacity-60">
            <span className="font-cinzel font-bold text-xl md:text-lg tracking-widest text-[#2c3e50]">INGÉNIERIE FRANÇAISE</span>
          </div>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-[#e6e2d3] text-[#2c3e50] py-8 px-6 border-t border-[#a07828]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <div className="flex items-center space-x-2">
            <MyrmidonLogo className="w-5 h-5 text-[#a07828]" />
            <span className="font-cinzel font-bold text-sm md:text-xs">PELIDES</span>
          </div>
          <div className="flex space-x-6 text-xs md:text-[10px] font-inter uppercase tracking-widest">
            <a href="mailto:contact@pelides.fr" className="flex items-center space-x-2 hover:text-[#a07828] transition-colors">
              <Mail size={14} />
              <span>contact@pelides.fr</span>
            </a>
          </div>
          <div className="text-[10px] md:text-[9px] font-mono opacity-40">
            © 2026 PELIDES.
          </div>
        </div>
      </footer>
    </div>
  );
}