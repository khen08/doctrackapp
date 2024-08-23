"use client";
import { motion, useInView, Variants } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

type PresetType = "blur" | "shake" | "scale" | "fade" | "slide";

type TextEffectProps = {
  children: React.ReactNode;
  per?: "word" | "char";
  as?: keyof JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
    },
  },
  shake: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 0 },
      visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
  },
};

const AnimationComponent: React.FC<{
  word: React.ReactNode;
  variants: Variants;
  per: "word" | "char";
}> = React.memo(({ word, variants, per }) => {
  if (typeof word === "string" && per === "char") {
    return (
      <span className="inline-block whitespace-pre">
        {word.split("").map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden="true"
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      variants={variants}
      className="inline-block whitespace-pre"
    >
      {word}
    </motion.span>
  );
});

AnimationComponent.displayName = "AnimationComponent";

export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset,
}: TextEffectProps) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const inView = useInView(ref, { once: false });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  const MotionTag = motion[as as keyof typeof motion];
  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  const words = React.Children.toArray(children).map((child, index) =>
    typeof child === "string"
      ? child
          .split(/(\S+)/)
          .map((word, i) => (
            <AnimationComponent
              key={`word-${index}-${i}`}
              word={word}
              variants={itemVariants}
              per={per}
            />
          ))
      : child
  );

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      <MotionTag
        aria-label={typeof children === "string" ? children : undefined}
        variants={containerVariants}
        className={className}
        animate={isInView ? "visible" : "hidden"}
        initial="hidden"
      >
        {words}
      </MotionTag>
    </motion.span>
  );
}
