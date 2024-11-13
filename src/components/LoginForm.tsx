import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import "../styles/style.css";
import { useDispatch } from "react-redux";
import { loginUserStore } from "../store/slices/userSlice";
import type { AppDispatch } from "../store/store";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";

type Inputs = {
  username: string;
  password: string;
};

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  // const navigate = useNavigate();
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ mode: "onChange" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      loginUserStore({ username: data.username, password: data.password })
    )
      .unwrap()
      .then(() => {
        // navigate("/");
        route.push("/home");
        reset();
      })
      .catch((error) => {
        alert(`Login failed: ${error}`);
      });
  };
  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-input">
          <input
            {...register("username", {
              required: "UserName is required",
            })}
            placeholder="Username"
            type="text"
          />
        </div>
        {errors?.username && (
          <div style={{ color: "red" }}>{errors?.username.message}</div>
        )}
        <div className="form-input">
          <input
            {...register("password", {
              required: "Password is required",
              validate: {
                minLength: (value) =>
                  value.length >= 4 ||
                  "Password must be at least 4 characters long",
              },
            })}
            type="password"
            placeholder="Password"
          />
        </div>
        {errors?.password && (
          <div style={{ color: "red" }}>{errors?.password.message}</div>
        )}
        <button className="submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
