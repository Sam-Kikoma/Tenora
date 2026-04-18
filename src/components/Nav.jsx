import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Nav.module.css";

export default function Nav() {
	const navRef = useRef(null);

	useGSAP(
		() => {
			gsap.fromTo(
				navRef.current,
				{ opacity: 0, y: -20 },
				{ opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 },
			);
		},
		{ scope: navRef },
	);

	const scrollTo = (id) => {
		const el = document.getElementById(id);
		if (el) {
			const top = el.getBoundingClientRect().top + window.scrollY - 64;
			window.scrollTo({ top, behavior: "smooth" });
		}
	};

	return (
		<nav ref={navRef} className={styles.nav} aria-label="Site navigation">
			<div className={styles.brandWrapper}>
				<img src="/logo.png" alt="Tenora Chorale" className={styles.navLogo} />
			</div>
			<ul className={styles.links}>
				<li>
					<button onClick={() => scrollTo("programme")}>Programme</button>
				</li>
				<li>
					<button onClick={() => scrollTo("ensemble")}>Ensemble</button>
				</li>
			</ul>
		</nav>
	);
}
