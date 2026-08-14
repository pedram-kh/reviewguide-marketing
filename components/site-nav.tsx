import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.reviewguide.eu";

export function SiteNav() {
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Logo />
        <nav className="nav-links">
          <a href="#jak">Jak to działa</a>
          <a href="#przyklady">Przykłady</a>
          <a href="#cennik">Cennik</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-cta">
          <Button href={`${APP_URL}/login`} variant="ghost">
            Zaloguj się
          </Button>
          <Button href={`${APP_URL}/signup`}>Wypróbuj za darmo</Button>
        </div>
      </div>
    </header>
  );
}
