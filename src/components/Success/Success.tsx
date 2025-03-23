import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import "./Success.css";

export default function Success() {
  const headingRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline();

    const headingSplit = new SplitType(headingRef.current!, {
      types: "words,chars",
    });

    tl.from(
      headingSplit.chars,
      {
        autoAlpha: 0,
        yPercent: -100,
        duration: 1,
        ease: "power4.out",
        stagger: {
          each: 0.05,
          from: "random",
        },
      },
      "<"
    );
  }, []);
  return (
    <div className="success">
      <h2 className="success__message" ref={headingRef}>
        Thank you for your submission!
      </h2>
    </div>
  );
}
