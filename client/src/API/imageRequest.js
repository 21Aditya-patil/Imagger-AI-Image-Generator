import { apiUrl, readErrorMessage } from "./config";

export const generateImage = async (data) => {
  const token = localStorage.getItem("token");  
  const res = await fetch(apiUrl("/api/generate"), {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
     },
    
    body: JSON.stringify({ prompt: data.prompt, style: data.style }),
  });

  if (!res.ok) {
    throw new Error(await readErrorMessage(res, `API error: ${res.status}`));
  }

  const result = await res.json();

  if (!result.image) {
    throw new Error("No image URL in response");
  }

  return result.image;
};
