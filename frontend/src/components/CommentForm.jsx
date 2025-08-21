import { useState } from "react";

function CommentForm({post_id, token, onCommentCreated}) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedText = text.trim();

    if (!trimmedText) {
      setError("Comment cannot be empty.");
      return;
    }


try {
  const response = await fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text: trimmedText, post_id: post_id })
  });

  if (response.ok) {
    setText("");
    setError("");
    onCommentCreated()
  } else {
    setError("Failed to create comment.");
  }
} catch (error) {
  setError("An error occurred while creating the comment.");
}

  }

return (
<form onSubmit={handleSubmit}>
<textarea
name="text"
value={text}
onChange={handleChange}
placeholder="comment...if you dare"
rows="2"
className="textarea textarea-bordered rounded-xl w-full"
/>
{error && (
<div className="text-red-500 text-sm font-medium">
{error}
</div>
)}
<div className="flex justify-end mt-2">
<input
type="submit"
value="Comment"
className="p-2 rounded-md font-bold bg-blue-500 shadow-md transition hover:bg-black hover:text-blue-500"
/>
</div>
</form>
);

}

export default CommentForm;