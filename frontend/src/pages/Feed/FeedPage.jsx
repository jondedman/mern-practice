import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import PostForm from "../../components/PostForm";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }

  const handlePostCreated = () =>{
    getPosts(token)
        .then((data) => {
      setPosts(data.posts);
      localStorage.setItem("token", data.token);
    })
    .catch((err) => {
      console.error(err);
      navigate("/login");
    });
  }

  return (
    <div className="min-h-screen bg-base-100"> {/* Main container */}
      <div className="container mx-auto px-4 py-8 h-screen flex flex-col max-w-lg"> {/* Content container */}       
        <h2 className="text-2xl font-bold text-center mb-4">Posts</h2>
        {/* Post Form */}
        <div className="max-w-lg mx-auto w-full mb-4">
          <PostForm onPostCreated={handlePostCreated} />
        </div>
        {/* Posts Feed */}
        <div role="feed" className="flex-1 overflow-y-auto">
          {posts.map((post) => (
            <Post post={post} key={post._id}/>
          ))}
        </div>   
      </div>
    </div>
  );
}
