import { useState } from 'react';
// import ReactDOM from 'react-dom/client';

function PostForm({onPostCreated}) {
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setMessage(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const dateTimeString = new Date().toLocaleString("en-GB");
    try {
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // This is the key part
      },

      body: JSON.stringify(
        { message: `${message}, created at ${dateTimeString}`})
    });
    if (response.ok) {
        const newPost = await response.json();

              // Call the function passed from FeedPage
      
        onPostCreated(newPost);
      
        console.log("Post created successfully:", newPost);
        setMessage(""); // Clear the form after successful submission
        // might want to update the posts list here or trigger a re-fetch
      } else {
        console.error("Failed to create post:", response.status);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='m-4'>
      <label>Enter The Message:
        <input 
          type="text" 
          name="message" 
          value={message || ""} 
          onChange={handleChange}
        />
        </label>
        <input type="submit" />
    </form>
  )
}

export default PostForm;