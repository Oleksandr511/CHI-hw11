import axiosInstance from "./axiosInstance";

export async function getCommentsByExhibitId(id: string) {
  try {
    const response = await axiosInstance.get(`/api/exhibits/${id}/comments`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function postComment(id: string, text: string) {
  try {
    const response = await axiosInstance.post(`/api/exhibits/${id}/comments`, {
      text,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
