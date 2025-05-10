import { GoogleGenAI, Modality } from "@google/genai";

main();
async function main() {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const name = "George Washington";
    const description = "led the American Revolution against colonial rule.";
    const contents = `Generate an extreme low poly action shot of ${name} who ${description}.`;
    
    // Set responseModalities to include "Image" so the model can generate  an image
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: contents,
        config: {
            responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
    });
    
    // Check if response and candidates exist before accessing
    if (!response || !response.candidates || response.candidates.length === 0) {
        console.error("No response received from the model");
        return;
    }

    const candidate = response.candidates[0];
    if (!candidate || !candidate.content) {
        console.error("No content in the response candidate");
        return;
    }
    
    for (const part of candidate.content.parts ?? []) {
        // Based on the part type, either show the text or save the image
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            const imageData = part.inlineData.data;
            // Check if imageData exists before creating buffer
            if (imageData) {
                const buffer = Buffer.from(imageData, "base64");
                await Bun.write(`generated/${name}.png`, buffer);
                console.log(`Image saved as ${name}.png`);
            } else {
                console.error("No image data received");
            }
        }
    }
}

main();