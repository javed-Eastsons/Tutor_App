import axios from "axios";

export async function postReqest(url, data) {
  //without auth
  console.log(url, data);
  return axios
    .post(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((responseData) => {
      return responseData.data;
    })
    .catch((error) => {
      console.log(error);
      return error.request.response;
    });
}

export async function putRequest(url, data) {
  return axios
    .put(url, data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((responseData) => responseData.data)

    .catch((error) => {
      console.log(error.request.response);
      return error.request.response;
    });
}

export async function getRequest(url, data) {
  return fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((responseData) => responseData.json())
    .catch((error) => {
      //  console.error(error);
    });
}

export async function deleteRequest(url) {
  return axios
    .delete(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((responseData) => responseData.data)
    .catch((error) => {
      // console.error(error);
    });
}
