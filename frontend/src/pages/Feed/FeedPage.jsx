import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import { getComments } from "../../services/comments";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import PostForm from "../../components/PostForm";
import ToggleSwitch from "../../components/ToggleSwitch";

export function FeedPage() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [showMine, setShowMine] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch posts whenever showMine or token changes
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchPosts = () => {
      getPosts(token, showMine)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
      }
// could be refactored
    const fetchComments = () => {
      getComments(token)
        .then((data) => {
          setComments(data.comments);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          // navigate("/login");
        }); 
    };

    fetchPosts();
    fetchComments();
  }, [token, showMine, navigate]);

  console.log("comments", comments);
  

  // Refetch posts after creating a new one
  const handlePostCreated = () => {
    if (!token) return;
    getPosts(token, showMine)
      .then((data) => {
        setPosts(data.posts.reverse());
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });
  };
  return (
    <div className="min-h-screen bg-base-100"> {/* Main container */}
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col max-w-lg"> {/* Content container */}       
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
        <PostForm onPostCreated={handlePostCreated} />
      </div>
 </div>
 </div>
  );
}