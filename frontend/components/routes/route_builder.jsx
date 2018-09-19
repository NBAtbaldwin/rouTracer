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
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.toggleActivityType =  this.toggleActivityType.bind(this);
    this.toggleModal =  this.toggleModal.bind(this);
  }

  componentDidMount() {
    if (this.props.flag === true) {
      this.props.fetchRoute(this.props.match.params.routeId).then(() => {
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
        }
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
        let origin = {
          lat: coords[0],
          lng: coords[1]
        };
        let end = {
          lat: coords[coords.length-2],
          lng: coords[coords.length-1]
        };
        let travelMode = this.props.route.activity_type;
        let wayPoints = MapUtil.getWayPoints(coords);
        MapUtil.displayRoute(origin, end, service, directionsDisplay, travelMode, wayPoints);

        poly = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 0,
        });
        poly.setMap(this.map);
        let marker;
        wayPoints.push({location: end });
        google.maps.event.addListener(this.map, "click", function(evt) {

          that.state.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;

          MapUtil.displayRoute(origin, evt.latLng, service, directionsDisplay, travelMode, wayPoints);

          wayPoints.push({location: evt.latLng});
        });

        directionsDisplay.addListener('directions_changed', function() {
          let distance = MapUtil.getDistance(directionsDisplay);
          let duration = MapUtil.getDuration(directionsDisplay);
          let coords = directionsDisplay.getDirections().routes[0].overview_polyline;
          let markerCoords = MapUtil.getMarkers(directionsDisplay);
          that.state.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;
          let route = {
            distance: distance,
            coordinates_list: coords,
            est_duration: duration,
            marker_coordinates: markerCoords,
            travelMode: travelMode,
          };
          let updatedRoute = merge({}, that.state.route, route);
          that.setState({ route: updatedRoute });
        });
      });
      // //////////////////////////////////////////////////
      // /////////////////too//////////////////////////////
      // //////////////////much////////////////////////////
      // ///////////////////code///////////////////////////
      // //////////////////////////////////////////////////
      // //////////////////////////////////////////////////
      // //////////////////////////////////////////////////
      // //////////////////////////////////////////////////
        } else {
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


        // initiates polyline
        poly = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 0,
        });
        poly.setMap(this.map);

        let wayPoints = []
        let origin = ""
        let marker;
        let travelMode = this.props.defaultRoute.activity_type;
        // traces shortest path on roads onscreen
        google.maps.event.addListener(this.map, "click", function(evt) {
          if (path.getLength() === 0) {

            origin = evt.latLng;
            path.push(evt.latLng);
            poly.setPath(path);

            marker = new google.maps.Marker({
              position: evt.latLng,
              title: '#',
              map: that.map,
            });

          } else {
            marker.setMap(null);
            that.state.route.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;

            MapUtil.displayRoute(origin, evt.latLng, service, directionsDisplay, travelMode, wayPoints);

            wayPoints.push({location: evt.latLng});
          }

        });

        directionsDisplay.addListener('directions_changed', function() {
          let distance = MapUtil.getDistance(directionsDisplay);
          let duration = MapUtil.getDuration(directionsDisplay);
          let coords = directionsDisplay.getDirections().routes[0].overview_polyline;
          // analogous to waypoints
          let markerCoords = MapUtil.getMarkers(directionsDisplay);
          that.state.route.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;
          let route = {
            distance: distance,
            coordinates_list: coords,
            est_duration: duration,
            marker_coordinates: markerCoords,
            travelMode: travelMode,
          };
          let updatedRoute = merge({}, that.state.route, route);
          that.setState({ route: updatedRoute });
        });


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
      }
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
      let origin = {
        lat: coords[0],
        lng: coords[1]
      };
      let end = {
        lat: coords[coords.length-2],
        lng: coords[coords.length-1]
      };
      let travelMode = this.props.route.activity_type;
      let wayPoints = MapUtil.getWayPoints(coords);
      MapUtil.displayRoute(origin, end, service, directionsDisplay, travelMode, wayPoints);

      poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 0,
      });
      poly.setMap(this.map);
      let marker;
      wayPoints.push({location: end });
      google.maps.event.addListener(this.map, "click", function(evt) {

        that.state.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;

        MapUtil.displayRoute(origin, evt.latLng, service, directionsDisplay, travelMode, wayPoints);

        wayPoints.push({location: evt.latLng});
      });

      directionsDisplay.addListener('directions_changed', function() {
        let distance = MapUtil.getDistance(directionsDisplay);
        let duration = MapUtil.getDuration(directionsDisplay);
        let coords = directionsDisplay.getDirections().routes[0].overview_polyline;
        let markerCoords = MapUtil.getMarkers(directionsDisplay);
        let route = {
          distance: distance,
          coordinates_list: coords,
          est_duration: duration,
          marker_coordinates: markerCoords,
          travelMode: travelMode,
        };
        let updatedRoute = merge({}, that.state.route, route);
        that.setState({ route: updatedRoute });
    });
  });
  }
};

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
      this.setState({route: updatedRoute });
      this.setState({WALKING: "", BICYCLING: "" });
      this.setState({ activity_type: type, [type]: "selected" });
    };
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
