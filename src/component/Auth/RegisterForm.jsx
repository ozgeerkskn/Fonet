import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Formik, Form } from "formik";

import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  role: "",
};
const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    console.log("Form values", values);
    dispatch(registerUser({ userData: values, navigate }));
  };
  return (
    <div>
      <Typography variant="h5" className="text-center">
        Register
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            as={TextField}
            name="fullName"
            label="fullName"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="email"
            label="email"
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <Field
            as={TextField}
            name="password"
            label="password "
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
          />

          <Field
            fullWidth
            margin="normal"
            as={Select}
            labelId="role-simple-select-label"
            id="demo-simple-select"
            name="role"
            //value={age}

            //onChange={handleChange}
          >
            <MenuItem
              style={{ backgroundColor: "#0D0D0D" }}
              value={"ROLE_CUSTOMER"}
            >
              Customer
            </MenuItem>
            <MenuItem
              style={{ backgroundColor: "#0D0D0D" }}
              value={"ROLE_REAL_ESTATE_OWNER"}
            >
              Real Estate Owner
            </MenuItem>
          </Field>

          <Button
            sx={{ mt: 2, padding: "1rem" }}
            fullWidth
            type="submit"
            variant="contained"
          >
            Register
          </Button>
        </Form>
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        If have an account already?
        <Button size="small" onClick={() => navigate("/account/login")}>
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
