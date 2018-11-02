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

export const updateUser = (userData) => {
  return $.ajax({
    url: `/api/users/${userData.getAll('user[id]')}`,
    method: 'PATCH',
    data: userData,
    contentType: false,
    processData: false
  });
}

export const createFriendship = (friendship) => {
  return $.ajax({
    method: 'POST',
    url: "/api/friendships",
    data: { friendship }
  });
}

export const updateFriendship = (friendship) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/friendships/${friendship.id}`,
    data: { friendship }
  });
}

export const deleteFriendship = (friendship) => {
  return $.ajax({
    method: "DELETE",
    url:`/api/friendships/${friendship.id}`,
    data: { friendship }
  });
}

export const getPendingFriendshipUsers = () => {
  return $.ajax({
    method: 'GET',
    url: "/api/friendships",
  });
}
