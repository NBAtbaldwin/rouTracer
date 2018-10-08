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
  let vals = values(state.entities.routes);
  const output = [];
  vals.forEach( val => {
    if (val.user_id !== state.session.id) {
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
  let routes = state.entities.routes;
  const output = {};
  Object.keys(routes).forEach( key => {
    if (routes[key].user_id != state.session.id) {
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
  let vals = values(state.entities.activities);
  const output = [];
  vals.forEach( val => {
    if (val.user_id !== state.session.id) {
      output.push(val)
    }
  });
  return output;
}

export const friendsSelector = (state) => {
  let users = state.entities.users
  const output = {};
  Object.keys(users).forEach( id => {
    if (id != state.session.id) {
      output[id] = users[id];
    }
  });
  return output;
}
