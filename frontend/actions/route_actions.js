import * as ApiUtil from './../util/routes_util';
export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
export const DELETE_ROUTE = 'DELETE_ROUTE';
export const RECEIVE_ROUTE_ERRORS = 'RECEIVE_ROUTE_ERRORS';
export const CLEAR_ROUTE_ERRORS = 'CLEAR_ROUTE_ERRORS';

export const receiveAllRoutes = (routes) => ({
  type: RECEIVE_ROUTES,
  routes: routes
});

export const receiveRoute = (route) => ({
  type: RECEIVE_ROUTE,
  route: route
});

export const removeRoute = (routeId) => ({
  type: DELETE_ROUTE,
  routeId: routeId
});

export const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  };
};

export const clearRouteErrors = () => {
  return {
    type: CLEAR_ROUTE_ERRORS
  };
};

export const fetchRoutes = () => dispatch => (
  ApiUtil.getRoutes().then((routes) => (dispatch(receiveAllRoutes(routes))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const fetchRoute = id => dispatch => (
  ApiUtil.getRoute(id).then((route) => (dispatch(receiveRoute(route))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const createRoute = route => dispatch => (
  ApiUtil.createRoute(route).then((route) => (dispatch(receiveRoute(route))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const updateRoute = route => dispatch => (
  ApiUtil.updateRoute(route).then((route) => (dispatch(receiveRoute(route))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const deleteRoute = id => dispatch => (
  ApiUtil.deleteRoute(id).then((route) => (dispatch(removeRoute(id))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);
