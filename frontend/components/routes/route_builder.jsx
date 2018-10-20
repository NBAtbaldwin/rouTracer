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
        const that = this;

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
        const mapOptions = {
          center: {
            lat: 40.7831,
            lng: -73.9712
          },
          zoom: 14,
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_TOP
          },
        };
        const service = new google.maps.DirectionsService;
        let path = new google.maps.MVCArray();
        let poly;
        let infoWindow;
        // creates map
        this.map = new google.maps.Map(this.mapNode, mapOptions)

        let directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: this.map,
        });
        let coords = this.props.route.marker_coordinates

        that.setState({dirDisplay: directionsDisplay, service: service});
        let travelMode = this.props.route.activity_type;
        this.setState({
          wayPoints: MapUtil.getWayPointsWithStartEnd(coords)
        });
        MapUtil.displayRoute(this.state.wayPoints[0], this.state.wayPoints[this.state.wayPoints.length-1], service, directionsDisplay, travelMode, MapUtil.getMiddleWayPoints(this.state.wayPoints));

        poly = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 0,
        });
        poly.setMap(this.map);
        let marker;

        google.maps.event.addListener(this.map, "click", (evt) => {

          that.state.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;

          MapUtil.displayRoute(this.state.wayPoints[0], evt.latLng, service, directionsDisplay, travelMode, MapUtil.getMiddleWayPoints(this.state.wayPoints));


        });

        directionsDisplay.addListener('directions_changed', this.updateRoute.bind(this, this.state.wayPoints));
      });
        } else {
          // logic for creating new route
        const that = this;

        const mapOptions = {
          center: {
            lat: 40.7831,
            lng: -73.9712
          },
          zoom: 14,
          zoomControl: true,
          zoomControlOptions: {
              position: google.maps.ControlPosition.LEFT_TOP
          },
        };
        const service = new google.maps.DirectionsService;
        let path = new google.maps.MVCArray();
        let poly;
        let infoWindow;
        // creates map
        this.map = new google.maps.Map(this.mapNode, mapOptions);

        let directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: this.map,
        });
        this.setState({dirDisplay: directionsDisplay, service: service});


        // initiates polyline
        poly = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 0,
        });
        poly.setMap(this.map);


        let origin = ""
        let marker;
        let travelMode = this.props.defaultRoute.activity_type;
        // traces shortest path on roads onscreen
        google.maps.event.addListener(this.map, "click", (evt) => {
          if (path.getLength() === 0) {

            path.push(evt.latLng);
            poly.setPath(path);
            this.setState({
              wayPoints: [{location: evt.latLng}]
            });

            // wayPoints.push({location: evt.latLng});

            marker = new google.maps.Marker({
              position: evt.latLng,
              title: '#',
              map: this.map,
            });

          } else {
            marker.setMap(null);
            that.state.route.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;

            MapUtil.displayRoute(this.state.wayPoints[0], evt.latLng, service, directionsDisplay, travelMode, MapUtil.getMiddleWayPoints(this.state.wayPoints));


          }

        });

        directionsDisplay.addListener('directions_changed', this.updateRoute.bind(this));


        // sets geolocation
        infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Current position.');
            infoWindow.open(that.map);
            that.map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, that.map.getCenter())
          })} else {
            handleLocationError(false, infoWindow, this.map.getCenter());
          }

      }

  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.routeId !== nextProps.match.params.routeId) {
    this.props.fetchRoute(nextProps.match.params.routeId).then(() => {
      // switch route url manually
      const that = this;

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
      const mapOptions = {
        center: {
          lat: 40.7831,
          lng: -73.9712
        },
        zoom: 14,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
      };
      const service = new google.maps.DirectionsService;
      let path = new google.maps.MVCArray();
      let poly;
      let infoWindow;
      // creates map
      this.map = new google.maps.Map(this.mapNode, mapOptions)

      let directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true,
        map: this.map,
      });
      let coords = this.props.route.marker_coordinates

      that.setState({dirDisplay: directionsDisplay, service: service});
      let travelMode = this.props.route.activity_type;
      let wayPoints = MapUtil.getWayPointsWithStartEnd(coords);
      MapUtil.displayRoute(wayPoints[0], wayPoints[wayPoints.length-1], service, directionsDisplay, travelMode, MapUtil.getMiddleWayPoints(wayPoints));

      poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 0,
      });
      poly.setMap(this.map);
      let marker;
      // wayPoints.push({location: end });

      google.maps.event.addListener(this.map, "click", function(evt) {

        that.state.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;

        MapUtil.displayRoute(wayPoints[0], evt.latLng, service, directionsDisplay, travelMode, MapUtil.getMiddleWayPoints(wayPoints));

        // wayPoints.push({location: evt.latLng});
      });

      directionsDisplay.addListener('directions_changed', this.updateRoute.bind(this, waypoints));
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
