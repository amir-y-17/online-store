import React, { useEffect } from "react";
import { data, Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./Register.css";
export default function Register() {


  // const newUser = {
  //   username: 'babak',
  //   email:'babaki@gamil.com',
  //   password: '142536'
  // };
  // useEffect(()=>{
  //   fetch(`http://localhost:8000/api/auth/register/` ,{
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body : JSON.stringify(newUser)

  //   }).then(res => {
  //     console.log(res);
  //     res.json()
  //   }).then(data => {
  //     console.log(data)
  //   })
  // },[])

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
                  <label>نام کاربری</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>ایمیل</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label>رمز</label>
                  <input type="password" className="form-control" />
                </div>
                <button className="btn btn-primary mt-3 w-100">ثبت نام</button>
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
