import DecodeText from "@/components/hud/DecodeText";
import Reveal from "@/components/hud/Reveal";

export default function SectionHead({ index, title }: { index: string; title: string }) {
  return (
    <Reveal className="section-head">
      <span className="font-mono text-[13px] text-cyan-hud">{`${index} //`}</span>
      <h2>
        <DecodeText text={title} />
      </h2>
      <span className="rule" />
    </Reveal>
  );
}
