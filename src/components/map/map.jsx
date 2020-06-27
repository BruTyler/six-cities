import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  _clearOffers(oldLayerGroup) {
    if (oldLayerGroup) {
      oldLayerGroup.clearLayers();
    }
  }

  _renderOffers(map) {
    const {city, apartmentList} = this.props;

    const layerGroup = leaflet
      .layerGroup()
      .addTo(map);

    map.flyTo(city.location, city.defaultZoom, {
      animate: true,
      duration: 2
    });

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    apartmentList.map((pin) => {
      leaflet
        .marker(pin.location, {icon})
        .addTo(layerGroup);
    });

    return layerGroup;
  }

  _renderMap(mapNode) {
    const {city} = this.props;

    const map = leaflet.map(mapNode, {
      center: city.location,
      zoom: city.defaultZoom,
      zoomControl: false,
      marker: true
    });

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    return map;
  }

  componentDidUpdate() {
    this._clearOffers(this._offerLayer);
    this._offerLayer = this._renderOffers(this._map);
  }

  componentDidMount() {
    this._map = this._renderMap(this._mapRef.current);
    this._offerLayer = this._renderOffers(this._map);
  }

  render() {
    return <div className="cities__right-section">
      <section className="cities__map map" ref={this._mapRef}>
      </section>
    </div>;
  }
}

Map.propTypes = {
  city: PropTypes.shape({
    defaultZoom: PropTypes.number.isRequired,
    location: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired,
  apartmentList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    location: PropTypes.arrayOf(PropTypes.number).isRequired
  })).isRequired,
};

export default Map;
