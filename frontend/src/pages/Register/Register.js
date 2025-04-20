import {Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Register.css";

import Button from "../../Components/Form/Button";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "حداقل ۳ کاراکتر")
        .required("نام کاربری الزامی است"),
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

  return (
    <>
      <Navbar />
      <div className="container-main">
        <div className="main-content">
          <div className="all-form">
            <div className="left">
              <h2 className="titles">به فروشگاه خوش آمدید</h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label>نام کاربری</label>
                  <input
                    id="username"
                    className="form-control"
                    type="text"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    style={{
                      border: getBorderColor("username"),
                      borderRadius: 4,
                    }}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div style={{ color: "red" }}>{formik.errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <label>ایمیل</label>
                  <input
                    id="email"
                    name="email"
                    className="form-control"
                    type="text"
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
                    id="password"
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
                <Button className="btn btn-primary mt-3 w-100 " type="submit">
                  ثبت نام
                </Button>
                <div className="link-login">
                  حساب کاربری داری؟
                  <Link to="/login">
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
