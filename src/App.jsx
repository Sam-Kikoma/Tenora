import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Programme from "./components/Programme";
import Ensemble from "./components/Ensemble";
import Footer from "./components/Footer";
import { concertInfo } from "./data/programme";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function App() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isLoading) return;

		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			direction: "vertical",
			gestureDirection: "vertical",
			smooth: true,
			smoothTouch: false,
		});

		lenis.on("scroll", ScrollTrigger.update);

		gsap.ticker.add((time) => {
			lenis.raf(time * 1000);
		});

		gsap.ticker.lagSmoothing(false);

		return () => {
			lenis.destroy();
			gsap.ticker.remove(lenis.raf);
		};
	}, [isLoading]);

	return (
		<>
			{isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
			<CustomCursor isDesktop={typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches} />

			<Nav />

			<div
				style={{
					position: "relative",
					zIndex: 1,
					backgroundColor: "var(--parchment)",
					boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
				}}
			>
				<main>
					{!isLoading ? <Hero info={concertInfo} /> : <div style={{ height: "100vh" }} />}
					<Programme />
					<Ensemble />
				</main>
			</div>

			<Footer />
		</>
	);
}
