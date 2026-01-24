import axiosInstance from "@/lib/axios";

export async function getAllUsers() {
  const token = localStorage.getItem("authToken");

  return axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUserProfile() {
  const token = localStorage.getItem("authToken");

  return axiosInstance.get("/users/user-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
