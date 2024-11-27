import React, { useState } from "react";
// import { Pagination } from "@mui/material";
import { Exhibit } from "../interface/exhibit";
import { handleCardClick } from "../app/utils";
import { useRouter } from "next/router";
import Image from "next/image";
import SideBar from "../pages/page";
import { StripePageProps } from "@/interface/stripe";
import Pagination from "./Pagination";

const StripePage = ({ exhibits, lastPage }: StripePageProps) => {
  console.log("lastPage", lastPage);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const MAX_LENGTH = 100;

  // const handlePageChange = (
  //   event: React.ChangeEvent<unknown>,
  //   page: number
  // ) => {
  //   router.push({
  //     pathname: "/",
  //     query: { ...router.query, currentPage: page },
  //   });
  // };

  const handleExpandClick = (id: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div style={styles.pageContainer}>
      <SideBar />
      <div style={styles.mainContent}>
        <h1 style={styles.title}>Exhibits</h1>
        <div style={styles.gridContainer}>
          {exhibits.map((exhibit: Exhibit) => (
            <div
              onClick={(e) => handleCardClick(e, exhibit.id, router)}
              key={exhibit.id}
              style={styles.card}
            >
              <Image
                style={styles.image}
                width="300"
                height="250"
                src={process.env.NEXT_PUBLIC_BASE_URL + exhibit.imageUrl}
                alt={exhibit.imageUrl}
                priority
              />
              <p style={styles.description}>
                {isExpanded[exhibit.id]
                  ? exhibit.description
                  : exhibit.description.slice(0, MAX_LENGTH) +
                    (exhibit.description.length > MAX_LENGTH ? "..." : "")}
              </p>
              {exhibit.description.length > MAX_LENGTH && (
                <button
                  style={styles.showMoreButton}
                  onClick={() => handleExpandClick(exhibit.id)}
                >
                  {isExpanded[exhibit.id] ? "Less" : "More"}
                </button>
              )}
              <p style={styles.username}>Posted by: {exhibit.user.username}</p>
            </div>
          ))}
        </div>
        <Pagination
          page={currentPage}
          setPage={setCurrentPage}
          lastPage={lastPage}
          router={router}
          // handlePageChange={handlePageChange}
          // count={}
          // onChange={handlePageChange}
          // navigationPath="/"
        />
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  mainContent: {
    flex: 1,
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease",
    width: "300px",
  },
  image: {
    width: "100%",
    height: "250px",
  },
  description: {
    fontSize: "1rem",
    margin: "10px 0",
    color: "#333",
  },
  username: {
    fontSize: "0.9rem",
    color: "#666",
  },
  showMoreButton: {
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
    color: "#333",
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "5px 10px",
    fontSize: "0.9rem",
    marginTop: "10px",
  },
};

export default StripePage;
