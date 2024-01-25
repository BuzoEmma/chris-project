import { useEffect, useState } from "react";

const Formvalidation = () => {
  const initialValue = {
    name: "",
    email: "",
    password: "",
    gender: "",
    checkbox: false,
  };

  const [formValues, setFormValues] = useState(initialValue);
  const [errorForm, setErrorForm] = useState({});
  const [isTrue, setIstrue] = useState(false);

  const { name, email, password, gender, checkbox } = formValues;

  const handleEvents = (e) => {
    const { name, value, type, checked } = e.target;

    const checkValue = type === "checkbox" ? checked : value;

    setFormValues({ ...formValues, [name]: checkValue });

    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorForm(formValidation(formValues));
    setIstrue(true);

    setFormValues({
      name: "",
      email: "",
      password: "",
      gender: "",
      checkbox: false,
    });
  };
  console.log(errorForm);

  const formValidation = (value) => {
    const validateError = {};
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!value.name) {
      validateError.name = "Name is required";
    }
    if (!value.email) {
      validateError.email = "Email is required";
    } else if (!regex.test(value.email)) {
      validateError.email = "Invalid email";
    }
    if (!value.password) {
      validateError.password = "Password is required";
    } else if (value.password.length < 5) {
      validateError.password = "Password must be at least 5 characters";
    } else if (value.password.length > 15) {
      validateError.password = "Password cannot exceed 15 characters";
    }
    if (!value.gender) {
      validateError.gender = "Gender is required";
    }
    if (!value.checkbox) {
      validateError.checkbox = "checkbox is required";
    }

    return validateError;
  };

  useEffect(() => {
    if (Object.keys(errorForm.length === 0 && isTrue)) {
      console.log(formValues);
    }
  }, [errorForm, isTrue, formValues]);

  return (
    <div style={{ margin: "3rem" }}>
      <h1>Formvalidation</h1>
      {JSON.stringify(errorForm.length === 0 && isTrue) ? (
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Password: {password}</p>
          <p>gender: {gender}</p>
          <p>Checkbox: {checkbox ? "True" : "false"}</p>
        </div>
      ) : (
        "Please check your verification"
      )}
      <form
        action="Formvalidation"
        onSubmit={handleSubmit}
        style={{ border: "1px solid black", width: "35%", padding: "5px" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="name">name:</label>
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            placeholder="input your name"
            onChange={handleEvents}
          />
          <em style={{ color: "red" }}>{errorForm.name}</em>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="input your email"
            value={email}
            onChange={handleEvents}
          />
          <em style={{ color: "red" }}>{errorForm.email}</em>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="input your password"
            onChange={handleEvents}
            value={password}
          />
          <em style={{ color: "red" }}>{errorForm.password}</em>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            id="gender"
            onChange={handleEvents}
            value={gender}
          >
            <option value="">select gender</option>
            <option value="male"> male</option>
            <option value="female"> female</option>
          </select>
          <em style={{ color: "red" }}>{errorForm.gender}</em>
        </div>
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password">Our terms and condition:</label>
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            onChange={handleEvents}
            value={checkbox}
          />
          <em style={{ color: "red" }}>{errorForm.checkbox}</em>
        </div>{" "}
        <br />
        <button>Send</button>
        <br />
      </form>
    </div>
  );
};

export default Formvalidation;


import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First Name:</label>
      <input
        {...register("firstName", {
          required: "First Name is required",
          maxLength: {
            value: 10,
            message: "First Name should be no more than 10 characters",
          },
          minLength: {
            value: 4,
            message: "First Name should be no more than 4 characters",
          },
        })}
      />
      <br />
      {errors.firstName && <p>{errors.firstName.message}</p>}{" "}
      {/* Display the error message */}
      <br />
      <label>Last Name:</label>
      <input
        {...register("lastName", {
          required: "Last Name is required",
          pattern: {
            value: /^[A-Za-z]+$/i,
            message: "Go and get good email",
          },
        })}
      />
      {errors.lastName && <span>{errors.lastName.message}</span>} <br />
      <label>Age:</label>
      <input
        type="number"
        {...register("age", {
          required: "Age is required",
          min: { value: 18, message: "Age should be at least 18" },
          max: { value: 99, message: "Age should be at most 99" },
        })}
      />
      <br />
      {errors.age && <p>{errors.age.message}</p>}{" "}
      {/* Display the error message */}
      <br />
      <input type="submit" />
    </form>
  );
}

// import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("Hey"),
  amount: yup.number()
    .typeError("Amount must be a number")
    .required("Please provide plan cost.")
    .min(3, "Too little")
    .max(10, "Very costly!"),
});

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors.firstName?.message}</p>

      {/* <input type="number" {...register("age")} />
          <p>{errors.age?.message}</p>
           */}
      <input type="number" {...register("amount")} />
      <p>{errors.amount?.message}</p>

      <input type="submit" />
    </form>
  );
}

