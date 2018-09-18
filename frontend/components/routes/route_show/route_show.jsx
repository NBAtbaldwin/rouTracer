import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import * as MapUtil from './../../../util/map_util';
import * as ConversionUtil from './../../../util/conversion_util';
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
    const routeAside = () => {
      if (this.props.route !== undefined) {
        const route = this.props.route;
        return (
          <div className="route-aside">
            <div>
              <div></div>
              <ul>
                <li>By {this.props.user.email}</li>
                <li>Created on {ConversionUtil.displayDate(route.created_at)}</li>
              </ul>
            </div>
            <ul>
              <ul>
                <li>{route.distance}mi</li>
                <li>Distance</li>
              </ul>
              <ul>
                <li>{route.elevation}ft</li>
                <li>Elevation Gain</li>
              </ul>
            </ul>
            <ul>
              <li>Est Moving time <strong>{ConversionUtil.hrsMinsSecs(route.est_duration)}</strong></li>
            </ul>
            <p>{route.description}</p>
          </div>
        );
      } else {
        return <span></span>;
      }
    };
    const routeHeader = () => {
      if (this.props.route !== undefined) {
        const route = this.props.route;
        return (
          <div className="header">
            <p><Link to="/routes">My {route.activity_type.toLowerCase()} Routes</Link>  <strong> / {route.route_name}</strong></p>
            <h2><i className="far fa-star"></i> {route.route_name}</h2>
            <Link to={`/edit_route/${this.props.route.id}`}>Edit</Link>
          </div>
        );
      } else {
        return <span></span>;
      }
    };
    return (
      <div className="route-show-main">
        <NavbarLoggedInContainer />
        <section>
          <div className="route-show-container">
            {routeHeader()}
            <div>
              <div id='show-map-container' ref={ map => this.mapNode = map }>
              </div>
            </div>
          </div>
          {routeAside()}
        </section>
        <FooterContainer />
      </div>
    );
  }
}

export default RouteShow;
