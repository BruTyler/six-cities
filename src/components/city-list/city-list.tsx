import * as React from 'react';
import {City} from '../../types';

interface Props {
  activeCity: City;
  cityList: Array<City>;
  onCitySelect: (city: City) => void;
}

const CityList: React.FunctionComponent<Props> = (props: Props) => {
  const {cityList, activeCity, onCitySelect} = props;

  return <section className="locations container">
    <ul className="locations__list tabs__list">
      {cityList.map((item) => {
        return <li className="locations__item" key={`city-${item.id}`}>
          <a className={`locations__item-link tabs__item${item.id === activeCity.id ? ` tabs__item--active` : ``}`}
            href="#"
            onClick={() => onCitySelect(item)}>
            <span>{item.id}</span>
          </a>
        </li>;
      })}
    </ul>
  </section>;
};

export default CityList;
