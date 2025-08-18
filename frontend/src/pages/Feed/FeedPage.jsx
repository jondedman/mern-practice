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
    <>
      <h2>Posts</h2>
      <div role="feed">
        {posts.map((post) => (
          <Post post={post} key={post._id}/>
        ))}
      </div>
      <div className="w-full max-w-5xl mx-auto">
        <PostForm onPostCreated={handlePostCreated} />
      </div>
      <LogoutButton />
    </>
  );
}

