"use client";

import React, { useEffect, useState } from "react";
import { userProfileVerify, verifyUserEmail } from "@/services/api";
import Snackbar from "../snackbar/page";
import "bootstrap/dist/css/bootstrap.css";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { usePathname } from "next/navigation";

const ModelEmailVerify = ({ showModalverify, closeModalVerify, token }) => {
  let userBearer;
  const pathname = usePathname();
  const [result, setResult] = useState(null);
  const [emailVerify, setEmailVerify] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const isverifyEmail = pathname === "/auth/verify-email";
  const handleCloseSnackbar = () => {
    setResult(null);
  };
  if (typeof window !== "undefined") {
    userBearer = localStorage.getItem("UserData");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        await userProfileVerify(userBearer);
        setResult("true");
        setSuccess(true);
      } catch (error) {
        console.error("Error occurred while verifying email:", error);
        setResult("false");
        setError(true);

      } finally {
        setLoading(false);
      }
    };
    const verifyEmail = async () => {
      try {
        await verifyUserEmail(token);
        setEmailVerify("true");
        setSuccess(true);
      } catch (error) {
        console.error("Error occurred while verifying email:", error);
        setEmailVerify("false");
        setError(true);

      } finally {
        setLoading(false);
      }
    };

    if (showModalverify && !token) {
      fetchData();
    } else if (token) {
      verifyEmail();
    }
  }, [showModalverify,isverifyEmail]);

  const getMessage = () => {
    if (loading) {
      return "Loading..."; 
    } else if (success) {
      return "Email Verified Successfully";
    } else if (error) {
      return "Verification Email Failed. Please try again later."; 
    } else {
      return "Please check your email for further instructions";
    }
  };
  return (
    <>
      <div
        className={`modal ${showModalverify ? "show" : ""} mt-5`}
        tabIndex="-1"
        style={{ display: showModalverify ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Email Verification</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModalVerify}
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
                {loading ? (
                  <div>Loading...</div>
                ) : success ? (
                  <BsFillCheckCircleFill
                    style={{
                      fontSize: "2rem",
                      color: "green",
                      width: "76px",
                      height: "77px",
                      marginLeft: "50px",
                    }}
                  />
                ) : (
                  <BsXCircleFill
                    style={{
                      fontSize: "2rem",
                      color: "red",
                      width: "76px",
                      height: "77px",
                      marginLeft: "50px",
                    }}
                  />
                )}
                <span className={success ? "text-success" : "text-danger"}>
                  {getMessage()}
                </span>
              </div>
              
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={closeModalVerify}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModelEmailVerify;
