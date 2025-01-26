import React from 'react';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import { wrap } from '@motionone/utils';
import '../styles/Scrollbanner.css'; // Import your custom CSS file

// ParallaxText component for the scrolling text
function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((time, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (17 / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        {[...Array(13)].map((_, index) => (
          <span key={index}>{children}</span>
        ))}
      </motion.div>
    </div>
  );
}

// Main ScrollerBanner component
export default function ScrollerBanner() {
  return (
    <div className="scroller-banner">
      <ParallaxText baseVelocity={1}>
       Something cool about RapidBot
      </ParallaxText>
    </div>
  );
}
