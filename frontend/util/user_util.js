export const getUser = (id) => {
  return $.ajax({
    method: 'GET',
    url: `api/users/${id}`
  });
};

export const getUsers = () => {
  return $.ajax({
    method: 'GET',
    url: "/api/users",
  });
};
