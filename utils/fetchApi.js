import axios from "axios";

const fetchApi = async (url, method = "GET", data = {}, headers = {}) => {
  console.log("URL:", url);
  console.log("Method:", method);
  console.log("Data:", data);
  console.log("Headers:", headers);

  let headerData = headers;
  // const session = await getSession();
  // console.log('session:', session);
  // if (session) {
  //   headerData = {
  //     Authorizations: session.user.auth_token,
  //     userid: session.user.user_id,
  //   };
  // }

  console.log("Header Data:", headerData);

  try {
    const result = await axios(`${url}`, {
      method,
      headers: headerData,
      data,
    });

    const response = await result.data;
    console.log("API Response:", response);

    // if (!response.status && response.status_code === 100) {
    //   console.log("Session expired. Signing out...");
    //   // signOut({
    //   //   redirect: false,
    //   //   // callbackUrl: `${window.location.origin}`,
    //   // }).then((res) => {
    //   //   localStorage.removeItem("cartData");
    //   //   // router.push(window.location.origin)
    //   //   localStorage.removeItem("location");
    //   // });
    // }

    // if (!response.status) {
    //   throw new Error(JSON.stringify(response));
    // }
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default fetchApi;
