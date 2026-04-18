import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./CustomCursor.module.css";

export default function CustomCursor({ isDesktop = true }) {
	const dotRef = useRef(null);

	useEffect(() => {
		if (!isDesktop) return;

		const dot = dotRef.current;

		const xTo = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3" });
		const yTo = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3" });

		const handleMouseMove = (e) => {
			xTo(e.clientX - 8);
			yTo(e.clientY - 8);
		};

		window.addEventListener("mousemove", handleMouseMove);

		const handleMouseOver = (e) => {
			const tag = e.target.tagName.toLowerCase();
			if (
				tag === "a" ||
				tag === "button" ||
				e.target.closest("a") ||
				e.target.closest("button") ||
				e.target.closest("[role='button']") ||
				e.target.style.cursor === "pointer"
			) {
				gsap.to(dot, { scale: 3.5, backgroundColor: "var(--color-accent-light)", opacity: 0.4, duration: 0.2 });
			}
		};

		const handleMouseOut = () => {
			gsap.to(dot, { scale: 1, backgroundColor: "var(--color-accent)", opacity: 0.8, duration: 0.2 });
		};

		window.addEventListener("mouseover", handleMouseOver);
		window.addEventListener("mouseout", handleMouseOut);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseover", handleMouseOver);
			window.removeEventListener("mouseout", handleMouseOut);
		};
	}, [isDesktop]);

	if (!isDesktop) return null;

	return (
		<>
			<div ref={dotRef} className={styles.dot} />
		</>
	);
}
