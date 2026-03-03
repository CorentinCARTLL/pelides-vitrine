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

export default DroneSchematic;

