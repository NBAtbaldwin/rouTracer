import values from 'lodash/values';

export const routeSelector = state => values(state.entities.routes);
