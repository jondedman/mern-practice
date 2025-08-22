// import { useState } from "react";
// import { FaSkullCrossbones } from "react-icons/fa";
// import { createLike, deleteLike } from "../services/likes";

// const Like = ({ postId, hasLiked: initiallyLiked, onLikeChange }) => {
//   const [hasLiked, setHasLiked] = useState(initiallyLiked);
//   const token = localStorage.getItem("token");

//   const toggleLike = async () => {
//     console.log("About to create like for postId:", postId); 
    
//     try {
//       if (hasLiked) {
//         await deleteLike(token, postId);
//       } else {
//         await createLike(token, postId);
//       }
//       setHasLiked(!hasLiked);
//       onLikeChange?.(); // notify parent (to update count if needed)
//     } catch (err) {
//       console.error("Error toggling like:", err);
//     }
//     console.log("postId:", postId);
//   };

//   return (
//     <button
//       onClick={toggleLike}
//       className={`btn btn-ghost btn-sm flex-1 gap-2 ${
//         hasLiked ? "border-primary border-4 text-primary font-extrabold" : "text-accent"
//       }`}
//     >
//       <FaSkullCrossbones data-testid={hasLiked ? "liked" : "unliked"} />
//       {hasLiked ? "Acknowledged" : "Acknowledge"}
//     </button>
//   );
// };

// export default Like;

import { useState } from "react";
import { FaSkullCrossbones } from "react-icons/fa";
import { createLike as defaultCreateLike, deleteLike as defaultDeleteLike } from "../services/likes";

const Like = ({
  postId,
  hasLiked: initiallyLiked,
  onLikeChange,
  createLike = defaultCreateLike,
  deleteLike = defaultDeleteLike,
}) => {
  const [hasLiked, setHasLiked] = useState(initiallyLiked);
  const token = localStorage.getItem("token");

  const toggleLike = async () => {
    try {
      if (hasLiked) {
        await deleteLike(token, postId);
      } else {
        await createLike(token, postId);
      }
      setHasLiked(!hasLiked);
      onLikeChange(!hasLiked);
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`btn btn-ghost btn-sm flex-1 gap-2 ${
        hasLiked ? "border-primary border-4 text-primary font-extrabold" : "text-accent"
      }`}
    >
      <FaSkullCrossbones data-testid={hasLiked ? "liked" : "unliked"} />
      {hasLiked ? "Acknowledged" : "Acknowledge"}
    </button>
  );
};

export default Like;

