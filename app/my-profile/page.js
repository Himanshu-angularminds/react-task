"use client";
import React, { useEffect, useState } from "react";
import AuthGuard from "@/utils/authGuard";
import { userProfile, userProfileUpdate } from "@/services/api";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/Navbar/Navbar";
import Snackbar from "../components/snackbar/page";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [result, setResult] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    isEmailVerified: "",
    companyName: "",
    companyId: "",
  });

  let userBearer;
  const router = useRouter();
  const handleCloseSnackbar = () => {
    setResult(null);
  };
  if (typeof window !== "undefined") {
    userBearer = localStorage.getItem("UserData");
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userProfile(userBearer);
        setUserData(response);
        const verified = response?.isEmailVerified === true ? "True" : "False";
        setFormValues({
          name: response?.name || "",
          email: response?.email || "",
          role: response?.role || "",
          isEmailVerified: verified,
          companyName: response?._org?.name || "",
          companyId: response?._org?.email || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userBearer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const { companyName, companyId } = formValues;
    let data = {
      email: companyId,
      name: companyName,
    };
    await userProfileUpdate(data, userBearer)
      .then((res) => {
        setResult({ success: true, message: "Data Updated successfully!" });
      })
      .catch((err) => {
        setResult({ success: false, error: err.response.data.message });
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("UserData");
    router.push("/login");
  };
  return (
    <>
      <AuthGuard>
        <Navbar />
        <div className="container mx-auto mt-5 p-4 rounded border shadow mb-5">
          <div className="row justify-content-center">
            <div className="col-md-4 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                <img
                  className="rounded-circle mt-5"
                  src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/h0kvromeujgdyexmj42o"
                  width="150px"
                  alt="Profile Picture"
                />
                <span className="fw-bold">{userData?.name}</span>
                <span className="fw-bold">{userData?.email}</span>
              </div>
            </div>
            <div className="col-md-6 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <h4 className="text-right fw-bold">Profile Settings</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="col mt-2 mb-2 fw-bold">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formValues.name}
                      className="form-control"
                      placeholder="First Name"
                      disabled
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-2 fw-bold">
                    <label className="labels">Email ID</label>
                    <input
                      type="text"
                      name="email"
                      value={formValues.email}
                      className="form-control"
                      placeholder="Enter Email ID"
                      disabled
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-2 fw-bold">
                    <label className="labels">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formValues.role}
                      className="form-control"
                      placeholder="Role"
                      disabled
                      // onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-2 fw-bold">
                    <label className="labels">Is Email Verified</label>
                    <input
                      type="text"
                      name="isEmailVerified"
                      value={formValues.isEmailVerified}
                      className="form-control"
                      placeholder="Is Email Verified"
                      // onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="col-md-12 mb-2 fw-bold">
                    <label className="labels">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formValues.companyName}
                      className="form-control"
                      placeholder="Company Name"
                      onChange={handleInputChange}
                    />
                    {/* {formik.errors.companyName &&
                      formik.touched.companyName && (
                        <div className="text-danger">
                          {formik.errors.companyName}
                        </div>
                      )} */}
                  </div>
                  <div className="col-md-12 mb-2 fw-bold">
                    <label className="labels">Company Email ID</label>
                    <input
                      type="text"
                      name="companyId"
                      value={formValues.companyId}
                      className="form-control"
                      placeholder="Company Email ID"
                      onChange={handleInputChange}
                    />
                    {/* {formik.errors.companyID && formik.touched.companyID && (
                      <div className="text-danger">
                        {formik.errors.companyID}
                      </div>
                    )} */}
                  </div>
                  <div className="d-flex justify-content-center mb-2 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        handleSubmit();
                      }}
                      className="btn btn-danger btn-lg "
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger ms-1 btn-lg fw-bold"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: "9999",
        }}
      >
        {result && <Snackbar result={result} onClose={handleCloseSnackbar} />}
      </div>
        </div>
      </AuthGuard>
    </>
  );
};

export default Profile;
