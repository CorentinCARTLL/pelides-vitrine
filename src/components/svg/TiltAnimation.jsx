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

export default TiltAnimation;

