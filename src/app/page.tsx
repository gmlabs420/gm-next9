import Image from "next/image";
import Header from "./components/Header";
import ScrollingTextArea from "./components/ScrollingTextArea";
import QuantityPriceModule from "./components/QuantityPriceModule";
import AIGMMachine from "./components/AIGMMachine";
import AIGMImage from "./components/AIGMImage";
import GmSendStation from "./components/GmSendStation";
import GmsMinted from "./components/GmsMinted";
import GmsLeaderboard from "./components/GmsLeaderboard";
import GmsRedeem from "./components/GmsRedeem";
import GmsGrowModule from "./components/GmsGrowModule";
import GmsDrawingModule from "./components/GmsDrawingModule";
import AboutAccordion from "./components/AboutAccordion";
import AboutAccordion2 from "./components/AboutAccordion2";
import AboutAccordion3 from "./components/AboutAccordion3";
import AboutAccordion4 from "./components/AboutAccordion4";
import AboutAccordion5 from "./components/AboutAccordion5";
import AboutAccordion6 from "./components/AboutAccordion6";
import Footer from "./components/Footer";
import { createThirdwebClient } from "thirdweb";
import RunnerGame from "./components/RunnerGame";
import ShootingGame from "./components/ShootingGame";
import SunriseSudoku from "./components/SunriseSudoku";



export default function Home() {
  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
  });

  return (
    <>
      <Header client={client} />
      <main className="main-content">


        <div className="columns-container">
          <div className="column left-column">
            <QuantityPriceModule />
          </div>
          <div className="column middle-column">
            <GmSendStation />
          </div>
          <div className="column right-column">
          <GmsRedeem />
          </div>
        </div>

        <ScrollingTextArea />

        <div className="columns-container">
          <div className="column left-column">
          <AIGMImage />
          </div>
          <div className="column middle-column">
            <AIGMMachine />
          </div>
          <div className="column right-column">
          <GmsDrawingModule />
          </div>
        </div>


        <div className="columns-container">
          <div className="column left-column">
          <GmsLeaderboard />
          </div>
          <div className="column middle-column">
          <GmsGrowModule />
          </div>
          <div className="column right-column">
          <GmsMinted />

          </div>
        </div>


        <div className="columns-container">
          <div className="column left-column">
          <RunnerGame />
          </div>
          <div className="column middle-column">
          <ShootingGame />
          </div>
          <div className="column right-column">
          <SunriseSudoku />
          </div>
        </div>

        <div>
          <AboutAccordion />
          <AboutAccordion2 />
          <AboutAccordion4 />
          <AboutAccordion5 />
          <AboutAccordion6 />
        </div>
      </main>
      <Footer />
    </>
  );
}
