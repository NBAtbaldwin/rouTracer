export const getRoutes = () => {
  return $.ajax({
    method: "GET",
    url: "/api/routes"
  });
}

export const getRoute = (id) => {
  return $.ajax({
    method: "GET",
    url:`/api/routes/${id}`
  });
}

export const createRoute = (route) => {
  return $.ajax({
    method: "POST",
    url:`/api/routes/`,
    data: { route }
  });
}

export const updateRoute = (route) => {
  return $.ajax({
    method: "PATCH",
    url:`/api/routes/${route.id}`,
    data: { route }
  });
}

export const deleteRoute = (id) => {
  return $.ajax({
    method: "DELETE",
    url:`/api/routes/${id}`
  });
}
