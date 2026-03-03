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

export default DroneSilhouette;

