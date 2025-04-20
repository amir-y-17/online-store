import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";

import Button from "../../Components/Form/Button";
export default function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("ایمیل معتبر نیست")
        .required("ایمیل الزامی است"),
      password: Yup.string()
        .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد")
        .required("رمز عبور الزامی است"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });
  const getBorderColor = (field) => {
    if (formik.touched[field]) {
      return formik.errors[field] ? "2px solid red" : "2px solid green";
    }
    return "1px solid #ccc";
  };

  const userLogin = (event) => {
    event.preventDefault();
    console.log("user is login");
  };

  return (
    <>
      <Navbar />

      <div className="container-main">
        <div className="main-content">
          <div className="all-form">
            <div className="left">
              <h2 className="titles">به فروشگاه خوش آمدید</h2>
              <form>
                <div className="form-group">
                  <label>ایمیل</label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    style={{
                      border: getBorderColor("email"),
                      borderRadius: 4,
                    }}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>رمز</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    style={{
                      border: getBorderColor("password"),
                      borderRadius: 4,
                    }}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                  )}
                </div>
                <Button
                  className="btn btn-primary mt-3 w-100 "
                  type="submit"
                  onClick={userLogin}
                >
                  وارد شدن
                </Button>
                <div className="link-login">
                  حساب کاربری داری؟
                  <Link to="/register">
                    {""}
                    اینجا
                    {""}
                  </Link>
                  کلیک کن
                </div>
              </form>
            </div>
            <div className="right">
              <img
                src="/images/Register.jpg"
                alt="عکس لود نشد..."
                className="pic-log"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
