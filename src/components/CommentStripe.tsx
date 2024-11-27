import React from "react";
import { useRequest } from "ahooks";
import { Link, useParams } from "react-router-dom";
import { getCommentsByExhibitId } from "../api/commentActions";
import { Comment as CommentInterface } from "../interface/comment";
import Comment from "./Comment";
// import NewComment from "../pages/NewComment";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import loadingGif from "../assets/loading-gif.gif";
import Image from "next/image";

interface CommentStripeProps {
  postId: string;
}

export const CommentStripe: React.FC<CommentStripeProps> = ({ postId }) => {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  const [comments, setComments] = React.useState<CommentInterface[]>([]);
  const id = postId;
  const { loading, error, run } = useRequest(
    async () => {
      if (id) return await getCommentsByExhibitId(id as string);
      return Promise.reject("No id");
    },
    {
      onSuccess: (res) => {
        console.log("res", res);
        setComments(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleChange = () => {
    console.log("change in comment");
    run();
  };

  return loading ? (
    <Image width={300} height={300} src={loadingGif} alt="gif" />
  ) : error ? (
    <div>Error</div>
  ) : (
    <div>
      {/* {isLogged ? (
        <NewComment update={handleChange} />
      ) : (
        <Link style={{ margin: "15px" }} to="/login">
          Login to add comments
        </Link>
      )} */}
      {comments.length === 0 ? null : (
        <div style={styles.container}>
          <h1 style={styles.title}>Comments</h1>
          {loading ? (
            <div style={styles.loadingText}>Loading...</div>
          ) : error ? (
            <div style={styles.errorText}>Error</div>
          ) : (
            <div style={styles.commentList}>
              {comments.map((comment) => (
                <div key={comment.id}>
                  <Comment update={handleChange} comment={comment} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fafafa",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  title: {
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "16px",
  },
  loadingText: {
    fontSize: "1.2rem",
    color: "#007bff",
  },
  errorText: {
    fontSize: "1.2rem",
    color: "#d9534f",
  },
  commentList: {
    marginTop: "16px",
  },
};
