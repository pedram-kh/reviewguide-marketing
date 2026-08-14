import { SparkleIcon } from "@/components/icons";

/** Shared nav + footer wordmark, ported from the reference's repeated `.logo`/`.logo-mark` markup. */
export function Logo() {
  return (
    <a className="logo" href="#top">
      <span className="logo-mark">
        <SparkleIcon size={20} />
      </span>
      ReviewGuide
    </a>
  );
}
