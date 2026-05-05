const STYLE_PROMPTS = {
  anime: "anime style, vibrant colors, cel-shaded, sharp outlines, expressive eyes, Japanese animation aesthetic, studio ghibli inspired",
  "3D": "3D rendered, octane render, cinematic lighting, photorealistic textures, volumetric lighting, high detail, Blender 3D, CGI quality",
  pixar: "Pixar animation style, colorful, soft lighting, rounded shapes, family friendly, high quality 3D cartoon, Disney Pixar movie still",
  realistic: "ultra photorealistic, 8k resolution, DSLR photo, natural lighting, hyperdetailed, sharp focus, professional photography",
};

export const generateFromAI = async (prompt, style) => {
  const styleDescription = STYLE_PROMPTS[style] || "";
  const fullPrompt = styleDescription
    ? `${prompt}, ${styleDescription}`
    : prompt;

  const form = new FormData();
  form.append("prompt", fullPrompt);
  form.append("output_format", "jpeg");

  const response = await fetch(
    "https://api.stability.ai/v2beta/stable-image/generate/core",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
        "Accept": "image/*",
      },
      body: form,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Generation failed: ${text}`);
  }

  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:image/jpeg;base64,${base64}`;
};