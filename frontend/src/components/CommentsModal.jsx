import Post from "./Post";
import {useRef, useEffect, useState} from "react";
import { getComments } from "../services/comments";

const CommentsModal = ({post, onClose, token}) => {
  const [comments, setComments] = useState([]);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

        const fetchComments = () => {
          getComments(token, post._id)
            .then((data) => {
              setComments(data.comments);
              localStorage.setItem("token", data.token);
            })
            .catch((err) => {
              console.error(err);
            }); 
        }
        if (post?._id) {
        fetchComments();
        }
    
    }, [post, token]);

    // console.log("comments:", comments);
    
  if (!post) return null;

return(
<div>
{/* have altered the default colour of the background for modal */}
    <dialog data-testid="comments-modal" ref={dialogRef}  className="modal bg-base-content">
        <div className="modal-box">
            <Post post={post} />
      {/* Scrollable comments feed */}
            <div className="max-h-60 overflow-y-auto mt-4 space-y-4">
                {comments.map(comment => (
                    <div key={comment._id} className="bg-base-200 rounded-lg p-2">
            {/* <p className="font-semibold text-sm">{comment.userName}</p> */}
                <p className="text-sm">{comment.text}</p>
          </div>
        ))}
            </div>
        <div className="modal-action">
            <button className="btn" onClick={onClose}>Close</button>
        </div>
        </div>
    </dialog>
</div >
    
    )
}

export default CommentsModal;