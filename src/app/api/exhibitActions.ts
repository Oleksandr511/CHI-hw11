import { GetServerSideProps } from "next";
import axiosInstance from "./axiosInstance";

export async function getUserExhibits() {
  try {
    const response = await axiosInstance.get("/api/exhibits/my-posts");
    return response.data;
  } catch (err) {
    console.log('error in getUserExhibits', err);
    console.log(err);
  }
}

export async function getAllExhibits(page: string = "1") {
  try {
    const response = await axiosInstance.get(`/api/exhibits?page=${page}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createExhibit(description: string, file: File) {
  const formData = new FormData();

  formData.append("image", file);
  formData.append("description", description);
  try {
    const response = await axiosInstance
      .post(`/api/exhibits`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getExhibitById(id: string) {
  try {
    const response = await axiosInstance.get(`/api/exhibits/post/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteExhibit(id: string) {
  try {
    const response = await axiosInstance.delete(`/api/exhibits/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function deleteExhibitComment(
  exhibitId: string,
  commentId: string
) {
  try {
    const response = await axiosInstance.delete(
      `/api/exhibits/${exhibitId}/comments/${commentId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
