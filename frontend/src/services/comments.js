// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getComments(token, post_id) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const url =
post_id
? `${BACKEND_URL}/comments?post_id=${post_id}`
: `${BACKEND_URL}/comments`;

  const response = await fetch(url, requestOptions);

  if (response.status !== 200) {
    throw new Error("Unable to fetch comments");
  }

  const data = await response.json();
  return data;
}

// export async function getComments(token, post_id) {
// const requestOptions = {
// method: "GET",
// headers: {
// Authorization: `Bearer ${token}`,
// },
// };

// // Add post_id as a query parameter if provided
// const url =
// post_id
// ? `${BACKEND_URL}/comments?post_id=${post_id}`
// : `${BACKEND_URL}/comments`;

// const response = await fetch(url, requestOptions);

// if (response.status !== 200) {
// throw new Error("Unable to fetch comments");
// }

// const data = await response.json();
// return data;
// }