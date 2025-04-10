import React from 'react'
import './Login.css'
import Navbar from '../../Components/Navbar/Navbar'
import { Link } from 'react-router-dom'
export default function Login() {
  return (
    <>
      <Navbar/>
      <div className="container-main">
        <div className="main-content">
          <div className="all-form">
            <div className="left">
              <h2 className="titles">ورود به فروشگاه</h2>
              <form>
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
                  حساب کاربری نداری؟
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
  )
}
