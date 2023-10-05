"use client";
import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ModelForget from "../Model/ModelForget";

const Navbar = ({ currentUser }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark p-1 bg-danger" id="headerNav">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item d-none d-lg-block">
            <a className="nav-link mx-2" href="#">
              <img
                className="rounded-circle"
                src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/h0kvromeujgdyexmj42o"
                height="80"
                alt="Logo"
              />
            </a>
          </li>
          <li className="nav-item">
            <a className="navbar-brand d-block d-lg-none" href="#">
              <img
                src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/h0kvromeujgdyexmj42o"
                height="80"
                alt="Logo"
              />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link mx-2 active" aria-current="page" href="my-profile">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link mx-2" href="#">
              User
            </a>
          </li>
        </ul>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDarkDropdown">
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentUser ? currentUser.name : "Account"}
              </a>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => setShowModal(true)}>
                    Change Password
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Email Verification
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Reset Password
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <ModelForget showModal={showModal} closeModal={() => setShowModal(false)} onSubmit={handlePasswordChange} />
    </>
  );
};

export default Navbar;
