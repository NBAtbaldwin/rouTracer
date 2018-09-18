import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import * as MapUtil from './../../util/map_util';


function parseDist(str) {
  return parseFloat(str.split(" ")[0]);
}

class RouteBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.route;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.toggleActivityType = this.toggleActivityType.bind(this);
  }

  componentDidMount() {
    const that = this;

    const mapOptions = {
      center: {
        lat: 40.7831,
        lng: -73.9712
      },
      zoom: 14
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

    if (this.props.flag === true) {
      this.props.fetchRoute(this.props.match.params.routeId).then(() => {
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
      })
    }

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
        let travelMode;
        that.state.route.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;

        MapUtil.displayRoute(origin, evt.latLng, service, directionsDisplay, travelMode, wayPoints);

        wayPoints.push({location: evt.latLng});

        }

    });

    directionsDisplay.addListener('directions_changed', function() {
      let distance = MapUtil.getDistance(directionsDisplay);
      let duration = MapUtil.getDuration(directionsDisplay);
      let coords = directionsDisplay.getDirections().routes[0].overview_polyline;
      let markerCoords = MapUtil.getMarkers(directionsDisplay);
      that.setState({
        distance: distance,
        coordinates_list: coords,
        est_duration: duration,
        marker_coordinates: markerCoords,
      });
      console.log(that.state)
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
    };

  update(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(this.state).then(() => this.props.history.push('/routes'));
  };

  toggleActivityType(type) {
    return (e) => {
      this.setState({activity_type: type});
    };
  }

  render() {
    const that = this;
    const mapRender = () => {
      if (that.props.route !== undefined) {
        return (
          <div className="routebuilder-main">
            <div className="routebuilder-toolbar">
              <ul>
                <li>
                  <button onClick={that.toggleActivityType("BICYCLING")}>Ride</button>
                </li>
                <li>
                  <button onClick={that.toggleActivityType("WALKING")}>Run</button>
                </li>
                <li>
                  <button>Save</button>
                </li>
                <li>
                  <Link to="/routes">Exit RouteBuilder</Link>
                </li>
              </ul>
            </div>
            <form onSubmit={that.handleSubmit}>
              <label>Route Name
                <input type="text"
                  value={that.state.route_name}
                  onChange={that.update('route_name')} />
              </label>
              <label>Description
                <textarea value={that.state.description}
                onChange={that.update('description')} />
              </label>
              <input type="hidden" value={that.state.coordinates_list} />
              <input type="hidden" value={that.state.est_duration} />
              <input type="hidden" value={that.state.distance} />
              <input type="hidden" value={that.state.marker_coordinates} />
              <input type="submit" value="save" />
            </form>
            <div id='map-container' ref={ map => that.mapNode = map }>
            </div>
            <ul>
              <li>{that.state.activity_type}</li>
              <li>{that.state.distance}</li>
              <li>{that.state.est_duration}</li>
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

// console.log(`${duration} ${distance} ${coords} ${markerCoords}`);
