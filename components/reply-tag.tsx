import { SparkleIcon } from "@/components/icons";

/** The small "Odpowiedź (od) ReviewGuide" pill shown above every AI-drafted reply. */
export function ReplyTag({ label }: { label: string }) {
  return (
    <span className="reply-tag">
      <SparkleIcon size={13} />
      {label}
    </span>
  );
}
