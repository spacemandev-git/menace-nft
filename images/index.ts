import { GoogleGenAI, Modality } from "@google/genai";
type Menace =
| {
    "Name": string;
    "Field/Area": string;
    "Reason for being a 'Positive Menace'": string;
    "Reason for being a 'Negative Menace' (but historically boundary-pushing in a destructive way)"?: undefined;
}
| {
    "Name": string;
    "Field/Area": string;
    "Reason for being a 'Positive Menace'"?: undefined;
    "Reason for being a 'Negative Menace' (but historically boundary-pushing in a destructive way)": string;
};

main();
async function main() {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const menaces = await Bun.file("../src/lib/m2.json").json() as Menace[];
    
    for (const menace of menaces) {
        const name = menace["Name"];
        const description = menace["Reason for being a 'Positive Menace'"] || menace["Reason for being a 'Negative Menace' (but historically boundary-pushing in a destructive way)"];
        const contents = `Generate an extreme low poly action shot of ${name} who ${description}.`;
        
        if(await Bun.file(`generated/${name}.png`).exists()) {
            console.log(`Skipping ${name} because it already exists`);
            continue;
        }

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
}

main();