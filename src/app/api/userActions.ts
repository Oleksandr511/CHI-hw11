import { axiosInstance } from "./axiosInstance";

export function createUser(username: string, password: string) {
  axiosInstance
    .post("users/register", {
      username,
      password,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function loginUser(username: string, password: string) {
  try {
    const response = await axiosInstance.post("api/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserProfile() {
  try {
    const response = await axiosInstance.get("/users/my-profile");
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
