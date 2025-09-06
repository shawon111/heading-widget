import React from "react";
import type { HeadlineSettings } from "./HeadlineWidget";


interface Props {
    settings: HeadlineSettings;
    setSettings: React.Dispatch<React.SetStateAction<HeadlineSettings>>;
    fontFamilies: Record<string, string>
}

const HeadlineEditor: React.FC<Props> = ({ settings, setSettings, fontFamilies }) => {
    const handleSettingsExport = () => {
        // prepare json
        const fontFamily = fontFamilies[settings.fontFamily]
        const updatedSettings:HeadlineSettings = {
            ...settings,
            fontFamily
        }
        const createJson = JSON.stringify(updatedSettings, null, 2);
        const blob = new Blob([createJson], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        // handle download
        const link = document.createElement("a");
        link.href = url;
        link.download = "headline-widget";
        link.click();

        URL.revokeObjectURL(url);
    }
    return (
        <div className="w-full lg:w-96 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2">Edit Headline</h2>
            {/* Text */}
            <input
                type="text"
                value={settings.text}
                onChange={(e) => setSettings({ ...settings, text: e.target.value })}
                className="border rounded-lg p-2 w-full"
                placeholder="Enter headline text"
            />
            {/* Font Size */}
            <label className="text-sm font-medium">Font Size (px)</label>
            <input
                type="number"
                min={8}
                max={200}
                value={settings.fontSize}
                onChange={(e) =>
                    setSettings({ ...settings, fontSize: parseInt(e.target.value) || settings.fontSize })
                }
                className="border rounded-lg p-2 w-full"
            />
            {/* Font Familky */}
            <label className="text-sm font-medium">Font Family</label>
            <select
                value={settings.fontFamily}
                onChange={(e) =>
                    setSettings({ ...settings, fontFamily: e.target.value })
                }
                className="border rounded-lg p-2 w-full"
            >
                {
                    Object.entries(fontFamilies).map(([item, value]) => {
                        return <option value={item} key={value}>{item}</option>
                    })
                }
            </select>
            {/* Font Weight */}
            <label className="text-sm font-medium">Font Weight</label>
            <select
                value={settings.fontWeight}
                onChange={(e) =>
                    setSettings({ ...settings, fontWeight: parseInt(e.target.value) })
                }
                className="border rounded-lg p-2 w-full"
            >
                <option value={400}>Normal</option>
                <option value={600}>Semi Bold</option>
                <option value={700}>Bold</option>
                <option value={900}>Extra Bold</option>
            </select>
            {/* Text Color */}
            <label className="text-sm font-medium">Text Color</label>
            <input
                type="color"
                value={settings.textColor}
                onChange={(e) =>
                    setSettings({ ...settings, textColor: e.target.value })
                }
                className="w-full h-10 rounded"
            />
            {/* Gradient Toggle */}
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={settings.gradient}
                    onChange={(e) =>
                        setSettings({ ...settings, gradient: e.target.checked })
                    }
                />
                Enable Gradient
            </label>
            {settings.gradient && (
                <>
                    <label className="text-sm font-medium">Direction</label>
                    <select
                        value={settings.gradientDirection}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                gradientDirection: e.target.value as any,
                            })
                        }
                        className="border rounded-lg p-2 w-full"
                    >
                        <option value="to-r">→ Right</option>
                        <option value="to-l">← Left</option>
                        <option value="to-t">↑ Up</option>
                        <option value="to-b">↓ Down</option>
                    </select>
                    <div className="flex gap-2">
                        <div className="w-full">
                            <label className="text-sm font-medium">From</label>
                            <input
                                type="color"
                                value={settings.gradientFrom}
                                onChange={(e) =>
                                    setSettings({ ...settings, gradientFrom: e.target.value })
                                }
                                className="w-full h-10 rounded"
                            />
                        </div>
                        <div className="w-full">
                            <label className="text-sm font-medium">To</label>
                            <input
                                type="color"
                                value={settings.gradientTo}
                                onChange={(e) =>
                                    setSettings({ ...settings, gradientTo: e.target.value })
                                }
                                className="w-full h-10 rounded"
                            />
                        </div>
                    </div>
                </>
            )}
            {/* Effects */}
            <h3 className="text-sm font-semibold mt-4">Effects</h3>
            {Object.entries(settings.effects).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                effects: { ...settings.effects, [key]: e.target.checked },
                            })
                        }
                    />
                    {key}
                </label>
            ))}
            {/* Export */}
            <button
                onClick={() => handleSettingsExport()}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
                Export JSON
            </button>
        </div>
    )
}

export default HeadlineEditor;