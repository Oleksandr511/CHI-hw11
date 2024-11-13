import React from "react";
import { deleteExhibit, getExhibitById } from "../../app/api/exhibitActions";
import { Outlet, useParams } from "react-router-dom";
import { Exhibit } from "../../app/interface/exhibit";
import { useRequest } from "ahooks";
import loadingGif from "../../assets/loading-gif.gif";
import { getUserProfile } from "../../app/api/userActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";
import styles from "../../styles/post.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { CommentStripe } from "@/components/CommentStripe";

type Params = {
  id: undefined | string;
};

export default function Post() {
  console.log("post");
  const [exhibit, setExhibit] = React.useState<Exhibit>();
  const router = useRouter();
  const { id } = router.query;

  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  console.log("ll", isLogged);
  console.log("comments count", exhibit?.commentCount);
  console.log("exhibit", exhibit);
  const { data } = useRequest(
    () => {
      if (isLogged) return getUserProfile();
      return Promise.reject("No user");
    },
    {
      onSuccess: (res) => {
        console.log("user", res);
      },
      onError: (err) => {
        console.log("err", err);
      },
    }
  );
  const { loading, error } = useRequest(
    () => {
      if (!id) return Promise.reject("No id");
      return getExhibitById(id as string);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        setExhibit(res);
        console.log("d", data?.id);
      },
      onError: (err) => {
        console.log("err", err);
      },
    }
  );

  const handleDeleteBtn = async () => {
    console.log("delete");
    if (!exhibit) return;
    try {
      await deleteExhibit(exhibit.id);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const imageUrl = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${exhibit?.imageUrl}`
    : "";

  return loading ? (
    <div className={styles.loading}>
      <Image src={loadingGif} width={300} height={300} alt="gif" />
    </div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div style={{ paddingTop: "20px", height: "100%" }}>
      <h1>Post Page</h1>
      <div className={styles.card}>
        <div className={styles.card_content}>
          <Image
            className={styles.img}
            src={imageUrl}
            alt={imageUrl}
            width={300}
            height={250}
          />
          <div className={styles.card_description}>
            <p>{exhibit?.description}</p>
            <p style={{ color: "grey" }}>{exhibit?.user.username}</p>
            <p style={{ color: "#b5afb0" }}>
              comments: {exhibit?.commentCount}
            </p>
            <div>
              {data?.id === exhibit?.user.id ? (
                <button className={styles.deleteBtn} onClick={handleDeleteBtn}>
                  <DeleteIcon />
                </button>
              ) : null}
            </div>
            <CommentStripe postId={exhibit?.id as string} />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
