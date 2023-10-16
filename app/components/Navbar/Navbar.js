"use client";

import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ModelChangePassword from "../Model/ModelChangePassword";
import { useRouter } from "next/navigation";
import ModelEmailVerify from "../Model/ModelEmailVerify";
import { BsPersonCircle } from "react-icons/bs";
import { usePathname } from "next/navigation";


const Navbar = ({ currentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalverify, setShowModalVerify] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = () => {
    localStorage.removeItem("UserData");
    router.push("/login");
  };
  console.log(pathname,'pathname');
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark p-1 bg-danger"
        id="headerNav"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              className="rounded-circle"
              src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/h0kvromeujgdyexmj42o"
              height="80"
              alt="Logo"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className={`nav-link ${pathname === "/my-profile" ? "active": ""}`} href="my-profile">
                  Profile
                </a>
              </li>
              <li className="nav-item">
              <a className={`nav-link ${pathname === "/users" ? "active": ""}`} href="users">
                  User Data
                </a>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <BsPersonCircle style={{
                      fontSize: "2rem",
                      color: "white",
                      width: "34px",
                      height: "34px",
                    }}/>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setShowModal(true)}
                    >
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => setShowModalVerify(true)}
                    >
                      Email Verification
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <ModelChangePassword
        showModal={showModal}
        closeModal={() => setShowModal(false)}
      />
      <ModelEmailVerify
        showModalverify={showModalverify}
        closeModalVerify={() => setShowModalVerify(false)}
      />
    </>
  );
};

export default Navbar;
