// import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
// import { useState } from "react";

// const Like = () => {

//     const [hasLiked, setHasLiked] = useState(false);

//     const toggleLike = () => {
//         setHasLiked(!hasLiked);
//     };

//     return (
//         <div className="flex gap-2">

//             {hasLiked && (
//                 <button onClick = {toggleLike} className="btn btn-ghost btn-sm text-primary flex-1 gap-2">
//                     <FaThumbsUp />
//                     Like
//                 </button>
//             )}

//             {!hasLiked && (
//                 <button onClick = {toggleLike} className="btn btn-ghost btn-sm text-accent flex-1 gap-2">
//                     <FaRegThumbsUp />
//                     Like
//                  </button>
//             )}

//         </div>
//     );
// };

// export default Like;

import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { useState } from "react";

const Like = () => {
  const [hasLiked, setHasLiked] = useState(false);

  const toggleLike = () => {
    setHasLiked(!hasLiked);
  };

  return (
    <button
      onClick={toggleLike}
      className={`btn btn-ghost btn-sm flex-1 gap-2 ${hasLiked ? "text-primary" : "text-accent"}`}
    >
      {hasLiked ? <FaThumbsUp /> : <FaRegThumbsUp />}
      Like
    </button>
  );
};

export default Like;
