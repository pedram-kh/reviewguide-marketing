import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <Logo />
        <div className="foot-links">
          <a href="#jak">Jak to działa</a>
          <a href="#cennik">Cennik</a>
          <a href="#faq">FAQ</a>
          <a href="mailto:anna@reviewguide.eu">anna@reviewguide.eu</a>
        </div>
        <div className="foot-copy">© {new Date().getFullYear()} ReviewGuide</div>
      </div>
    </footer>
  );
}
