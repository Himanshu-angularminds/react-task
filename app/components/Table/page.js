"use client";

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { DeleteUser, GetUser } from "@/services/usersApi";
import { BsPencil, BsTrash } from "react-icons/bs";
import UserAdd from "../Model/UserAddModel";
import DeleteConfirmationModal from "../Model/DeleteUserModel";
import Snackbar from "../snackbar/page";
import debounce from "lodash/debounce";

const UserDataTable = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refreshApi, setRefreshApi] = useState(false);
  const [deletemodel, setDeleteModel] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  // const [sort, setSort] = useState({ field: "id", direction: "asc" });
  const [pagination, setPagination] = useState({
    totalRows: 0,
    perPage: 10,
    page: 1,
  });
  const userBearer = localStorage.getItem("UserData");

  const handleCloseSnackbar = () => {
    setResult(null);
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  // const handleSort = (column, direction) => {
  //   setSort({ field: column.selector, direction });
  // };
  const handleClosemodel = () => {
    setShowModal(false);
    setSelectedUserId(null);
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
      setPagination((prev) => ({
        ...prev,
        page: 1,
      }));
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

  const fetchData = async () => {
    let queryParams = {
      userBearer,
      page: pagination.page,
      limit: pagination.perPage,
      // sort: `${sort.field},${sort.direction}`,
    };
    if (selectedRole) {
      queryParams.role = selectedRole;
    }else if(searchText){
      queryParams.name = searchText;
    }
    try {
      const response = await GetUser(queryParams);
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

  const updateQuery = (e) => setSearchText(e?.target?.value);
  const debouncedOnChange = debounce(updateQuery, 400);

  useEffect(() => {
    fetchData();
  }, [
    refreshApi,
    pagination.page,
    pagination.perPage,
    selectedRole,
    searchText,
  ]);

  return (
    <>
      <div className="container mt-5">
        <div className="mt-3 mb-5 d-flex justify-content-end align-items-center mr-1">
          <div className="col-md-1 me-2">
            <select
              className="form-select"
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              // {...formik.getFieldProps("role")}
            >
              <option value="all" defaultChecked>
                All
              </option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="d-flex mt-10">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search"
              // value={searchText}
              onChange={debouncedOnChange}
              // onChange={(e) => setSearchText(e.target.value)}
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
          // onSort={handleSort}
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
        refreshApi={refreshApi}
        userId={selectedUserId}
        show={showModal}
        handleClose={handleClosemodel}
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
