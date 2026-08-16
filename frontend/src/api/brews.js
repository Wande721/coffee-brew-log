// All requests go through here. In dev, Vite's proxy (vite.config.js)
// forwards "/api/..." to the Express server. In production, VITE_API_URL
// can point directly at wherever the backend is deployed.
const BASE_URL = `${import.meta.env.VITE_API_URL || ''}/api/brews`;

async function handleResponse(res) {
  if (res.status === 204) return null; // DELETE returns no body

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message = data?.errors?.join(', ') || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export async function fetchBrews(method) {
  const url = method ? `${BASE_URL}?method=${encodeURIComponent(method)}` : BASE_URL;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function createBrew(brew) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brew),
  });
  return handleResponse(res);
}

export async function updateBrew(id, brew) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brew),
  });
  return handleResponse(res);
}

export async function deleteBrew(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}