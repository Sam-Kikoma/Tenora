import ScrollReveal from "./ScrollReveal";
import styles from "./Footer.module.css";
import { ensemble } from "../data/programme";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<ScrollReveal className={styles.logoReveal}>
				<img src="/logo.png" alt="Tenora Chorale" className={styles.logo} />
			</ScrollReveal>
			<ScrollReveal delay={0.2}>
				<p className={styles.location}>Pécs, Hungary · Est. 2025</p>
				<p className={styles.thanks}>{ensemble.thanks}</p>
				<div className={styles.ornament} aria-hidden="true" />
				<p
					style={{
						marginTop: "2rem",
						fontSize: "0.9rem",
						color: "var(--parchment-dk)",
						opacity: 0.6,
						letterSpacing: "0.05em",
					}}
				>
					Developed by{" "}
					<a
						href="https://www.kikoma.tech"
						target="_blank"
						rel="noopener noreferrer"
						style={{ color: "var(--parchment)", textDecoration: "underline", fontWeight: 400, opacity: 0.9 }}
					>
						Kikoma
					</a>
				</p>
			</ScrollReveal>
		</footer>
	);
}
