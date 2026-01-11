import { useState } from "react";
import { useUpdateComment, useDeleteComment } from "./comment.hooks";
import { useToggleCommentLike } from "../like/like.hooks";
import { useCurrentUser } from "../auth/auth.hooks";

const CommentItem = ({ comment, videoId }) => {
  const { data: currentUser } = useCurrentUser();

  const isOwner = currentUser?._id === comment.owner?._id;

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const updateMutation = useUpdateComment(videoId);
  const deleteMutation = useDeleteComment(videoId);
  const likeMutation = useToggleCommentLike(videoId);

  const handleUpdate = () => {
    updateMutation.mutate(
      { commentId: comment._id, data: { content: editContent } },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  return (
    <div style={{ padding: "10px 0", borderBottom: "1px solid #ddd" }}>
      <strong>{comment.owner?.username}</strong>

      {!isEditing ? (
        <p>{comment.content}</p>
      ) : (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          rows={2}
          style={{ width: "100%" }}
        />
      )}

      <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
        <button onClick={() => likeMutation.mutate(comment._id)}>
          {comment.isLiked ? "Liked" : "Like"} {comment.likesCount}
        </button>


        {isOwner && !isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteMutation.mutate(comment._id)}>
              Delete
            </button>
          </>
        )}

        {isOwner && isEditing && (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
