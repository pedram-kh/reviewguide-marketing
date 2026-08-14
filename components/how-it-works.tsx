import { SearchIcon, PencilIcon, SendIcon } from "@/components/icons";

const STEPS = [
  {
    number: "01",
    iconClass: "ic-amber",
    icon: <SearchIcon />,
    title: "Wykrywamy",
    body: "ReviewGuide sprawdza opinie Twojej restauracji na Google co 2 godziny i wyłapuje te, które wymagają odpowiedzi — zwłaszcza te z niską oceną i bez reakcji właściciela.",
  },
  {
    number: "02",
    iconClass: "ic-green",
    icon: <PencilIcon />,
    title: "Piszemy odpowiedź",
    body: "AI przygotowuje spokojną, konkretną odpowiedź dopasowaną do treści opinii — w języku, w którym została napisana, bez szablonowego tonu.",
  },
  {
    number: "03",
    iconClass: "ic-sky",
    icon: <SendIcon />,
    title: "Ty akceptujesz i wysyłasz",
    body: "Zawsze widzisz gotową odpowiedź przed wysłaniem. Jedno kliknięcie — i opinia ma odpowiedź, zanim ktokolwiek zdąży ją przewinąć.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="section-pad tint" id="jak">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">
            <span className="dot" />
            Jak to działa
          </span>
          <h2>Trzy kroki, zero pilnowania.</h2>
        </div>
        <div className="steps">
          {STEPS.map((step) => (
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
