import { deleteMethod, get, post, put } from "../utils/request";

// get all
export const GetPostsByCategory = async (slug, params) => {
  const res = await get(`Posts/GetPostsByCategory/${slug}`, params);
  return res;
};
export const GetCategories = async () => {
  const res = await get(`Categories`);
  return res;
};
export const GetPostById = async (id) => {
  const res = await get(`Posts/${id}`);
  return res;
};
export const GetUserByToken = async (token) => {
  const res = await get(`Users/${token}`);
  return res;
};
export const GetPostsByProvinceSlug = async (id, params) => {
  const res = await get(`Posts/GetPostsByProvinceSlug/${id}`, { params });
  return res;
};

export const GetUserPosts = async (id) => {
  const res = await get(`Users/GetUserPosts/${id}`);
  return res;
};
export const GetCountPost = async (id) => {
  const res = await get(`Posts/GetCount`);
  return res;
};
export const GetCountUserPost = async (id) => {
  const res = await get(`Users/countPost/${id}`);
  return res;
};

export const CheckFavorite = async (params) => {
  const res = await get(`Users/CheckFavorite`, params);
  return res;
};
export const CheckDeposite = async (params) => {
  const res = await get(`Booking/CheckUserBooking`, params);
  return res;
};
export const GetUserFavorite = async (id) => {
  const res = await get(`Users/GetUserFavorite/${id}`);
  return res;
};
export const GetUserBookings = async (id) => {
  const res = await get(`Booking/GetUserBookings/${id}`);
  return res;
};
export const GetApprovedPosts = async (params) => {
  const res = await get(`Posts/GetApprovedPosts`, { params });
  return res;
};

export const GetNewsById = async (id) => {
  const res = await get(`News/${id}`);
  return res;
};

export const GetReviewsByPost = async (slug) => {
  const res = await get(`Reviews/GetReviewsByPost/${slug}`);
  return res;
};

export const GetReviews = async (params) => {
  const res = await get(`Reviews`, params);
  return res;
};
export const GetReports = async (params) => {
  const res = await get(`Reports`, params);
  return res;
};

export const GetNews = async (params) => {
  const res = await get(`News`, params);
  return res;
};

export const GetLatestPosts = async () => {
  const res = await get(`Posts/GetLatestPosts`);
  return res;
};

export const GetLocations = async () => {
  const res = await get(`Posts/GetLocations`);
  return res;
};
// post

export const AddFavoritePost = async (params) => {
  const res = await post(`Users/AddFavoritePost`, null, params);
  return res;
};
export const CreatePost = async (params) => {
  const res = await post(`Posts`, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};
export const CreateReport = async (params) => {
  const res = await post(`Reports`, params);
  return res;
};
export const CreateComment = async (params) => {
  const res = await post(`Reviews`, params);
  return res;
};
export const CreateBooking = async (params) => {
  const res = await post(`Booking`, params);
  return res;
};

export const UpdatePost = async (id, params) => {
  const res = await put(`Posts/${id}`, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};

export const UpdateUser = async (id, params) => {
  const res = await put(`Users/${id}`, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};
// delete
export const DeletePost = async (id, params) => {
  const res = await deleteMethod(`Posts/${id}`, params, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res;
};
// login
export const Login = async (params) => {
  const res = await post(`Auth/login`, params);
  return res;
};

export const Register = async (params) => {
  const res = await post(`Auth/register`, params);
  return res;
};

export const ForgotPassword = async (params) => {
  const res = await post(`Auth/forgot-password`, params);
  return res;
};

export const ResetPassword = async (params) => {
  const res = await post(`Auth/reset-password`, params);
  return res;
};
