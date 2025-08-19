import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import PostForm from "../../components/PostForm";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
    <div className="home bg-neutral-content text-base-content min-h-screen w-full flex flex-col">
      <Header />

      <h2>Posts</h2>
      <div role="feed" className="bg-base-100 max-w-auto mx-auto mt-10 p-6 border rounded-lg shadow-md">
        {posts.map((post) => (
          <Post post={post} key={post._id}/>
        ))}
        
      </div>
      <div className="mx-auto">
        <PostForm onPostCreated={handlePostCreated} />
      </div>
      <Footer />
    </div>
  );
}

