import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import * as MapUtil from './../../../util/map_util';
import FooterContainer from "./../../footer_container";
import NavbarLoggedInContainer from "./../../navbar_loggedIn_container";

class RouteShow extends React.Component {

  componentDidMount() {
    this.props.fetchRoute(this.props.match.params.routeId).then(() => {
      const decodedPoly = google.maps.geometry.encoding.decodePath(this.props.route.coordinates_list);
      const mapOptions = {
        center: MapUtil.averageCenter(this.props.route.coordinates_list),
        zoom: 10,
      };
      this.map = new google.maps.Map(this.mapNode, mapOptions);
      MapUtil.zoomFit(this.map, this.props.route.coordinates_list);
      const poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      poly.setMap(this.map);
      const path = new google.maps.MVCArray(decodedPoly);
      poly.setPath(path);
      MapUtil.markersFromPropsArray(this.props.route.marker_coordinates, this.map);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.routeId !== nextProps.match.params.routeId) {
    this.props.fetchRoute(nextProps.match.params.routeId).then(() => {
      const decodedPoly = google.maps.geometry.encoding.decodePath(this.props.route.coordinates_list);
      const mapOptions = {
        center: MapUtil.averageCenter(this.props.route.coordinates_list),
        zoom: 10,
      };
      this.map = new google.maps.Map(this.mapNode, mapOptions);
      MapUtil.zoomFit(this.map, this.props.route.coordinates_list);
      const poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      poly.setMap(this.map);
      const path = new google.maps.MVCArray(decodedPoly);
      poly.setPath(path);
      MapUtil.markersFromPropsArray(this.props.route.marker_coordinates, this.map);
    });
    }
  }

  render() {
    const routeParams = () => {
      if (this.props.route !== undefined) {
        return (
          <div>
            <h2>{this.props.route.route_name}</h2>
            <Link to={`/edit_route/${this.props.route.id}`}>Edit route</Link>
          </div>
        );
      } else {
        return <span></span>;
      }
    };
    return (
      <div className="route-show-main">
        <NavbarLoggedInContainer />
        {routeParams()}
        <div id='show-map-container' ref={ map => this.mapNode = map }>
        </div>
        <FooterContainer />
      </div>
    );
  }
}

export default RouteShow;
