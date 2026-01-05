export default function CakeLogo() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Cake Base */}
      <g>
        {/* Bottom layer */}
        <rect x="10" y="60" width="80" height="20" rx="2" fill="#D8B0D8" stroke="#9D174D" strokeWidth="1.5" />
        
        {/* Middle layer */}
        <rect x="15" y="40" width="70" height="20" rx="2" fill="#E0B0E0" stroke="#9D174D" strokeWidth="1.5" />
        
        {/* Top layer */}
        <rect x="20" y="20" width="60" height="20" rx="2" fill="#E8C0E8" stroke="#9D174D" strokeWidth="1.5" />
        
        {/* Frosting swirl on top */}
        <path
          d="M 30 15 Q 35 5 40 10 Q 45 5 50 10 Q 55 5 60 10 Q 65 5 70 15"
          fill="none"
          stroke="#FF69B4"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Sprinkles */}
        <circle cx="30" cy="12" r="1.5" fill="#FF1493" />
        <circle cx="45" cy="8" r="1.5" fill="#FF1493" />
        <circle cx="65" cy="10" r="1.5" fill="#FF1493" />
        
        {/* Cherry on top */}
        <circle cx="50" cy="8" r="3" fill="#FF1493" stroke="#BE185D" strokeWidth="0.5" />
      </g>
    </svg>
  )
}
