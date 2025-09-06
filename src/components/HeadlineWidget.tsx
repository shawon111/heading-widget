import React, { useState } from "react";
import HeadlinePreview from "./HeadlinePreview";
import HeadlineEditor from "./HeadlineEditor";


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
        hoverGrow: boolean;
        perLetter: boolean;
        shadow: boolean;
    };
}


const HeadlineWidget: React.FC = () => {
    const fontFamilies: Record<string, string> = {
        Roboto: "'Roboto', sans-serif",
        Poppins: "'Poppins', sans-serif",
        OpenSans: "'Open Sans', sans-serif",
        Inter: "'Inter', sans-serif",
        Lato: "'Lato', sans-serif"
    };
    const [settings, setSettings] = useState<HeadlineSettings>({
        text: "Editable Headline",
        fontSize: 48,
        textColor: "#000000",
        fontFamily: "Roboto",
        fontWeight: 700,
        gradient: true,
        gradientDirection: "to-r",
        gradientFrom: "#4f46e5",
        gradientTo: "#ec4899",
        effects: {
            fadeIn: true,
            hoverGrow: false,
            perLetter: false,
            shadow: false,
        },
    });


    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6 w-full">
            <HeadlinePreview fontFamilies={fontFamilies} settings={settings} />
            <HeadlineEditor fontFamilies={fontFamilies} settings={settings} setSettings={setSettings} />
        </div>
    );
};


export default HeadlineWidget;