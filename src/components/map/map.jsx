import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  componentDidMount() {
    const {city, apartmentList} = this.props;
    const mapNode = this._mapRef.current;

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

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

    apartmentList.map((pin) =>
      leaflet
        .marker(pin.location, {icon})
        .addTo(map)
    );
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
