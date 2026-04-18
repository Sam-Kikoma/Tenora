import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Programme from "./components/Programme";
import Ensemble from "./components/Ensemble";
import Footer from "./components/Footer";
import { concertInfo } from "./data/programme";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
	return (
		<>
			<Nav />
			<main>
				<Hero info={concertInfo} />
				<Programme />
				<Ensemble />
			</main>
			<Footer />
		</>
	);
}
