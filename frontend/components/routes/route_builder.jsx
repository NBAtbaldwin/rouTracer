import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';

// const getCoordsObj = latLng => ({
//   lat: latLng.lat(),
//   lng: latLng.lng()
// });
function parseDist(str) {
  return parseFloat(str.split(" ")[0]);
}

class RouteBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.newRoute;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.toggleActivityType = this.toggleActivityType.bind(this);
  }

  componentDidMount() {
    const mapOptions = {
      center: {
        lat: 40.7831,
        lng: -73.9712
      },
      zoom: 14
    };
    const service = new google.maps.DirectionsService();
    let path = new google.maps.MVCArray();
    let poly;
    let infoWindow;
    // creates map
    this.map = new google.maps.Map(this.mapNode, mapOptions);
    // initiates polyline
    poly = new google.maps.Polyline({
          strokeColor: '#000000',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
    poly.setMap(this.map);
    const that = this;
    // traces shortest path on roads onscreen
    google.maps.event.addListener(this.map, "click", function(evt) {
      if (path.getLength() === 0) {
        path.push(evt.latLng);
        poly.setPath(path);
        let marker = new google.maps.Marker({
          position: evt.latLng,
          title: '#',
          map: that.map
        });
      } else {
        let travelMode;
        that.state.activity_type === 'WALKING' ? travelMode = google.maps.DirectionsTravelMode.WALKING : travelMode = google.maps.DirectionsTravelMode.BICYCLING;
        service.route({
          origin: path.getAt(path.getLength() - 1),
          destination: evt.latLng,
          travelMode: travelMode
        }, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            for (let i = 0, len = result.routes[0].overview_path.length;
                i < len; i++) {
              path.push(result.routes[0].overview_path[i]);
              if (i === 0) {
                let marker = new google.maps.Marker({
                  position: evt.latLng,
                  title: '#',
                  map: that.map
                });
                // add distance, duration of new segment to state
                let distance = that.state.distance + parseDist(result.routes[0].legs[0].distance.text);
                let duration = that.state.est_duration + result.routes[0].legs[0].duration.value
                that.setState({
                  coordinates_list: result.routes[0].overview_polyline,
                  distance: distance,
                  est_duration: duration
                });
                console.log(that.state);
              };
            }
          }
        });
      }
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
    this.props.createRoute(this.state).then(() => this.props.history.push('/routes'));
  };

  toggleActivityType(type) {
    return (e) => {
      this.setState({activity_type: type});
    };
  }

  render() {
    return (
      <div className="routebuilder-main">
        <div className="routebuilder-toolbar">
          <ul>
            <li>
              <button onClick={this.toggleActivityType("BICYCLING")}>Ride</button>
            </li>
            <li>
              <button onClick={this.toggleActivityType("WALKING")}>Run</button>
            </li>
            <li>
              <button>Save</button>
            </li>
            <li>
              <Link to="/routes">Exit RouteBuilder</Link>
            </li>
          </ul>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>Route Name
            <input type="text"
              value={this.state.route_name}
              onChange={this.update('route_name')} />
          </label>
          <label>Description
            <textarea value={this.state.description}
            onChange={this.update('description')} />
          </label>
          <input type="hidden" value={this.state.coordinates_list} />
          <input type="hidden" value={this.state.est_duration} />
          <input type="hidden" value={this.state.distance} />
          <input type="submit" value="save" />
        </form>
        <div id='map-container' ref={ map => this.mapNode = map }>
        </div>
        <ul>
          <li>{this.state.activity_type}</li>
          <li>{this.state.distance}</li>
          <li>{this.state.est_duration}</li>
        </ul>
      </div>
    );
  }
}

export default withRouter(RouteBuilder);
