import React from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useRequest } from "ahooks";
// import { postComment } from "../app/api/commentActions";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import styles from "../styles/newComment.module.css";

export default function NewComment({ update }: { update: () => void }) {
  const { id } = useParams();
  // const [refresh, setRefresh] = React.useState(false);

  const { run } = useRequest(
    async (id: string | undefined, text: string) => {
      console.log('creating comment')
      if (!id || text.length === 0) return Promise.reject("No id");
      // const response = await postComment(id, text);
      // console.log("r", response);
    },
    {
      onSuccess: (res) => {
        console.log(res);
        update();
        // setRefresh((prev) => !prev);
      },

      onError: (err) => {
        console.log(err);
      },
    }
  );

  const handleSubmit = (values: { text: string }) => {
    console.log("submit", values.text, id);
    run(id, values.text);
  };

  return (
    <div className={styles.container}>
      <h1>Create new comment</h1>
      <Formik
        initialValues={{ text: "" }}
        validate={(values: { text: string }) => {
          const errors: Record<string, string> = {};
          if (!values.text) {
            errors.text = "Text is required";
          }
          return errors;
        }}
        onSubmit={(
          values: { text: string },
          {
            setSubmitting,
            resetForm,
          }: {
            setSubmitting: (isSubmitting: boolean) => void;
            resetForm: () => void;
          }
        ) => {
          console.log("values", values);
          handleSubmit(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isSubmitting }: { isSubmitting: boolean }) => (
          <Form className={styles.form}>
            <Field
              className={styles.inputField}
              name="text"
              type="text"
              placeholder="Text"
            />
            <ErrorMessage
              className={styles.errorMessage}
              name="text"
              component="div"
            />
            <button
              className={styles.submitBtn}
              type="submit"
              disabled={isSubmitting}
            >
              <SendIcon type="submit" />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
