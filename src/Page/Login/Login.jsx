import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { loginUser } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use useContext here to access login function

    // Define initial form values
    const initialValues = {
        email: '',
        password: '',
    };

    // Define validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const data = await loginUser(values.email, values.password);
            if (data.token) {
                // Save token and log user in
                login(data.token);
                navigate("/home");
            } else {
                setErrors({ general: "Login failed: No token received." });
            }
        } catch (error) {
            setErrors({
                general: error.message || "Invalid email or password",
            });
        }
        setSubmitting(false);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </div>
                            {errors.general && <p className="text-danger">{errors.general}</p>}
                            <button type="submit" className="login-button btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? <div className="spinner"></div> : "Login"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
