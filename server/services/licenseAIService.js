import { GoogleGenAI } from "@google/genai"

const ai =new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

export const verifyLicenseWithAI = async({
    ocrText,
    registeredLicenseNumber,
    registeredPharmacyName,
    registeredOwnerName
})=>{
    const prompt =`
    you are a pharmacy license verification assistant.
    verify the OCR extracted pharmacy license information against the 
    registered pharmacy information.
    Registered Information:
    License Number:${registeredLicenseNumber}
    Pharmacy Name :${registeredPharmacyName}
    Owner Name: ${registeredOwnerName}
    
    OCR Extracted TEXT:
    ${ocrText}
    
    Check:
1. License number match
2. Pharmacy name match
3. Owner name match if available
4. Whether the document appears to be a pharmacy license
5. Any suspicious or inconsistent information

Return ONLY valid JSON in this format:

{
    "status": "verified",
    "confidence": 0,
    "licenseNumber": "",
    "pharmacyName": "",
    "ownerName": "",
    "reason": ""
}

Rules:
- status must be one of: verified, suspicious, failed
- confidence must be between 0 and 100
- Do not assume missing information is correct.
- If important information does not match, use suspicious or failed.
- This is an AI-assisted verification result. A human admin must make the final approval decision.
- Verify the information based on the OCR text.
- Do NOT reject a document only because it says mock, test, sample, or synthetic.
- Compare the extracted license number with the registered license number.
- Compare the extracted pharmacy name with the registered pharmacy name.
- Compare the extracted owner name with the registered owner name.
- If all important fields match, return "verified".
- If important fields are missing, return "failed".
- If fields are present but inconsistent, return "suspicious".
- This is AI-assisted verification. Final approval must always be done by an admin.

`
  const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
            temperature: 0,
            responseMimeType: 'application/json'
        }
    })

const result =JSON.parse(response.text)

return result
}