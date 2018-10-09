import values from 'lodash/values';

export const routeSelector = (state) => {
  let vals = values(state.entities.routes);
  const output = [];
  vals.forEach( val => {
    if (val.user_id === state.session.id) {
      output.push(val)
    }
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

export const routeSelectorHash = (state) => {
  let routes = state.entities.routes;
  const output = {};
  Object.keys(routes).forEach( key => {
    if (routes[key].user_id == state.session.id) {
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

export const friendsSelector = (state) => {
  let users = state.entities.users;
  let currentUser = users[state.session.id];
  const output = {};
  Object.keys(users).forEach( id => {
    if (id != state.session.id && currentUser.friend_ids.includes(parseInt(id))) {
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
    if (currentUser.requester_ids.includes(id)) {
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
    if (currentUser.requested_ids.includes(id)) {
      output.push(users[id]);
    }
  });
  return output;
}

// export const strangersSelector = (state) => {
//   let users = state.entities.users;
//   let currentUser = users[state.session.id];
//   const output = [];
//   Object.keys(users).forEach( id => {
//     if (!currentUser.friend_ids.includes(parseInt(id)) && id != currentUser.id) {
//       output.push(users[id]);
//     }
//   });
//   return output;
// }
