// Custom geometric F mark drawn for this project, not a stock icon.
export default function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="16" fill="#0284c7" />
      <path d="M16 17h34L40 27H27v8h17L34 45h-7v7H16Z" fill="#fff" />
      <path d="m43 43 8-8v17H34Z" fill="#7dd3fc" />
    </svg>
  );
}
