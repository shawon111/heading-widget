import React, { useState } from "react";
import { motion } from "framer-motion";


export interface HeadlineSettings {
text: string;
fontSize: number;
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
fontFamily: "sans-serif",
fontWeight: 700,
gradient: true,
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

</div>
);
};


export default HeadlineWidget;