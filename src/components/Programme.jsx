import PieceCard from "./PieceCard";
import ScrollReveal from "./ScrollReveal";
import styles from "./Programme.module.css";
import { partOne, partTwo, interlude, finalReflection } from "../data/programme";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitType from "split-type";

function PartDivider({ label }) {
	return (
		<ScrollReveal>
			<div className={styles.partDivider}>
				<div className={styles.dividerLine} />
				<span className={styles.dividerLabel}>{label}</span>
				<div className={`${styles.dividerLine} ${styles.dividerLineRev}`} />
			</div>
		</ScrollReveal>
	);
}

function Interlude() {
	return (
		<ScrollReveal>
			<div className={styles.interlude}>
				<p className={styles.interludeLabel}>Piano Interlude</p>
				<p className={styles.interludePianist}>{interlude.pianist}</p>
				<p className={styles.interludePieces}>
					{interlude.pieces.map((p, i) => (
						<span key={p.title}>
							<em>{p.title}</em> — {p.composer}
							{i < interlude.pieces.length - 1 && <span className={styles.dot}> · </span>}
						</span>
					))}
				</p>
				<p className={styles.interludeNote}>{interlude.note}</p>
			</div>
		</ScrollReveal>
	);
}

export default function Programme() {
	const containerRef = useRef(null);

	useGSAP(
		() => {
			const text = new SplitType(".prog-title-split", { types: "chars" });

			gsap.from(text.chars, {
				opacity: 0,
				y: 40,
				rotationX: -40,
				stagger: 0.05,
				duration: 1.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 85%",
				},
			});

			return () => {
				text.revert();
			};
		},
		{ scope: containerRef },
	);

	return (
		<section id="programme" ref={containerRef} className={styles.section} aria-labelledby="prog-title">
			<div className={styles.inner}>
				<ScrollReveal>
					<header className={styles.sectionHeader}>
						<p className={styles.eyebrow}>Evening Programme</p>
						<h2 id="prog-title" className={`${styles.sectionTitle} prog-title-split`} style={{ perspective: "1000px" }}>
							The Concert
						</h2>
						<div className={styles.sectionRule} />
					</header>
				</ScrollReveal>

				<PartDivider label="Part One" />
				{partOne.map((piece) => (
					<PieceCard key={piece.id} piece={piece} />
				))}
				<Interlude />

				<PartDivider label="Part Two" />
				{partTwo.map((piece) => (
					<PieceCard key={piece.id} piece={piece} />
				))}

				<ScrollReveal>
					<blockquote className={styles.reflection}>
						<p>{finalReflection}</p>
					</blockquote>
				</ScrollReveal>
			</div>
		</section>
	);
}
