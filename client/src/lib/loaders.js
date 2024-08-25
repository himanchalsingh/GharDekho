import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/post/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  console.log(request.url);
  const query = request.url.split("?")[1]; // splite to get main query
  console.log(query);
  const postPromise = apiRequest("/post?" + query); //postpromis dont use await as react rauter dom use this data
  return defer({
    //for geting error message and suspense use is alsso form here working
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
