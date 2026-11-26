import BootScreen from "@/components/hud/BootScreen";
import HudRails from "@/components/hud/HudRails";
import Hero from "@/components/sections/Hero";
import Telemetry from "@/components/sections/Telemetry";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import MissionLog from "@/components/sections/MissionLog";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <BootScreen />
      <HudRails />
      <main className="relative z-[2] max-w-[1200px] mx-auto px-6">
        <Hero />
        <Telemetry />
        <Projects />
        <Stack />
        <MissionLog />
        <Contact />
      </main>
    </>
  );
}
