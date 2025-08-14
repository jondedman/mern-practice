import { useState } from 'react';
// import ReactDOM from 'react-dom/client';

function PostForm({onPostCreated}) {
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
    // event.preventDefault();
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
        onPostCreated();

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
    <form onSubmit={handleSubmit} className='m-4 max-w- mx-auto space-y-4'>
        <textarea 
            type="text" 
            name="message" 
            value={message || ""} 
            onChange={handleChange}
            placeholder="What's on your mind?"
            rows="4"
            className="textarea textarea-bordered rounded-xl w-[800px] "
        />
        <div className="flex justify-end mt-4">
        <input type="submit"
        className="btn bg-red-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-black ..."/>
        </div>
    </form>
    )
}
export default PostForm;