import fetchApi from "@/utils/fetchApi";
const baseUrl = "https://shop-api.ngminds.com";

export const GetUser = async ({ userBearer, page, limit, sort }) => {
  let auth = { Authorization: `Bearer ${userBearer}` };
  return await fetchApi(
    `${baseUrl}/users?page=${page}&limit=${limit}`,
    "GET",
    "",
    auth
  );
};

export const CreateUser = async (values, userBearer) => {
  let auth = { Authorization: `Bearer ${userBearer}` };
  return await fetchApi(`${baseUrl}/users`, "POST", values, auth);
};

export const GetUserDetail = async (userId, userBearer) => {
  let auth = { Authorization: `Bearer ${userBearer}` };
  return await fetchApi(`${baseUrl}/users/${userId}`, "GET", "", auth);
};

export const UpdateUserDetail = async (userId,data,userBearer) => {
  let auth = { Authorization: `Bearer ${userBearer}` };
  return await fetchApi(`${baseUrl}/users/${userId}`, "PATCH", data, auth);
};

export const UpdateUserRole = async (userId,data,userBearer) => {
  let auth = { Authorization: `Bearer ${userBearer}` };
  return await fetchApi(`${baseUrl}/users/role/${userId}`, "PATCH", data, auth);
};

export const DeleteUser = async (userId, userBearer) => {
  console.log(userId, userBearer,"userId, userBearer342");
  let auth = { Authorization: `Bearer ${userBearer}` };
  return await fetchApi(`${baseUrl}/users/${userId}`, "DELETE", "", auth);
};
