import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import PostForm from "../../components/PostForm";
import ToggleSwitch from "../../components/ToggleSwitch";

export function FeedPage() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [showMine, setShowMine] = useState(false);

  const token = localStorage.getItem("token");

  // Reusable fetchPosts function
  const fetchPosts = useCallback(async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const data = await getPosts(token, showMine);
      setPosts(data.posts.reverse());
      localStorage.setItem("token", data.token);
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  }, [token, showMine, navigate]);

  // Fetch posts whenever showMine or token changes
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Posts</h2>

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
          <PostForm onPostCreated={fetchPosts} />
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}
