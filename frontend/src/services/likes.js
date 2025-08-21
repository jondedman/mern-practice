const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getLikes(token) {
  const res = await fetch(`${BACKEND_URL}/likes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch likes");

  return res.json();
}

export async function createLike(token, post_id) {
  console.log("Sending token:", token); 

  const res = await fetch(`${BACKEND_URL}/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ post_id }),
  });

  if (!res.ok) throw new Error("Failed to like post");

  console.log("Sending POST to /likes with:", { post_id });

  return res.json();
}

export async function deleteLike(token, post_id) {
  const res = await fetch(`${BACKEND_URL}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ post_id }),
  });

  if (!res.ok) throw new Error("Failed to unlike post");

  return res.json();
}

