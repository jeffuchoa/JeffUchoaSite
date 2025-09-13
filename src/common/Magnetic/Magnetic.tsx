import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

interface MagneticProps {
  children: ReactNode;
}

export default function Magnetic({ children }: MagneticProps) {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const xTo = gsap.quickTo(magnetic.current, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(magnetic.current, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const el = magnetic.current;
      if (!el) return;

      const { clientX, clientY } = e;
      const { width, left, top } = el.getBoundingClientRect();

      const x = clientX - (left + width / 2);
      const y = clientY - (top + el.offsetHeight / 2);

      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const el = magnetic.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={magnetic}>{children}</div>;
}