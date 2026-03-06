import CodeArena from "./CodeArena/page"
import Footer from "../components/ui/Footer";
import PrizePool from "../components/PrizePool";
import Countdown from "../components/Countdown";
export default function Home() {
  return (
    <>
      <CodeArena/>
      <Countdown/>
      <PrizePool/>
      <Footer/>
    </>

  );
}


