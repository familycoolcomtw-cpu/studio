export function PokeTrackerLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="家庭圖鑑 logo"
    >
      <circle cx="25" cy="25" r="24" stroke="currentColor" strokeWidth="2" />
      <path d="M25 25L5 15" stroke="currentColor" strokeWidth="2" />
      <path d="M25 25L45 15" stroke="currentColor" strokeWidth="2" />
      <path d="M25 25L25 49" stroke="currentColor" strokeWidth="2" />
      <circle cx="25" cy="25" r="5" fill="currentColor" />
    </svg>
  );
}
