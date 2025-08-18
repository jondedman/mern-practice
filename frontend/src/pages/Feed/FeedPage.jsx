import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import PostForm from "../../components/PostForm";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState("all"); // ✅ lowercase to match check
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("user_id"); // ✅ not the token!

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handlePostCreated = () => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    getPosts(token)
      .then((data) => {
        setPosts(data.posts);
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  };

  // ✅ filter logic
  const filteredPosts = posts.filter((post) => {
    if (filter === "all") {
      
      return true;
    } else {
      return post.author === currentUserId || post.author?._id === currentUserId;
    }
  });

  return (
    <>
      <h2>Posts</h2>

      <button
        type="button"
          onClick={() => {
            console.log("button clicked!");
            setFilter(filter === "all" ? "mine" : "all");
          }}
>
  {filter === "all" ? "Show My Posts" : "Show All Posts"}
</button>


      <div role="feed">
        {filteredPosts.map((post) => (
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
