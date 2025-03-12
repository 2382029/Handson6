import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchData, createData, updateData, deleteData } from "../services/apiService";

type Comment = {
  id: number;
  body: string;
  postId: number;
};

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [postId] = useState<number>(1);

  useEffect(() => {
    fetchData<{ comments: Comment[] }>("comments")
      .then((data) => setComments(data.comments))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const addComment = async () => {
    if (newComment.trim() === "") return;
    setLoading(true);

    try {
      const response = await createData<Comment>("comments/add", {
        body: newComment,
        postId,
        userId: 1,
      });

      setComments([response, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const editComment = async (id: number) => {
    const newBody = prompt("Edit comment:", comments.find((c) => c.id === id)?.body || "");
    if (!newBody || newBody.trim() === "") return;

    setLoading(true);
    try {
      const updatedComment = await updateData<Comment>("comments", id, { body: newBody });

      setComments(comments.map((comment) => (comment.id === id ? updatedComment : comment)));
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeComment = async (id: number) => {
    setLoading(true);
    try {
      await deleteData("comments", id);
      setComments(comments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-blue-900 p-6 pt-24">
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Comments
      </motion.h2>

      <div className="max-w-xl w-full bg-gray-800 p-6 rounded-lg shadow-md">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Enter comment"
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded"
          />
          <motion.button
            onClick={addComment}
            className={`mt-2 w-full py-2 rounded ${loading ? "bg-gray-500" : "bg-blue-500 text-white"}`}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? "Processing..." : "Add Comment"}
          </motion.button>
        </motion.div>

        <div className="overflow-y-auto max-h-[60vh] w-full">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                className="flex justify-between bg-gray-700 text-white p-3 rounded shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <span>{comment.body}</span>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => editComment(comment.id)}
                    className="text-yellow-400"
                    whileHover={{ scale: 1.2 }}
                  >
                    ✎
                  </motion.button>
                  <motion.button
                    onClick={() => removeComment(comment.id)}
                    className="text-red-400"
                    whileHover={{ scale: 1.2 }}
                  >
                    ✖
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Comments;