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

export default UmbilicalDiagram;

