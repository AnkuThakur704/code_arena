import CodeArena from "./CodeArena/page"
import AboutCompetition from "../components/aboutCA";
import Sponsors from "../components/sponsors";
import Footer from "../components/ui/Footer";
import PrizePool from "../components/PrizePool";
import Countdown from "../components/Countdown";
import Timeline from "../components/timeline";
import QueryForm from "../components/queryform";
export default function Home() {
  return (
    <>
      <CodeArena/>
      <AboutCompetition/>
      <Countdown/>
      <PrizePool/>
      <Timeline/>
      <Sponsors/>
      <QueryForm/>
      <Footer/>
    </>

  );
}


