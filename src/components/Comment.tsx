import React from "react";
import { Comment as CommentInterface } from "../interface/comment";
import moment from "moment";
import styles from "../styles/comment.module.css";
import { deleteExhibitComment } from "../api/exhibitActions";
import { useParams } from "react-router-dom";
import { useRequest } from "ahooks";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function Comment({
  update,
  comment,
}: {
  comment: CommentInterface;
  update: () => void;
}) {
  const userId = useSelector((state: RootState) => state.user.user?.userId);

  const { postId } = useParams();
  const { run } = useRequest(
    (commentId) => {
      console.log("commentId", commentId);
      console.log("postId", postId);
      if (!commentId || !userId) return Promise.reject("No id");
      return deleteExhibitComment(userId, commentId);
    },
    {
      onSuccess: () => {
        console.log("success");
        update();
      },
      onError: (err) => {
        console.log("err", err);
      },
    }
  );
  console.log("comment", comment);
  return (
    <div key={comment.id} className={styles.commentContainer}>
      <h3 className={styles.username}>{comment.user.username}</h3>
      <p className={styles.text}>{comment.text}</p>
      <p className={styles.timestamp}>{moment(comment.createdAt).calendar()}</p>
      {userId === comment.user.id && (
        <button onClick={() => run(comment.id)} className={styles.deleteBtn}>
          <HighlightOffIcon />
        </button>
      )}
    </div>
  );
}
