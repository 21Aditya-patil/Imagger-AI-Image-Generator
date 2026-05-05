const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const saveImg = async (data, token) => {
  const response = await fetch(`${BASE_URL}/api/image/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Save failed: ${response.status} - ${error}`);
  }

  return response.json()
};

export const getImg = async (token) => {
  const response = await fetch(`${BASE_URL}/api/image/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Get failed: ${response.status} - ${error}`);
  }

  return response.json()
};

export const deleteImg = async (imageId, token) => {
  const response = await fetch(`${BASE_URL}/api/image/delete/${imageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Delete failed: ${response.status} - ${error}`);
  }

  return response.json()
};
