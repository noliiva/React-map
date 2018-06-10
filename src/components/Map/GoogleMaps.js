import loadScript from "scriptjs";

class GoogleMaps {
  constructor(apiKey, element, markers = [], defaultConfig) {
    this.apiKey = apiKey;
    this.elt = element;
    this.googleMaps = null;
    this.map = null;
    this.markers = markers;
    this.bounds = null;
    this.defaultConfig = defaultConfig;
  }

  load() {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`,
      () => {
        this.googleMaps = window.google.maps;

        this.bounds = new this.googleMaps.LatLngBounds();
        this.markers.forEach(marker => this.bounds.extend(marker.position));

        const center = this.bounds.isEmpty()
          ? this.defaultConfig.center
          : this.bounds.getCenter();
        const zoom = this.defaultConfig.zoom || 4;

        this.map = new this.googleMaps.Map(this.elt, {
          ...this.defaultConfig,
          zoom,
          center
        });

        this.markers.forEach(({ position }) => {
          new this.googleMaps.Marker({
            position,
            map: this.map
          });
        });
        this.map.fitBounds(this.bounds);
        this.map.panToBounds(this.bounds);
      }
    );
  }

  addMarker(marker) {
    this.markers.push(marker);
    new this.googleMaps.Marker({
      position,
      map: this.map
    });

    this.bounds.extend(marker.position);
    this.map.fitBounds(this.bounds);
    this.map.panToBounds(this.bounds);
  }
}

export default GoogleMaps;
