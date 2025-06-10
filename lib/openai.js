/**
 * Generate analysis using OpenAI API
 * @param {Object} data - The water usage data
 * @returns {Promise<Object>} - The analysis results
 */
export async function generateAnalysis(data) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `Sen Konya'daki su kullanıcıları için su tasarrufu konusunda uzman bir analistsin. 
            Kullanıcıların su tüketim verilerini analiz ederek detaylı analiz ve kişiselleştirilmiş öneriler sunuyorsun.
            Analizin şunları içermeli: su kullanım puanı (0-100, düşük daha iyi), günlük toplam tüketim (litre), 
            alışkanlıkları hakkında özel içgörüler ve uygulanabilir öneriler.
            Yanıtını aşağıdaki yapıda bir JSON nesnesi olarak formatla:
            {
              "waterUsageScore": number,
              "totalLitersPerDay": number,
              "insights": string[],
              "recommendations": string[],
              "comparison": {
                "user": number,
                "cityAverage": number,
                "recommended": number
              },
              "breakdown": [
                {
                  "category": string,
                  "percentage": number,
                  "liters": number
                }
              ]
            }`,
          },
          {
            role: "user",
            content: `Konya'da yaşayan bir kullanıcının su kullanım verilerini analiz et: ${JSON.stringify(data)}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    const result = await response.json()

    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error("OpenAI API'den geçersiz yanıt")
    }

    // Parse the JSON response from OpenAI
    const analysisText = result.choices[0].message.content
    const analysis = JSON.parse(analysisText)

    return analysis
  } catch (error) {
    console.error("OpenAI ile analiz oluşturulurken hata: ", error)

    // Return mock data if OpenAI API fails
    return {
      waterUsageScore: 65,
      totalLitersPerDay: 142,
      insights: [
        "Duş süreniz önerilen 5 dakikadan daha uzun",
        "Bulaşık makinesi kullanımınız verimli",
        "Yaz ayları dışında bahçe sulama sıklığını azaltmayı düşünün",
      ],
      recommendations: [
        "Duş süresini 5 dakika azaltarak günde yaklaşık 50 litre tasarruf edin",
        "Diş fırçalama sırasında tüketimi azaltmak için su tasarruflu musluklar takın",
        "Mümkün olduğunda bahçe sulaması için yağmur suyu toplayın",
      ],
      comparison: {
        user: 142,
        cityAverage: 165,
        recommended: 100,
      },
      breakdown: [
        { category: "Duş", percentage: 40, liters: 57 },
        { category: "Bulaşık Makinesi", percentage: 15, liters: 21 },
        { category: "Çamaşır Makinesi", percentage: 20, liters: 28 },
        { category: "Bahçe", percentage: 15, liters: 21 },
        { category: "Diğer", percentage: 10, liters: 14 },
      ],
    }
  }
}
