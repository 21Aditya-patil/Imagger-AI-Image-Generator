const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const generateImage = async (data) => {
  const token = localStorage.getItem("token");  
  const res = await fetch(`${API_URL}/api/generate`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
     },
    
    body: JSON.stringify({ prompt: data.prompt, style: data.style }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API error: ${res.status} - ${error}`);
  }

  const result = await res.json();

  if (!result.image) {
    throw new Error("No image URL in response");
  }

  return result.image;
};