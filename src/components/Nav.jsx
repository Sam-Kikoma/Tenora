import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Nav.module.css";
import Lenis from "lenis";

export default function Nav() {
	const navRef = useRef(null);

	useGSAP(
		() => {
			gsap.fromTo(
				navRef.current,
				{ opacity: 0, y: -20, filter: "blur(10px)" },
				{ opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.5 },
			);

			const buttons = document.querySelectorAll(`.${styles.links} button`);
			buttons.forEach((btn) => {
				btn.addEventListener("mousemove", (e) => {
					const rect = btn.getBoundingClientRect();
					const h = rect.width / 2;
					const v = rect.height / 2;
					const x = e.clientX - rect.left - h;
					const y = e.clientY - rect.top - v;

					gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
				});

				btn.addEventListener("mouseleave", () => {
					gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
				});
			});
		},
		{ scope: navRef },
	);

	const scrollTo = (id) => {
		const el = document.getElementById(id);
		if (el) {
			const top = el.getBoundingClientRect().top + window.scrollY;
			window.scrollTo({ top, behavior: "smooth" });
		}
	};

	return (
		<nav ref={navRef} className={styles.nav} aria-label="Site navigation">
			<button className={styles.brandWrapper} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
				<img src="/logo.png" alt="Tenora Chorale" className={styles.navLogo} />
			</button>
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
