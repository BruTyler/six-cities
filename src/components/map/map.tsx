import * as React from 'react';
import * as leaflet from 'leaflet';
import {MapEnvironment} from '../../const';
import {City, SingleApartment} from '../../types';

interface Props {
  parentBox: MapEnvironment;
  city: City;
  apartmentList: Array<SingleApartment>;
  activeApartment?: SingleApartment;
}

class Map extends React.PureComponent<Props> {
  private _mapRef: React.RefObject<HTMLDivElement>
  private _offerLayer: object
  private _map: object

  constructor(props: Props) {
    super(props);
    this._mapRef = React.createRef();
  }

  componentDidUpdate() {
    this._clearOffers(this._offerLayer);
    this._offerLayer = this._renderOffers(this._map);
  }

  componentDidMount() {
    this._map = this._renderMap(this._mapRef.current);
    this._offerLayer = this._renderOffers(this._map);
  }

  _clearOffers(oldLayerGroup) {
    if (oldLayerGroup) {
      oldLayerGroup.clearLayers();
    }
  }

  _generateMarker(id, location, isActive) {
    const defaultIcon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 30]
    });

    const icon = isActive
      ? activeIcon
      : defaultIcon;

    const marker = leaflet.marker(location, {icon});
    marker.id = id;

    return marker;
  }

  _renderOffers(map) {
    const {city, apartmentList, activeApartment} = this.props;

    const layerGroup = leaflet
      .layerGroup()
      .addTo(map);

    map.flyTo(city.location, city.defaultZoom, {
      animate: true,
      duration: 2
    });

    apartmentList.map((pin) => {
      const isMarkerActive = activeApartment && activeApartment.id === pin.id;

      this
        ._generateMarker(pin.id, pin.location, isMarkerActive)
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

  render() {
    const {parentBox} = this.props;
    return <section className={`${parentBox} map`} ref={this._mapRef}></section>;
  }
}

export default Map;
