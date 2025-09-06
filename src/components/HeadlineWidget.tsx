import React, { useState } from "react";
import { motion } from "framer-motion";
import HeadlinePreview from "./HeadlinePreview";


export interface HeadlineSettings {
    text: string;
    fontSize: number;
    textColor: string;
    fontFamily: string;
    fontWeight: number;
    gradient: boolean;
    gradientDirection: "to-r" | "to-l" | "to-t" | "to-b";
    gradientFrom: string;
    gradientTo: string;
    effects: {
        fadeIn: boolean;
        hoverGlow: boolean;
        perLetter: boolean;
        shadow: boolean;
    };
}


const HeadlineWidget: React.FC = () => {
    const [settings, setSettings] = useState<HeadlineSettings>({
        text: "Your Awesome Headline",
        fontSize: 48,
        textColor: "#000000",
        fontFamily: "sans-serif",
        fontWeight: 700,
        gradient: false,
        gradientDirection: "to-r",
        gradientFrom: "#4f46e5",
        gradientTo: "#ec4899",
        effects: {
            fadeIn: true,
            hoverGlow: false,
            perLetter: false,
            shadow: false,
        },
    });


    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 w-full">
            <HeadlinePreview settings={settings} />
        </div>
    );
};


export default HeadlineWidget;