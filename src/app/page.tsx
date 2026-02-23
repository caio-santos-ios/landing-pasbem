import BemCard from "./components/sections/BemCard";
import { BemVital } from "./components/sections/BemVital";
import { ComparisonTable } from "./components/sections/Comparison";
import Ecosystem from "./components/sections/Ecosystem";
import FooterCTA from "./components/sections/FooterCTA";
import Hero from "./components/sections/Hero";
import PainPoints from "./components/sections/PainPoints";
import PasbemLanding from "./components/sections/Pasbemlanding";
import Scores from "./components/sections/Scores";
import TechScores from "./components/sections/TechScores";


export default function Page() {
  return (
    // <main className="min-h-screen antialiased selection:bg-brand-blue selection:text-white">
    //   <Hero />
    //   <PainPoints />
    //   <BemVital />
    //   <Ecosystem />
    //   <TechScores />
    //   <BemCard />
    //   <Scores />
    //   <ComparisonTable />
    //   <FooterCTA />
    // </main>
    <PasbemLanding />
  );
}