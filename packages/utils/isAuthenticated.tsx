export const isAuthenticated = () => {
  let token;
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
  }

  return !!token;
};
