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
    const elt = ReactDOM.findDOMNode(this.mapRef.current);
    const markers = React.Children.map(this.props.children, ({ props }) => {
      const { lat, lng } = props;
      return { position: { lat, lng } };
    });
    const config = {
      center: France,
      zoom: 6
    };
    this.map = new GoogleMaps('API_KEY', elt, markers, config);
    this.map.load();
  }

  render() {
    return (
      <div style={{ height: "100%", width: "100%" }} ref={this.mapRef}>
        Loading...
      </div>
    );
  }
}

export default Map;
