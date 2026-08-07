export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-sm text-white/50 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} ReviewGuide</p>
        <a href="mailto:anna@reviewguide.eu" className="hover:text-white/80">
          anna@reviewguide.eu
        </a>
      </div>
    </footer>
  );
}
