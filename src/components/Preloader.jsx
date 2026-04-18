import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Preloader.module.css";

export default function Preloader({ onComplete }) {
	const containerRef = useRef(null);

	useEffect(() => {
		const tl = gsap.timeline({
			onComplete: () => {
				if (onComplete) onComplete();
			},
		});

		tl.to(".preloader-text", {
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power3.out",
		})
			.to(".preloader-text", {
				opacity: 0,
				y: -20,
				duration: 0.8,
				ease: "power3.in",
				delay: 0.5,
			})
			.to(containerRef.current, {
				yPercent: -100,
				duration: 1.2,
				ease: "expo.inOut",
			});

		return () => tl.kill();
	}, [onComplete]);

	return (
		<div ref={containerRef} className={styles.preloader}>
			<div className={`${styles.text} preloader-text`}>WELCOME</div>
		</div>
	);
}
