import { FaSkullCrossbones } from "react-icons/fa";
import { useState } from "react";

const Like = () => {
  const [hasLiked, setHasLiked] = useState(false);

  const toggleLike = () => {
    setHasLiked(!hasLiked);
  };

  return (
    <button
      onClick={toggleLike}
      className={`btn btn-ghost btn-sm flex-1 gap-2 ${
        hasLiked ? "border-primary border-4 text-primary font-extrabold" : "text-accent"
      }`}
    >
      {hasLiked ? (
        <FaSkullCrossbones data-testid="liked" />
      ) : (
        <FaSkullCrossbones data-testid="unliked" />
      )}
      {hasLiked ? "Acknowledged" : "Acknowledge"}
    </button>
  );
};

export default Like;
