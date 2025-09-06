import React from "react";
import { motion } from "framer-motion";
import type { HeadlineSettings } from "./HeadlineWidget";

interface Props {
    settings: HeadlineSettings;
    fontFamilies: Record<string, string>
}

const HeadlinePreview: React.FC<Props> = ({ settings, fontFamilies }) => {
    const {
        text,
        fontSize,
        textColor,
        fontFamily,
        fontWeight,
        gradient,
        gradientDirection,
        gradientFrom,
        gradientTo,
        effects,
    } = settings;

    // build gradient style
    const gradientStyle = gradient
        ? {
            backgroundImage: `linear-gradient(${gradientDirection === "to-r"
                ? "to right"
                : gradientDirection === "to-l"
                    ? "to left"
                    : gradientDirection === "to-t"
                        ? "to top"
                        : "to bottom"
                }, ${gradientFrom}, ${gradientTo})`,
            WebkitBackgroundClip: "text",
            color: "transparent"
        }
        : {};

    return (
        <div className="flex-1 flex items-center justify-center bg-gray-100 rounded-2xl px-6 py-8 lg:py-16 shadow-inner h-[fit-content]">
            <motion.h1
                initial={effects.fadeIn ? { opacity: 0, y: 20 } : false}
                animate={effects.fadeIn ? { opacity: 1, y: 0 } : {}}
                whileHover={effects.hoverGlow ? {
                    textShadow: `
                    0 0 64px ${gradientFrom},
                    0 0 128px ${gradientTo}`,
                    scale: 1.05,
                } : {}}
                transition={{ duration: 0.6 }}
                style={{
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamilies[fontFamily],
                    fontWeight,
                    ...(gradient ? gradientStyle : { color: textColor }),
                }}
                className={`text-center  ${effects.shadow ? "drop-shadow-lg" : ""
                    }`}
            >
                {effects.perLetter
                    ? text.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            {char}
                        </motion.span>
                    ))
                    : text}
            </motion.h1>
        </div>
    );
};

export default HeadlinePreview;
