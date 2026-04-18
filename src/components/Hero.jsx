import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./Hero.module.css";

export default function Hero({ info }) {
	const heroRef = useRef(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

			tl.fromTo(".hero-logo", { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.2)
				.fromTo(".hero-ornament", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 1.2 }, 0.5)
				.fromTo(".hero-presents", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.8)
				.fromTo(".hero-title", { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 1.1 }, 1.05)
				.fromTo(".hero-theme", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 1.65)
				.fromTo(".hero-tagline", { opacity: 0, y: 14 }, { opacity: 0.8, y: 0, duration: 0.6 }, 1.95)
				.fromTo(".hero-meta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 2.2)
				.fromTo(".hero-rule", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.8 }, 2.65)
				.fromTo(".hero-quote", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 2.85)
				.fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 3.7);
		},
		{ scope: heroRef },
	);

	return (
		<section ref={heroRef} className={styles.hero} aria-labelledby="hero-title">
			<div className={styles.heroBg} aria-hidden="true" />

			<img
				src="/logo.png"
				alt="Tenora Chorale — Voices Rising, Hearts Uniting"
				className={`${styles.logo} hero-logo`}
			/>

			<div className={`${styles.ornament} hero-ornament`} aria-hidden="true" />
			<p className={`${styles.presents} hero-presents`}>Presents</p>

			<h1 id="hero-title" className={`${styles.title} hero-title`}>
				Hope · Resilience
				<br />
				<em>Connection</em>
			</h1>

			<p className={`${styles.theme} hero-theme`}>{info.subtitle}</p>
			<p className={`${styles.tagline} hero-tagline`}>"Voices Rising, Hearts Uniting"</p>

			<div className={`${styles.meta} hero-meta`}>
				{[
					{ label: "Date", value: info.date },
					{ label: "Time", value: info.time },
					{ label: "Venue", value: info.venue },
					{ label: "Admission", value: info.admission },
				].map(({ label, value }) => (
					<div key={label} className={styles.metaItem}>
						<span className={styles.metaLabel}>{label}</span>
						<span className={styles.metaValue}>{value}</span>
					</div>
				))}
			</div>

			<div className={`${styles.rule} hero-rule`} aria-hidden="true" />

			<blockquote className={`${styles.quote} hero-quote`}>
				{info.conductorQuote}
				<cite>
					— {info.conductorName}, {info.conductorTitle}
				</cite>
			</blockquote>

			<div className={`${styles.scrollHint} hero-scroll`} aria-hidden="true">
				<span>Scroll</span>
				<div className={styles.scrollArrow} />
			</div>
		</section>
	);
}
