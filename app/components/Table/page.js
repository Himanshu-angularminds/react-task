"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { GetUser } from "@/services/usersApi";
import { BsPencil, BsTrash } from "react-icons/bs";
import UserAdd from "../Model/UserAddModel";

const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    totalRows: 0,
    perPage: 10,
    page: 1,
  });
  //   const [sort, setSort] = useState({ field: "id", direction: "asc" });
  const [sort, setSort] = useState({});
  let userBearer;
  if (typeof window !== "undefined") {
    userBearer = localStorage.getItem("UserData");
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await GetUser({
        userBearer,
        page: pagination.page,
        limit: pagination.perPage,
        sort: `${sort.field},${sort.direction}`,
      });
      setUserData(response.results);
      setPagination((prev) => ({
        ...prev,
        totalRows: response.totalResults,
      }));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         // Fetch data from API with pagination, sorting, and limit parameters
  //         const response = await GetUser({
  //           userBearer,
  //           page: pagination.page,
  //           limit: pagination.perPage,
  //           sort: `${sort.field},${sort.direction}`,
  //         });

  //         // Set user data and total rows for pagination
  //         setUserData(response.results);
  //         setPagination((prev) => ({
  //           ...prev,
  //           totalRows: response.totalResults,
  //         }));
  //         setLoading(false);
  //       } catch (error) {
  //         console.log(error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  // Columns definition for DataTable
  const columns = [
    {
      name: "Sr. No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: "name",
      sortable: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div className="d-flex">
            <button className="btn btn-link" onClick={() => handleEdit(row.id)}>
              <BsPencil size={20} style={{ color: "red" }} />
            </button>
            <button
              className="btn btn-link"
              onClick={() => handleDelete(row.id)}
            >
              <BsTrash size={20} style={{ color: "red" }} />
            </button>
          </div>
        </>
      ),
    },
    // Add more columns as needed
  ];

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleSort = (column, direction) => {
    setSort({ field: column.selector, direction });
  };

  const handleEdit = (userId) => {
    alert("edit", userId);
    console.log("Edit User: ", userId);
  };

  const handleDelete = async (userId) => {
    // try {
    //   await DeleteUser(userId);
    //   // Logic to update UI after successful deletion (e.g., refetch data)
    //   fetchData();
    // } catch (error) {
    //   console.error(error);
    // }
    alert("delete", userId);
  };
  // Custom styles for DataTable rows
  const customStyles = {
    rows: {
      style: {
        minHeight: "52px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", 
        paddingRight: "8px",
        fontWeight: "bold", 
      },
    },
    cells: {
      style: {
        paddingLeft: "5px", 
        paddingRight: "5px",
      },
    },
  };

  return (
    <>
      <div className="container mt-5">
        <div className="mt-3 mb-5 d-flex justify-content-end align-items-center">
          <div className="d-flex mt-10">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button
            className="btn btn-outline-danger"
            onClick={() => setShowModal(true)}
          >
            Add User
          </button>
        </div>
        <DataTable
          title="User Data"
          columns={columns}
          data={userData}
          fixedHeader
          customStyles={customStyles}
          pagination
          paginationServer
          paginationTotalRows={pagination.totalRows}
          paginationPerPage={pagination.perPage}
          paginationRowsPerPageOptions={[10, 20, 30, 50]}
          paginationComponentOptions={{
            rowsPerPageText: "Rows per page:",
            rangeSeparatorText: "of",
          }}
          onChangeRowsPerPage={(perPage) =>
            setPagination((prev) => ({ ...prev, perPage, page: 1 }))
          }
          onChangePage={handlePageChange}
          onSort={handleSort}
          sortServer
          progressPending={loading}
          striped
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
      <UserAdd show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
};

export default UserDataTable;