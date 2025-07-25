import { GoogleGenerativeAI } from "@google/generative-ai";

// For Create React App, environment variables must start with REACT_APP_ and are available via import.meta.env in Vite or process.env in CRA.
// If using Vite:
const apiKey = import.meta.env.VITE_GENAI_API_KEY as string;

// If using Create React App, uncomment the following line and comment out the above line:
// const apiKey = process.env.REACT_APP_GENAI_API_KEY as string;

const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `You are Praxis AI, an advanced assistant...`; // Add your full instruction here

export async function getPraxisResponse(userInput: string, history: any[] = []) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const chatSession = model.startChat({
    history,
    systemInstruction: {
      role: "model",
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {}
  });

  const result = await chatSession.sendMessage([{ text: userInput }]);
  return result.response.text();
}