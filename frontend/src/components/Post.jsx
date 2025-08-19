import { FaThumbsUp, FaCommentAlt } from "react-icons/fa";

const Post = (props) => {
  console.log("props",props);
  const randomPicUrl = `https://picsum.photos/600/400?random=${props.post._id}`;
  
  const timeAgo = (created) =>{
    let currentDate = new Date();
    console.log("current date", currentDate);
    let end = new Date(created);
    console.log("end", end);
    let timeDifference = currentDate - end;

    // Convert milliseconds to hours and use Math.floor to avoid fractional hours
  let minutes = Math.floor(timeDifference / (1000 * 60));
  let hours = Math.floor(timeDifference / (1000 * 60 * 60));
  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
  }
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
          src={ randomPicUrl || "/Gemini_Generated_Image_2j1wty2j1wty2j1w.png" } 
          alt="Post Image" 
          className="w-full object-cover"
          loading="lazy"
        />
      </figure>
          {/* Engagement Stats */}
        <div className="card-body pt-3 pb-2">
          <div className="flex justify-between items-center text-xs text-base-content/60 pb-2 border-b border-base-300">
              <span>👍 24 people</span>
            <span>5 comments </span>
            </div>
        </div>

      {/* Action Buttons */}
      <div className="card-body pt-3">
        <div className="flex gap-2">
          <button className="btn btn-ghost btn-sm flex-1 gap-2">
            <FaThumbsUp />
            Like
          </button>
          <button className="btn btn-ghost btn-sm flex-1 gap-2">
            <FaCommentAlt />
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;