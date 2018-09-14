import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';

const getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

class RouteBuilder extends React.Component {
  componentDidMount() {
    const mapOptions = {
      center: {
        lat: 40.7831,
        lng: -73.9712
      },
      zoom: 13
    };
    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  render() {
    return (
      <div id='map-container' ref={ map => this.mapNode = map }>
        map?
      </div>
    );
  }
}

export default withRouter(RouteBuilder);
