import React from "react";
import { getUserExhibits } from "../api/exhibitActions";
import { Exhibit } from "../interface/exhibit";
import { handleCardClick } from "../app/utils";
import { useRequest } from "ahooks";
import loadingGif from "../assets/loading-gif.gif";
import { useRouter } from "next/router";
import Image from "next/image";
import ProtectedRoute from "@/ProtectdRoute";
import SideBar from "./page";

const HomePage = () => {
  // const navigate = useNavigate();
  const route = useRouter();
  const [exhibits, setExhibits] = React.useState([]);

  const { loading, error } = useRequest(getUserExhibits, {
    onSuccess: (res) => {
      console.log("res", res);
      // if (!res) route.push("/login");
      setExhibits(res.data);
    },
    onError: (err) => {
      console.log("e", err);
    },
  });
  return loading ? (
    <Image
      width={300}
      height={300}
      style={{ height: "100vh" }}
      src={loadingGif}
      alt="gif"
    />
  ) : error ? (
    <div>Error</div>
  ) : (
    <div style={{ paddingTop: "20px", height: "100vh" }}>
      <SideBar />
      <h1>Home Page</h1>
      {exhibits.map((exhibit: Exhibit) => {
        return (
          <div
            onClick={(e) => handleCardClick(e, exhibit.id, route)}
            style={styles.card}
            key={exhibit.id}
          >
            <Image
              style={styles.card_img}
              width={300}
              height={300}
              src={process.env.NEXT_PUBLIC_BASE_URL + exhibit.imageUrl}
              alt={exhibit.imageUrl}
            />
            <p>{exhibit.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default function ProtectedHomePage() {
  return (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  );
}

const styles = {
  card: {
    // display: "flex",
    // flexDirection: "column",
    padding: "10px",
    border: "1px solid #a39f9f",
    borderRadius: "10px",
    margin: "10px",
  },
  card_img: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
  },
};
