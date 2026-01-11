import { useState } from "react";
import { useAddComment } from "./comment.hooks";

const CommentForm = ({ videoId }) => {
  const [content, setContent] = useState("");
  const addCommentMutation = useAddComment(videoId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    addCommentMutation.mutate(
      { content },
      {
        onSuccess: () => setContent(""),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <textarea
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        type="submit"
        disabled={addCommentMutation.isLoading}
        style={{ marginTop: "10px" }}
      >
        {addCommentMutation.isLoading ? "Posting..." : "Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
