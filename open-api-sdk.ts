import { z } from 'zod';
import OpenAi from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';

// chnage it to your own schema
const schema = z.object({
    primary_keywords: z.object({
        kannada: z.array(z.string()),
    }),
    secondary_keywords: z.object({
        kannada: z.array(z.string()),
    }),
    mostly_searched_words: z.object({
        kannada: z.array(z.string()),
    }),
});

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateKeyWords(text) {
    const prompt = ``;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: prompt,
                }
            ],
            response_format: zodResponseFormat(schema, 'event'),
            temperature: 0,
        });

        return response.choices[0]?.message?.content || "{}";
    } catch (error) {
        console.error("ChatGPT API Error:", error.response?.data || error.message);
        return "{}";
    }
}
