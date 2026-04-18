import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }) {
	const containerRef = useRef(null);
	const textRef = useRef(null);

	useEffect(() => {
		const text = new SplitType(textRef.current, { types: "chars" });

		const tl = gsap.timeline({
			onComplete: () => {
				if (onComplete) onComplete();
				text.revert();
			},
		});

		tl.to(
			".preloader-counter",
			{
				innerHTML: 100,
				duration: 2.2 /* Slightly longer hold to appreciate the count */,
				snap: { innerHTML: 1 },
				ease: "power2.inOut",
			},
			0,
		)
			.fromTo(
				text.chars,
				{ y: 100, opacity: 0, rotationX: -15, filter: "blur(10px)" } /* Premium awwwards entrance */,
				{ y: 0, opacity: 1, rotationX: 0, filter: "blur(0px)", duration: 1.4, stagger: 0.08, ease: "power4.out" },
				0.2,
			)
			.to(
				text.chars,
				{ y: -80, opacity: 0, duration: 0.8, stagger: 0.04, ease: "power3.in", filter: "blur(5px)" },
				">0.5",
			)
			.to(".preloader-counter-container", { opacity: 0, duration: 0.5, y: 10 }, "<")
			.to(containerRef.current, {
				yPercent: -100,
				duration: 1.4,
				ease: "expo.inOut",
			});

		return () => {
			tl.kill();
			if (text) text.revert();
		};
	}, [onComplete]);

	return (
		<div ref={containerRef} className={styles.preloader}>
			<div className={styles.textWrapper}>
				<div ref={textRef} className={`${styles.text} preloader-text`}>
					WELCOME
				</div>
			</div>
			<div className={`${styles.counter} preloader-counter-container`}>
				<span className="preloader-counter">0</span>
				<span className={styles.percent}>%</span>
			</div>
		</div>
	);
}
