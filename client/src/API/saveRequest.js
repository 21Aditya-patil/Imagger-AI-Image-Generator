import { apiUrl, readErrorMessage } from "./config";

export const saveImg = async (data, token) => {
  const response = await fetch(apiUrl("/api/image/save"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, `Save failed: ${response.status}`));
  }

  return response.json()
};

export const getImg = async (token) => {
  const response = await fetch(apiUrl("/api/image/"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, `Get failed: ${response.status}`));
  }

  return response.json()
};

export const deleteImg = async (imageId, token) => {
  const response = await fetch(apiUrl(`/api/image/delete/${imageId}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response, `Delete failed: ${response.status}`));
  }

  return response.json()
};
