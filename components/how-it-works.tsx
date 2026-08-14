import { SearchIcon, PencilIcon, SendIcon } from "@/components/icons";

type Lang = "pl" | "en";

const ICONS = [
  { iconClass: "ic-amber", icon: <SearchIcon /> },
  { iconClass: "ic-green", icon: <PencilIcon /> },
  { iconClass: "ic-sky", icon: <SendIcon /> },
] as const;

const COPY = {
  pl: {
    eyebrow: "Jak to działa",
    h2: "Trzy kroki, zero pilnowania.",
    steps: [
      {
        title: "Wykrywamy",
        body: "ReviewGuide sprawdza opinie Twojej restauracji na Google co 2 godziny i wyłapuje te, które wymagają odpowiedzi — zwłaszcza te z niską oceną i bez reakcji właściciela.",
      },
      {
        title: "Piszemy odpowiedź",
        body: "AI przygotowuje spokojną, konkretną odpowiedź dopasowaną do treści opinii — w języku, w którym została napisana, bez szablonowego tonu.",
      },
      {
        title: "Ty akceptujesz i wysyłasz",
        body: "Zawsze widzisz gotową odpowiedź przed wysłaniem. Jedno kliknięcie — i opinia ma odpowiedź, zanim ktokolwiek zdąży ją przewinąć.",
      },
    ],
  },
  en: {
    eyebrow: "How it works",
    h2: "Three steps, zero babysitting.",
    steps: [
      {
        title: "We detect",
        body: "ReviewGuide checks your restaurant's Google reviews every 2 hours and catches the ones that need a response — especially low ratings with no reply from the owner.",
      },
      {
        title: "We write the response",
        body: "AI prepares a calm, specific response tailored to the review — in the language it was written in, never generic.",
      },
      {
        title: "You approve and send",
        body: "You always see the finished response before it's sent. One click, and the review has a reply before anyone even has time to scroll past it.",
      },
    ],
  },
} as const;

export function HowItWorks({ lang = "pl" }: { lang?: Lang }) {
  const copy = COPY[lang];
  const steps = copy.steps.map((step, i) => ({ ...step, ...ICONS[i], number: `0${i + 1}` }));

  return (
    <section className="section-pad tint" id="jak">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            {copy.eyebrow}
          </span>
          <h2>{copy.h2}</h2>
        </div>
        <div className="steps">
          {steps.map((step) => (
            <div key={step.number} className="step reveal">
              <div className="step-num">{step.number}</div>
              <div className={`step-ic ${step.iconClass}`}>{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
