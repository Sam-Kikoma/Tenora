import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal({ children, className = "", delay = 0, y = 40 }) {
	const ref = useRef(null);

	useGSAP(
		() => {
			gsap.fromTo(
				ref.current,
				{ opacity: 0, y, scale: 0.95, filter: "blur(10px)" },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					filter: "blur(0px)",
					duration: 1.4,
					delay,
					ease: "power3.out",
					scrollTrigger: {
						trigger: ref.current,
						start: "top 90%",
						toggleActions: "play none none reverse",
					},
				},
			);
		},
		{ scope: ref },
	);

	return (
		<div
			ref={ref}
			className={className}
			style={{ opacity: 0, transformOrigin: "top center", willChange: "transform, opacity, filter" }}
		>
			{children}
		</div>
	);
}
