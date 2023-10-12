"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { DeleteUser, GetUser } from "@/services/usersApi";
import { BsPencil, BsTrash } from "react-icons/bs";
import UserAdd from "../Model/UserAddModel";
import DeleteConfirmationModal from "../Model/DeleteUserModel";
import Snackbar from "../snackbar/page";

const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refreshApi, setRefreshApi] = useState(false);
  const [deletemodel, setDeleteModel] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    totalRows: 0,
    perPage: 10,
    page: 1,
  });
  const handleCloseSnackbar = () => {
    setResult(null);
  };
  //   const [sort, setSort] = useState({ field: "id", direction: "asc" });
  const [sort, setSort] = useState({});
  const userBearer = localStorage.getItem("UserData");

  useEffect(() => {
    fetchData();
  }, [refreshApi]);

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

  const columns = [
    {
      name: "Sr. No",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div className="d-flex">
            <button
              className="btn btn-link"
              onClick={() => handleEdit(row._id)}
            >
              <BsPencil size={20} style={{ color: "red" }} />
            </button>
            <button
              className="btn btn-link"
              onClick={() => handleDelete(row._id)}
            >
              <BsTrash size={20} style={{ color: "red" }} />
            </button>
          </div>
        </>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleSort = (column, direction) => {
    setSort({ field: column.selector, direction });
  };

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    setSelectedUserId(userId);
    setDeleteModel(true);
  };

  const confirmDelete = async (userId) => {
    try {
      await DeleteUser(userId, userBearer);
      setResult({ success: true, message: "Password Changed Successfully!" });
      setDeleteModel(false);
      setRefreshApi(true);
    } catch (error) {
      console.error(error);
      setResult({
        success: false,
        error: error.response?.data?.message || "An error occurred",
      });
    }
  };
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
          sortactive={handleSort}
          sortServer
          progressPending={loading}
          striped
          highlightOnHover
          pointerOnHover
          responsive
        />
      </div>
      <UserAdd
        setRefreshApi={setRefreshApi}
        userId={selectedUserId}
        show={showModal}
        handleClose={() => setShowModal(false)}
      />
      <DeleteConfirmationModal
        show={deletemodel}
        handleClose={() => setDeleteModel(false)}
        handleConfirmDelete={confirmDelete}
        userId={selectedUserId}
      />
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
    </>
  );
};

export default UserDataTable;