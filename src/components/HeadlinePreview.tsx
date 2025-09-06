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

    // render styled texts
    const renderStyledText = () => {
    // Split text into words and preserve spaces
    const words = text.split(/(\s+)/);

    return words.map((word, wordIndex) => {
        // If it's a space, render it as-is
        if (/\s+/.test(word)) {
            return <span key={`space-${wordIndex}`}>{word}</span>;
        }

        // Find if word has styles
        const styledWord = settings.styledWords.find(sw => sw.text === word.toLowerCase().trim());
        const wordClassName = `
            inline-block
            ${styledWord?.highlight ? 'bg-yellow-200' : ''}
            ${styledWord?.underline ? 'underline decoration-2' : ''}
            ${styledWord?.block ? 'bg-gray-200 px-2 py-1 rounded-lg' : ''}
        `;

        if (effects.perLetter) {
            return (
                <span key={`word-${wordIndex}`} className={wordClassName}>
                    {word.split('').map((char, charIndex) => (
                        <motion.span
                            key={`${wordIndex}-${charIndex}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                delay: (wordIndex * word.length + charIndex) * 0.05,
                                duration: 0.3
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            );
        }

        // Return word with or without styles
        return (
            <span
                key={`word-${wordIndex}`}
                className={wordClassName}
            >
                {word}
            </span>
        );
    });
};
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
                {renderStyledText()}
            </motion.h1>
        </div>
    );
};

export default HeadlinePreview;
