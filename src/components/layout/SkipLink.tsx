export default function SkipLink({ target = 'main', label = 'Skip to content' }: { target?: string; label?: string }) {
  return (
    <a
      href={`#${target}`}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-theme focus:bg-primary focus:px-4 focus:py-2 focus:font-medium focus:text-primary-contrast focus:shadow-theme"
    >
      {label}
    </a>
  );
}
