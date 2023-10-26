"use client"

import React from "react";
import AuthGuard from "@/utils/authGuard";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar/Navbar";
import UserDataTable from "../components/Table/page";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";

const Users = () => {
  const { data } = useSession()
  console.log(data,"session data fromusers page tabel ");

  if (!data) return redirect("/");
  return (
    <>
        <Navbar currentUser={data}/>
        <UserDataTable />
    </>
  );
};

export default Users;
