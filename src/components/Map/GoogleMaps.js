import loadScript from "scriptjs";
import ReactDOM from "react-dom";

class GoogleMaps {
  constructor(
    root,
    apiKey,
    defaultConfig = { center: { lat: 48.8566, lng: 2.3522 }, zoom: 4 }
  ) {
    this.root = root;
    this.apiKey = apiKey;
    this.config = defaultConfig;

    this.googleMapsApi = null;
    this.map = null;
    this.markers = [];
    this.bounds = null;
  }

  load(markers) {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`,
      () => {
        this.googleMapsApi = window.google.maps;
        if (!this.googleMapsApi) return;

        const center = this.config.center;
        const zoom = this.config.zoom;

        this.map = new this.googleMapsApi.Map(this.root, {
          ...this.config,
          center,
          zoom
        });

        this.bounds = new this.googleMapsApi.LatLngBounds();
        this.addMarkers(markers);
      }
    );
  }

  addMarkers(markers) {
    if (!this.googleMapsApi) return;
    const googleMapsApi = this.googleMapsApi;

    class CustomMarker extends googleMapsApi.OverlayView {
      constructor(component, map) {
        super();
        this.div = null;
        this.component = component;
        this.map = map;

        this.setMap(map);
      }

      onAdd() {
        this.div = document.createElement("div");
        this.div.style.position = "absolute";

        let panes = this.getPanes();
        panes.overlayImage.appendChild(this.div);
        ReactDOM.render(this.component, this.div);
      }

      draw() {
        const { lat, lng } = this.component.props.position;
        const projection = this.getProjection() || {
          fromLatLngToDivPixel: () => ({})
        };
        const { x, y } = projection.fromLatLngToDivPixel(
          new googleMapsApi.LatLng(lat, lng)
        );
        this.div.style.top = y + "px";
        this.div.style.left = x + "px";
      }

      onRemove() {}
    }

    markers.forEach(marker => {
      this.markers.push(marker);
      new CustomMarker(marker, this.map);
      this.bounds.extend(marker.props.position);
    });

    this.map.fitBounds(this.bounds);
    this.map.panToBounds(this.bounds);
  }
}

export default GoogleMaps;
