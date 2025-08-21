import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import { getComments } from "../../services/comments";
import Post from "../../components/Post";
import PostForm from "../../components/PostForm";
import CommentsModal from "../../components/CommentsModal";
import ToggleSwitch from "../../components/ToggleSwitch";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showMine, setShowMine] = useState(false);

  const handleCommentClick = (post) => {    
  setSelectedPost(post);
  }

// if there is no post selected (null) modal will close
  const handleCloseModal = () => setSelectedPost(null);
  const navigate = useNavigate();
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
    fetchPosts();
  }, [token, showMine, navigate]);

  console.log("comments", comments);
  

  // Refetch posts after creating a new one
  const handlePostCreated = () => {
    if (!token) return;
    getPosts(token, showMine)
      .then((data) => {
        setPosts(data.posts);
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
        
        {/* Posts Feed */}
        <div role="feed" className="flex-1 overflow-y-auto">
          {posts.map((post) => (
            <Post post={post} key={post._id} onCommentClick={handleCommentClick} />
          ))}
          {/* renders based on whether there is a selected post */}
                {selectedPost && (
        <CommentsModal
          post={selectedPost}
          token={token}
          onClose={handleCloseModal}
        />
      )}
        </div>
                {/* Post Form */}
        <div className="max-w-lg mx-auto w-full mb-4">
          <PostForm onPostCreated={handlePostCreated} />
        </div>   
   </div>
       <Footer />
 </div>
  );
}
