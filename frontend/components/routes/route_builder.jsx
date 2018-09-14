import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

// const getCoordsObj = latLng => ({
//   lat: latLng.lat(),
//   lng: latLng.lng()
// });

class RouteBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.newRoute;
  }

  componentDidMount() {
    debugger;
    const mapOptions = {
      center: {
        lat: 40.7831,
        lng: -73.9712
      },
      zoom: 13
    };
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
    // listener for adding coordinates to onscreen map
    this.map.addListener('click', addLatLng);
    // listener for adding coordinates to polyline string
    google.maps.event.addListener(this.map, 'click', function(event) {
      addLatLngToPoly(event.latLng, poly);
    });
    // Adds to displayed path on map
    function addLatLng(event) {
      let path = poly.getPath();
      path.push(event.latLng);
      let marker = new google.maps.Marker({
        position: event.latLng,
        title: '#' + path.getLength(),
        map: that.map
      });
    }
    // adds current marker to polyline string
    function addLatLngToPoly(latLng, poly) {
       var path = poly.getPath();
       path.push(latLng);
       let encodeString = google.maps.geometry.encoding.encodePath(path);
       console.log(encodeString)
     }
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

  render() {
    return (
      <div className="routebuilder-main">
        <div id='map-container' ref={ map => this.mapNode = map }>
        </div>
        <form>

        </form>
      </div>
    );
  }
}

export default withRouter(RouteBuilder);
