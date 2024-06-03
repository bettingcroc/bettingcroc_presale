import React from 'react';
import { useInView } from 'react-intersection-observer';

const RevealOnScroll = (props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });
  return (
    <div ref={ref} style={props.sens === "left" ? { "marginLeft": inView ? 0 : "100vw", transition: 'margin-left 1s' }:{ "marginRight": inView ? 0 : "100vw", transition: 'margin-right 1s' }}>
      {props.children}
    </div>
  );
};

export default RevealOnScroll;