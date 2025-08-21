import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { getComments } from "../../services/comments";
import { getLikes } from "../../services/likes";

import Post from "../../components/Post";
import PostForm from "../../components/PostForm";
import ToggleSwitch from "../../components/ToggleSwitch";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export function FeedPage() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
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

    const fetchLikes = () => {
      getLikes(token)
        .then((data) => {
          setLikes(data.likes);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
        });
      };


    fetchPosts();
    fetchComments();
    fetchLikes();
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
      <div className="home bg-neutral-content text-base-content min-h-screen w-full flex flex-col">
    <Header />

    {/* Main content container */}
  <div className="container mx-auto px-4 py-8 h-screen flex flex-col max-w-lg"> {/* Content container */}   
    <h2 className="text-2xl font-bold text-center mb-6 mt-6">Posts</h2>

      {/* Toggle for “only my posts” */}
      <div className="mb-4">
        <ToggleSwitch
          label="Show only my posts"
          checked={showMine}
          onChange={() => setShowMine((prev) => !prev)}
        />
      </div>

      {/* Centered feed container */}
      <div className="flex-1 overflow-y-auto" role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id} likes={likes} />
        ))}
      </div>

      {/* Post form */}
      <div className="w-full max-w-3xl mt-6 mb-6">
        <PostForm onPostCreated={handlePostCreated} />
      </div>
    </div>

    <Footer />
  </div>
  );
}