import CodeArena from "./CodeArena/page"
import AboutCompetition from "../components/aboutCA";
import Sponsors from "../components/sponsors";
import Footer from "../components/ui/Footer";
import PrizePool from "../components/PrizePool";
import Countdown from "../components/Countdown";
export default function Home() {
  return (
    <>
      <CodeArena/>
      <AboutCompetition/>
      <Countdown/>
      <PrizePool/>
      <Sponsors/>
      <Footer/>
    </>

  );
}


