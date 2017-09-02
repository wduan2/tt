import axios from 'axios'

let nextRouteId = 0;

export const ADD_ROUTE_REQUEST = 'ADD_ROUTE_REQUEST';
export const ADD_ROUTE_SUCCESS = 'ADD_ROUTE_SUCCESS';
export const ADD_ROUTE_FAILURE = 'ADD_ROUTE_FAILURE';
export const TOGGLE_ROUTE = 'TOGGLE_ROUTE';

export const fetchRouteRequest = () => {
    return {
        type: ADD_ROUTE_REQUEST
    }
};

export const fetchRouteSuccess = (route) => {
    return {
        type: ADD_ROUTE_SUCCESS,
        id: nextRouteId++,
        route
    }
};

export const fetchRouteFailure = (error) => {
    return {
        type: ADD_ROUTE_FAILURE,
        error
    }
};

export const toggleRoute = (id) => {
    return {
        type: TOGGLE_ROUTE,
        selected: true,
        id
    }
};

export function fetchRoutes() {

    return (dispatch) => {
        dispatch(fetchRouteRequest());

        return axios.get('/api/routes')
            .then(resp => toRoutes(resp.data), err => dispatch(fetchRouteFailure(err)))
            .then(routes =>
                routes.forEach(route => dispatch(fetchRouteSuccess(route))))
    }
}

function toRoutes(routes) {
    return routes.map(route => {
        return {
            routeId: route['route_id'],
            longName: route['route_long_name']
        }
    });
}
