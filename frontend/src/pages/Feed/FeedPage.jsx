import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../services/posts";
import Post from "../../components/Post";
import PostForm from "../../components/PostForm";
import CommentsModal from "../../components/CommentsModal";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  // this is ready for when comments are fetched from the database,
  // at which point the initial state should be an empty array
  const [comments, setComments] = useState([{id: "1", comment: "coment1"},{id: "2", comment: "comment2"},{id: "3", comment: "comment3"},{id: "4", comment: "coment4"},{id: "5", comment: "comment5"},{id: "6", comment: "comment6"}]);

  const handleCommentClick = (post) => {
    console.log("called hcc, with post: ", post);
    
  setSelectedPost(post);
  console.log(selectedPost);
  
  }
// if there is no post selected (null) modal will close
  const handleCloseModal = () => setSelectedPost(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts.reverse());
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
      setPosts(data.posts.reverse());
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

        {/* Posts Feed */}
        <div role="feed" className="flex-1 overflow-y-auto">
          {posts.map((post) => (
            <Post post={post} key={post._id} onCommentClick={handleCommentClick} />
          ))}
          {/* renders based on whether there is a selected post */}
                {selectedPost && (
        <CommentsModal
          post={selectedPost}
          comments={comments}
          onClose={handleCloseModal}
        />
      )}
        </div>
                {/* Post Form */}
        <div className="max-w-lg mx-auto w-full mb-4">
          <PostForm onPostCreated={handlePostCreated} />
        </div>   
      </div>
    </div>
  );
}
