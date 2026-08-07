import type { UserInputs, WishesResult } from './generator';


export async function generateWishesWithGemini(inputs: UserInputs, apiKey: string): Promise<WishesResult> {
  const model = 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const prompt = `
You are a creative Christmas writer. Write personalized Christmas wishes and recommendations based on the following user details:
- Name: ${inputs.name} ${inputs.nickname ? `(Nickname: ${inputs.nickname})` : ''}
- Age: ${inputs.age} (Category: ${inputs.gender})
- Relationship: ${inputs.relationship}
- Primary Language: ${inputs.language}
- Requested Mood: ${inputs.mood}
${inputs.occupation ? `- Occupation: ${inputs.occupation}` : ''}
${inputs.country ? `- Country: ${inputs.country}` : ''}
${inputs.favoriteMemory ? `- Favorite Memory: ${inputs.favoriteMemory}` : ''}
${inputs.favoriteActivity ? `- Favorite Activity: ${inputs.favoriteActivity}` : ''}
${inputs.favoriteCharacter ? `- Favorite Character: ${inputs.favoriteCharacter}` : ''}
${inputs.favoriteColor ? `- Favorite Color: ${inputs.favoriteColor}` : ''}
${inputs.keywords ? `- Keywords to include: ${inputs.keywords}` : ''}

You must return a JSON object containing exactly the following 15 keys. Do not return any other text, markdown formatting, or wrappers (e.g. no \`\`\`json). Return a raw JSON string.

Keys and requirements:
1. "main": The primary personalized Christmas wish. Must respect the language and mood.
2. "emotional": A deeply touching, emotional, and loving wish reflecting their relationship.
3. "funny": A humorous, playful Christmas message that will make them laugh.
4. "inspirational": An uplifting wish encouraging them for the upcoming year.
5. "religious": A faithful wish celebrating the birth of Jesus (blessings, peace, grace).
6. "whatsapp": A short, emoji-rich WhatsApp status update.
7. "instagram": A creative Instagram caption with popular hashtags.
8. "twitter": A punchy, engaging X (Twitter) post (under 280 characters).
9. "linkedin": A professional, warm Christmas greeting suitable for business contacts.
10. "short": A simple one-sentence greeting (e.g., card-sized).
11. "quote": A beautiful, original or classical Christmas quote customized for them.
12. "santa": A whimsical, voice-acted letter from Santa Claus to them.
13. "gift": A customized gift suggestion item with a 1-sentence explanation of why it fits them.
14. "movie": A Christmas movie recommendation with a 1-sentence reason why they will enjoy it.
15. "song": A festive Christmas song recommendation with a 1-sentence reason why it matches their mood.

Be creative, natural, warm, and avoid generic or repetitive phrasing.
`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData?.error?.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) {
      throw new Error('Empty response from Gemini API.');
    }

    // Clean JSON response (just in case model returned markdown fences)
    const cleanedText = text.trim().replace(/^```json/, '').replace(/```$/, '').trim();
    const result = JSON.parse(cleanedText) as WishesResult;
    return result;
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}
