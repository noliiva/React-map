import React from "react";
import ReactDOM from "react-dom";

import GoogleMaps from "./GoogleMaps";

const France = { lat: 46.71109, lng: 1.7191036 };
const NewYork = { lat: 40.71278, lng: -74.00597 };

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
    this.map = null;
  }

  componentDidMount() {
    const config = {
      center: France,
      zoom: 6
    };
    const mapRoot = ReactDOM.findDOMNode(this.mapRef.current);
    this.map = new GoogleMaps(mapRoot, this.props.apiKey, config);
    const markers = React.Children.map(this.props.children, child =>
      React.cloneElement(child)
    );
    this.map.load(markers);
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }} ref={this.mapRef}>
        {this.props.children}
      </div>
    );
  }
}

export default Map;
