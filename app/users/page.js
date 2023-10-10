"use client";

import React from "react";
import AuthGuard from "@/utils/authGuard";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar/Navbar";
import UserDataTable from "../components/Table/page";

const Users = () => {

  return (
    <>
      <AuthGuard>
        <Navbar/>
        <UserDataTable />
      </AuthGuard>
    </>
  );
};

export default Users;
