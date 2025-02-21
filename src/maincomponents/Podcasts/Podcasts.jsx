import Navbar from "../../components/Navbar/Navbar";
import ForYou from "../../Podcustcomonents/ForYou/ForYou";
import HeroSection from "../../Podcustcomonents/HeroSection/HeroSection";
import TopShows from "../../Podcustcomonents/TopShows/TopShows";
import "./Podcasts.css";
function Podcasts() {
  return (
    <div className="Podcasts">
      <Navbar />
      <HeroSection />
      <TopShows />
      <ForYou />
    </div>
  );
}
export default Podcasts;
