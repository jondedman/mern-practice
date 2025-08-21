// import { FaSkullCrossbones, FaCommentAlt } from "react-icons/fa";
// import timeAgo from "../services/timeAgo";
// import Like from "./Like";

// const Post = (props) => {
//   const token = localStorage.getItem("token");
//   const userId = token ? JSON.parse(atob(token.split(".")[1])).sub : null;

//   const postLikes = props.likes.filter(like => like.post_id === props.post._id);
//   const hasLiked = postLikes.some(like => like.user === userId);
//   const likeCount = postLikes.length;

//   const randomPicUrl = `https://picsum.photos/600/400?random=${props.post._id}`;
//   return (
//     <div className="card bg-base-100 w-full max-w-lg shadow-md mb-4">
//       {/* Post Header */}
//       <div className="card-body pb-0">
//         <div className="flex items-center gap-3">
//           <div className="avatar">
//             <div className="w-10 rounded-full">
//               <img 
//                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
//                 alt="User Avatar" 
//               />
//             </div>
//           </div>
//           <div>
//             <h3 className="font-semibold text-sm">Darth Vader</h3>
//             <p className="text-xs text-base-content/60">{timeAgo(props.post.createdAt)}</p>
//           </div>
//         </div>

//         {/* Post Content */}
//         <div className="py-3">
//           <article className="text-sm" key={props.post._id}>{props.post.message}</article>
//         </div>
//       </div>

//       {/* Post Image */}
//       <figure>
//         <img
//           src={ randomPicUrl || "/Gemini_Generated_Image_2j1wty2j1wty2j1w.png" } 
//           alt="Post Image" 
//           className="w-full object-cover"
//           loading="lazy"
//         />
//       </figure>

//       {/* Engagement Stats */}
//       <div className="card-body pt-3 pb-2">
//         <div className="flex justify-between items-center text-xs text-base-content/60 pb-2 border-b border-base-300">
//            <span className="flex items-center gap-1">
//             <FaSkullCrossbones />
//             {likeCount} villains
//           </span>
//           <span>{props.post.commentsCount ?? 0} comments</span>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="card-body pt-3">
//         <div className="flex gap-2">
//           <Like
//             postId={props.post._id}
//             hasLiked={hasLiked}
//             onLikeChange={() => {
//               // Simple refresh logic (or pass callback from parent)
//               window.location.reload(); // Replace later with proper state update
//             }}
//           />
//           <button className="btn btn-ghost btn-sm flex-1 gap-2">
//             <FaCommentAlt />
//             Comment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Post;

import { useState } from "react";
import { FaSkullCrossbones, FaCommentAlt } from "react-icons/fa";
import timeAgo from "../services/timeAgo";
import Like from "./Like";

const Post = (props) => {
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).sub : null;

  // Maintain likes state locally to update counts on like toggle without reload
  const [likes, setLikes] = useState(props.likes);

  const postLikes = likes.filter(like => like.post_id === props.post._id);
  const hasLiked = postLikes.some(like => like.user === userId);
  const likeCount = postLikes.length;

  const randomPicUrl = `https://picsum.photos/600/400?random=${props.post._id}`;

  // Handler to update likes state when Like component triggers a change
  const handleLikeChange = (liked) => {
    if (liked) {
      // Add a new like by current user
      setLikes(prevLikes => [
        ...prevLikes,
        { post_id: props.post._id, user: userId }
      ]);
    } else {
      // Remove the like from current user
      setLikes(prevLikes => prevLikes.filter(like => !(like.post_id === props.post._id && like.user === userId)));
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-lg shadow-md mb-4">
      {/* Post Header */}
      <div className="card-body pb-0">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="User Avatar"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Darth Vader</h3>
            <p className="text-xs text-base-content/60">{timeAgo(props.post.createdAt)}</p>
          </div>
        </div>

        {/* Post Content */}
        <div className="py-3">
          <article className="text-sm" key={props.post._id}>{props.post.message}</article>
        </div>
      </div>

      {/* Post Image */}
      <figure>
        <img
          src={randomPicUrl}
          alt="Post Image"
          className="w-full object-cover"
          loading="lazy"
        />
      </figure>

      {/* Engagement Stats */}
      <div className="card-body pt-3 pb-2">
        <div className="flex justify-between items-center text-xs text-base-content/60 pb-2 border-b border-base-300">
          <span className="flex items-center gap-1">
            <FaSkullCrossbones />
            {likeCount} villains
          </span>
          <span>{props.post.commentsCount ?? 0} comments</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card-body pt-3">
        <div className="flex gap-2">
          <Like
            postId={props.post._id}
            hasLiked={hasLiked}
            onLikeChange={handleLikeChange}
          />
          <button className="btn btn-ghost btn-sm flex-1 gap-2">
            <FaCommentAlt />
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
