import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import PostForm from "../../components/PostForm";
import ToggleSwitch from "../../components/ToggleSwitch";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [showMine, setShowMine] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  // Function to fetch posts from backend
  const fetchPosts = () => {
    getPosts(token, showMine) // <-- pass toggle state to service
      .then((data) => {
        setPosts(data.posts.reverse());
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  };

  // Fetch posts on mount and whenever toggle changes
  useEffect(() => {
    fetchPosts();
  }, [showMine]); // <-- dependency triggers refetch

  const handlePostCreated = () => {
    fetchPosts(); // refetch posts after creating a new one
  };

  return (
    <>
      <h2>Posts</h2>

      {/* Toggle for “only my posts” */}
      <div style={{ marginBottom: "1rem" }}>
        <ToggleSwitch
          label="Show only my posts"
          checked={showMine}
          onChange={() => setShowMine((prev) => !prev)}
        />
      </div>

      <div role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>

      <div className="w-full max-w-5xl mx-auto">
        <PostForm onPostCreated={handlePostCreated} />
      </div>

      <LogoutButton />
    </>
  );
}
