import Post from "./Post";
import {useRef, useEffect} from "react";

const CommentsModal = ({post, comments, onClose}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [post]);

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
                    <div key={comment.id} className="bg-base-200 rounded-lg p-2">
            {/* <p className="font-semibold text-sm">{comment.userName}</p> */}
                <p className="text-sm">{comment.comment}</p>
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