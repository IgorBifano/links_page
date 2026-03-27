export const motionEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: motionEase,
      delay
    }
  })
};
