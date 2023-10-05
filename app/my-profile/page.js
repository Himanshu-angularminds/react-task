"use client";
import React, { useEffect, useState } from "react";
import AuthGuard from "@/utils/authGuard";
import { userProfile } from "@/services/api";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/Navbar/Navbar";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    isEmailVerified: "",
    companyName: "",
  });
  let userBearer;
  const router = useRouter();

  if (typeof window !== "undefined") {
    userBearer = localStorage.getItem("UserData");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userProfile(userBearer);
        setUserData(response);
        const verified = response?.isEmailVerified === true ? "True" : "False";
        console.log(response?._org?.name, "response?._org?.name?.companyName");
        setFormValues({
          name: response?.name || "",
          email: response?.email || "",
          role: response?.role || "",
          isEmailVerified: verified,
          companyName: response?._org?.name || "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., update user data
    // You can access formValues to get the updated data
    console.log("Form submitted with values:", formValues);
    alert("Update");
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
                <span className="font-weight-bold">{userData?.name}</span>
                <span className="text-black-50">{userData?.email}</span>
              </div>
            </div>
            <div className="col-md-6 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="col mt-2 mb-2">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formValues.name}
                      className="form-control"
                      placeholder="First Name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="labels">Email ID</label>
                    <input
                      type="text"
                      name="email"
                      value={formValues.email}
                      className="form-control"
                      placeholder="Enter Email ID"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="labels">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formValues.role}
                      className="form-control"
                      placeholder="Role"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="labels">Is Email Verified</label>
                    <input
                      type="text"
                      name="isEmailVerified"
                      value={formValues.isEmailVerified}
                      className="form-control"
                      placeholder="Is Email Verified"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12 mb-2">
                    <label className="labels">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formValues.companyName}
                      className="form-control"
                      placeholder="Company Name"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="d-flex justify-content-center mb-2 mt-4">
                    <button type="button" className="btn btn-primary btn-lg">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-1 btn-lg"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthGuard>
    </>
  );
};

export default Profile;
