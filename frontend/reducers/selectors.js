import values from 'lodash/values';

export const allUsersSelector = (state) => {
  let vals = values(state.entities.users);
  const output = [];
  vals.forEach( val => {
    output.push(val)
  });
  return output;
}

export const routeSelector = (state) => {
  let vals = values(state.entities.routes);
  const output = [];
  vals.forEach( val => {
    output.push(val)
  });
  return output;
}

export const friendsRouteSelector = (state) => {
  let users = state.entities.users;
  let currentUser = users[state.session.id];
  let vals = values(state.entities.routes);
  const output = [];
  vals.forEach( val => {
    if (val.user_id !== currentUser.id && currentUser.friend_ids.includes(val.user_id)) {
      output.push(val)
    }
  });
  return output;
}

export const routeSelectorHash = (state, userId) => {
  if (!userId) { userId = state.session.id };
  const output = {};
  let routes = state.entities.routes;
  Object.keys(routes).forEach( key => {
    if (routes[key].user_id == userId) {
      output[key] = routes[key];
    }
  });
  return output;
}

export const friendsRouteSelectorHash = (state) => {
  let users = state.entities.users;
  let currentUser = users[state.session.id];
  let routes = state.entities.routes;
  const output = {};
  Object.keys(routes).forEach( key => {
    if (routes[key].user_id != currentUser.id && currentUser.friend_ids.includes(routes[key].user_id)) {
      output[key] = routes[key];
    }
  });
  return output;
}

export const userActivitySelector = (state) => {
  let vals = values(state.entities.activities);
  const output = [];
  vals.forEach( val => {
    if (val.user_id === state.session.id) {
      output.push(val)
    }
  });
  return output;
}

export const friendsActivitySelector = (state) => {
  let users = state.entities.users;
  let currentUser = users[state.session.id];
  let vals = values(state.entities.activities);
  const output = [];
  vals.forEach( val => {
    if (val.user_id !== currentUser.id && currentUser.friend_ids.includes(val.user_id)) {
      output.push(val)
    }
  });
  return output;
}

export const agnosticActivitySelector = (state, userId) => {
  let users = state.entities.users;
  let currentUser = users[userId];
  let vals = values(state.entities.activities);
  const output = [];
  if (!currentUser) { return output };
  vals.forEach( val => {
    if (val.user_id == currentUser.id) {
      output.push(val)
    }
  });
  return output;
}

export const friendsSelector = (state, userId) => {
  if (!userId) { userId = state.session.id };
  let users = state.entities.users;
  let currentUser = users[userId];
  const output = {};
  if (!currentUser || !currentUser.friend_ids) { return output }
  Object.keys(users).forEach( id => {
    if (id != userId && currentUser.friend_ids.includes(parseInt(id))) {
      output[id] = users[id];
    }
  });
  return output;
}

export const pendingFriendsSelector = (state) => {
  let users = state.entities.users;
  let currentUser = users[state.session.id];
  const output = [];
  Object.keys(users).forEach( id => {
    if (currentUser.requester_ids.includes(parseInt(id))) {
      output.push(users[id]);
    }
  });
  return output;
}

export const requestedFriendsSelector = (state) => {
  let users = state.entities.users;
  let currentUser = users[state.session.id];
  const output = [];
  Object.keys(users).forEach( id => {
    if (currentUser.requested_ids.includes(parseInt(id))) {
      output.push(users[id]);
    }
  });
  return output;
}

export const strangersSelector = (state) => {
  let users = state.entities.users;
  let currentUser = users[state.session.id];
  let associatedIds = currentUser.friend_ids.concat(currentUser.requester_ids).concat(currentUser.requested_ids)
  const output = [];
  Object.keys(users).forEach( id => {
    if (!associatedIds.includes(parseInt(id)) && id != currentUser.id) {
      output.push(users[id]);
    }
  });
  return output;
}

export const commentSelector = (state, activity_id) => {
  let comments = state.entities.comments;
  const output = [];
  Object.keys(comments).forEach(id => {
    if (comments[id].activity_id == activity_id) output.push(comments[id]);
  });
  return output;
}
