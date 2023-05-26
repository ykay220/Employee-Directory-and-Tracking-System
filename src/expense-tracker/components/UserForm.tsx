import React from "react";
import { z } from "zod";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserObj } from "./UserList";
import styles from "./UserForm.module.css";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  city: z.string().min(6, { message: "City must be atleast 6 character" }),
});
type FormData = z.infer<typeof schema>;

interface Prop {
  onSubmit: (user: UserObj) => void;
}

const UserForm = ({ onSubmit }: Prop) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleFormSubmit = (data: FormData) => {
    const user: UserObj = {
      id: 0,
      username: "", //  Assign a unique username
      address: {
        street: "",
        suite: "",
        city: data.city,
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      ...data,
    };

    onSubmit(user);
    reset();
  };

  return (
    <div className={`mb-5 ${styles["form-container"]}`}>
      <div className={styles["form-section-container"]}>
        <form
          className={styles.customForm}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="mb-3">
            <label htmlFor="name" className="label-form">
              Name
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              className="form-control"
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="label-form">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="form-control"
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="label-form">
              City
            </label>
            <input
              {...register("city")}
              id="city"
              type="text"
              className="form-control"
            />

            {errors.city && (
              <p className="text-danger">{errors.city.message}</p>
            )}
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
      <div className={styles["description-section-container"]}>
        <div className={styles.innerContent}>
          <div className="title-container">
            <h2>Employee Directory and Tracking System</h2>
          </div>
          <p>
            This employee management system is a React TypeScript project that
            allows you to enter employee information and view it in a chart.
            Additionally, you can select a city to see the employees associated
            with that city.
          </p>
          <h3>Features:</h3>
          <ul>
            <li>
              Fetching data from jsontypeplace API to simulate employee data
            </li>
            <li>Utilizing react-hook-form for form handling and validation</li>
            <li>
              Accessibility considerations to ensure a better user experience
              for all users
            </li>
            <li>Combination of Bootstrap and vanilla CSS for styling</li>
            <li>Custom hooks for reusable logic</li>
            <li>Effective use of useEffect for handling side effects</li>
            <li>
              Separation of concerns implemented with API functionality in a
              separate client file
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
