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
