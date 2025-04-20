import React from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery } from "@mui/material";
import "./Navbar.css";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <div className="all-navbar">
        <div className="right-navbar">
          {isMobile ? (
            <MenuIcon />
          ) : (
            <>
              <img
                src="/images/Register.jpg"
                alt="عکس لود نشد..."
                className="logo"
              />
              <div className="menus">
                <ul className="menu">
                  <li className="item-links">
                    <Link to="/" className="links active">

                      صفحه اصلی
                    </Link>
                  </li>
                  <li className="item-links">
                    <Link to="/" className="links">
                      محصولات
                    </Link>
                  </li>
                  <li className="item-links">
                    <Link to="/" className="links">
                      لپ تاب
                    </Link>
                  </li>
                  <li className="item-links">
                    <Link to="/" className="links">
                      گوشی
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="left-navbar">
          <Link to={'/login'}>
          <button className="login">ثبت نام / ورود</button>
          </Link>
        </div>
      </div>
    </>
  );
}
