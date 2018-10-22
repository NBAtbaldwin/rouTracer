import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import * as MapUtil from './../../util/map_util';
import * as ConversionUtil from './../../util/conversion_util';
import { merge } from 'lodash';

function parseDist(str) {
  return parseFloat(str.split(" ")[0]);
}

class RouteBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: this.props.defaultRoute,
      activity_type: "WALKING",
      WALKING: "selected",
      BICYCLING: "",
      modal: "hidden",
      dirDisplay: "",
      service: "",
      history: [],
      wayPoints: [],
      startMarker: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.toggleActivityType =  this.toggleActivityType.bind(this);
    this.toggleModal =  this.toggleModal.bind(this);
    this.undo = this.undo.bind(this);
  }

  componentDidMount() {
    if (this.props.flag === true) {
      this.props.fetchRoute(this.props.match.params.routeId).then(() => {
        // logic for editing route
        this.getInitialRouteState();
        const directionsDisplay = this.initializeMapState.bind(this)();
        this.displayFetchedRoute.bind(this)();
        // listens for user's click on map
        this.mapClickListener.bind(this)();
        // listens for change in direction directly after user's click
        directionsDisplay.addListener('directions_changed', this.updateRoute.bind(this));
      });
      } else {
        // sets geolocation
        const directionsDisplay = this.initializeMapState.bind(this)();
        MapUtil.currentPosition.bind(this)();
        // listens for user's click on map
        this.mapClickListener.bind(this)();
        // listens for change in direction directly after user's click
        directionsDisplay.addListener('directions_changed', this.updateRoute.bind(this));
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.routeId !== nextProps.match.params.routeId) {
    this.props.fetchRoute(nextProps.match.params.routeId).then(() => {
      // switch route url manually
      this.getInitialRouteState();
      const directionsDisplay = this.initializeMapState.bind(this)();
      this.displayFetchedRoute.bind(this)();
      // listens for user's click on map
      this.mapClickListener.bind(this)();
      // listens for change in direction directly after user's click
      directionsDisplay.addListener('directions_changed', this.updateRoute.bind(this));
  });
  }
};

  updateRoute() {
    let markerCoords = MapUtil.getMarkers(this.state.dirDisplay);
    this.setState({
      wayPoints: MapUtil.getWayPointsWithStartEnd(markerCoords),
    });
    let distance = MapUtil.getDistance(this.state.dirDisplay);
    let duration = MapUtil.getDuration(this.state.dirDisplay);
    let coords = this.state.dirDisplay.getDirections().routes[0].overview_polyline;
    let travelMode;
    this.state.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;
    let route = {
      distance: distance,
      coordinates_list: coords,
      est_duration: duration,
      marker_coordinates: markerCoords,
      activity_type: travelMode,
    };
    let updatedRoute = merge({}, this.state.route, route);
    this.setState({ route: updatedRoute });
    let arr = this.state.history;
    arr.push(markerCoords);
    this.setState({ history: arr });
    console.log(this.state.wayPoints);
  }

  mapClickListener() {
    google.maps.event.addListener(this.map, "click", (evt) => {
      if (this.state.wayPoints.length === 0) {
        this.setState({
          wayPoints: [{location: evt.latLng}],
          startMarker: new google.maps.Marker({
            position: evt.latLng,
            title: '#',
            map: this.map,
          }),
        });
      } else {
        let travelMode;
        if (this.state.startMarker !== null) this.state.startMarker.setMap(null);
        this.state.route.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;

        MapUtil.displayRoute(this.state.wayPoints[0], evt.latLng, this.state.service, this.state.dirDisplay, travelMode, MapUtil.getMiddleWayPoints(this.state.wayPoints));
      }
    });
  }

  getInitialRouteState() {
    this.setState({ route: {
      id: this.props.route.id,
      distance: this.props.route.distance,
      coordinates_list: this.props.route.coords,
      est_duration: this.props.route.duration,
      marker_coordinates: this.props.route.markerCoords,
      est_duration: this.props.route.est_duration,
      elevation: this.props.route.elevation,
      route_name: this.props.route.route_name,
      activity_type: this.props.route.activity_type,
      description: this.props.route.description,
      user_id: this.props.route.user_id,
    }, WALKING: "", BICYCLING: "",
    }, () => {
      this.setState({activity_type: this.state.route.activity_type, [this.state.route.activity_type]: "selected"})
    });
  }

  displayFetchedRoute() {
    let coords = this.props.route.marker_coordinates;
    this.setState({
      wayPoints: MapUtil.getWayPointsWithStartEnd(coords)
    });
    MapUtil.displayRoute(this.state.wayPoints[0], this.state.wayPoints[this.state.wayPoints.length-1], this.state.service, this.state.dirDisplay, this.props.route.activity_type, MapUtil.getMiddleWayPoints(this.state.wayPoints));
  }

  initializeMapState() {
    const service = new google.maps.DirectionsService;
    this.map = new google.maps.Map(this.mapNode, MapUtil.mapOptions);
    let directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
    });
    this.setState({dirDisplay: directionsDisplay, service: service});
    return directionsDisplay;
  }

  update(field) {
    return (e) => {
      let route = { [field]: e.target.value };
      let updatedRoute = merge({}, this.state.route, route);
      this.setState({route: updatedRoute });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state.route).then((route) => {
    this.props.history.push(`/routes/${route.route.id}`)
    });
  };

  toggleActivityType(type) {
    return (e) => {
      let route = { activity_type: type};
      let updatedRoute = merge({}, this.state.route, route);
      this.setState({WALKING: "", BICYCLING: "" });
      this.setState({ activity_type: type, [type]: "selected" });

      this.setState({route: updatedRoute }, () => {
        // reroute directions service after button click changes state
        let last = this.state.route.marker_coordinates.length - 1;
        MapUtil.displayRoute(MapUtil.coordsObjFromArray(this.state.route.marker_coordinates[0], this.state.route.marker_coordinates[1]), MapUtil.coordsObjFromArray(this.state.route.marker_coordinates[last-1], this.state.route.marker_coordinates[last]), this.state.service, this.state.dirDisplay, this.state.route.activity_type, MapUtil.getWayPoints(this.state.route.marker_coordinates));
      });
    };
  }

  undo() {
    if (this.state.history.length < 2) {
      return;
    }
    const route = { marker_coordinates: this.state.history[this.state.history.length-2]};
    const blank = { marker_coordinates: "" };
    const reset = merge({}, this.state.route, blank);
    const updatedRoute = merge({}, reset, route);

    this.setState({route: updatedRoute}, () => {
      // reroute directions service after button click changes state
      let last = this.state.route.marker_coordinates.length - 1;
      MapUtil.displayRoute(MapUtil.coordsObjFromArray(this.state.route.marker_coordinates[0], this.state.route.marker_coordinates[1]), MapUtil.coordsObjFromArray(this.state.route.marker_coordinates[last-1], this.state.route.marker_coordinates[last]), this.state.service, this.state.dirDisplay, this.state.route.activity_type, MapUtil.getWayPoints(this.state.route.marker_coordinates));
      const arr = this.state.history;
      arr.pop();
      arr.pop();
      this.setState({history: arr});
    });
  }

  toggleModal() {
    this.state.modal === "hidden" ? this.setState({modal: "modal-background"}) : this.setState({modal: "hidden"})
  }

  render() {

    const that = this;
    const mapRender = () => {
      if (that.state.route !== null) {
        return (
          <div className="routebuilder-main">
            <div className="routebuilder-navbar">
              <ul>
                <li><Link to="/">RouTracer</Link></li>
                <li>route builder</li>
              </ul>
              <ul>
                <Link to="/routes">Exit Builder</Link>
              </ul>
            </div>
            <div className="routebuilder-toolbar">
              <ul>
                <li>
                  <button className={that.state.BICYCLING} onClick={that.toggleActivityType("BICYCLING")}><i className="fas fa-bicycle"></i>Ride</button>
                </li>
                <li>
                  <button className={that.state.WALKING} onClick={that.toggleActivityType("WALKING")}><i className="fas fa-shoe-prints"></i>Run</button>
                </li>
                <li>
                  <button onClick={that.undo}><i className="fas fa-undo"></i>Undo</button>
                </li>
              </ul>
              <ul>
                <li>
                  <button onClick={that.toggleModal}>Save</button>
                </li>
              </ul>
            </div>
            <div className={that.state.modal}>
              <form onSubmit={that.handleSubmit} className={that.state.modal}>
                <h1>Save</h1>
                <div>
                  <p>Enter a name and description for your route below. On the next page, you'll be able to see and edit your route.</p>
                  <div>
                    <label>Route Name (required)</label>
                    <input type="text"
                      value={that.state.route.route_name}
                      onChange={that.update('route_name')} />
                  </div>
                  <div>
                    <label>Description</label>
                    <textarea value={that.state.route.description}
                    onChange={that.update('description')} />
                  </div>
                </div>
                <input type="hidden" value={that.state.route.coordinates_list} />
                <input type="hidden" value={that.state.route.est_duration} />
                <input type="hidden" value={that.state.route.distance} />
                <input type="hidden" value={that.state.route.marker_coordinates} />
                <div>
                  <li className="modal-click" onClick={that.toggleModal}>Cancel</li>
                  <button type="submit" value="save">Save</button>
                </div>
              </form>
            </div>
            <div id='map-container' ref={ map => that.mapNode = map }>
            </div>
            <ul className="dynamic-totals">
              <div>
                <ul>
                  <li>{that.state.route.activity_type.toLowerCase()}</li>
                  <li>Route Type</li>
                </ul>
                <ul>
                  <li>{(that.state.route.distance).toFixed(2)}</li>
                  <li>Distance</li>
                </ul>
                <ul>
                  <li>{that.state.route.elevation}</li>
                  <li>Elevation Gain</li>
                </ul>
                <ul>
                  <li>{ConversionUtil.hrsMinsSecs(that.state.route.est_duration)}</li>
                  <li>Est. Moving Time</li>
                </ul>
              </div>
            </ul>
          </div>
        );
      } else {
        return (
          <div>Loading</div>
        );
      }
    }
    return (
      <div className="routebuilder-master">
        {mapRender()}
      </div>
    );
  }
}

export default withRouter(RouteBuilder);
