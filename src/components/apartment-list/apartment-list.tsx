import * as React from 'react';
import ApartmentCard from '../apartment-card/apartment-card';
import {ApartmentEnvironment} from '../../const';
import {SingleApartment} from '../../types';

interface Props {
  parentBox: ApartmentEnvironment;
  apartmentList: SingleApartment[];
  onApartmentCardHover?: (apartment?: SingleApartment) => void;
}

const ApartmentList: React.FunctionComponent<Props> = (props: Props) => {
  const {parentBox, apartmentList, onApartmentCardHover} = props;

  return <div className={`${parentBox}__places-list ${parentBox}__list places__list tabs__content`}>
    {apartmentList.map((apartment) =>
      <ApartmentCard
        key={apartment.id}
        parentBox={parentBox}
        apartment={apartment}
        onApartmentCardHover={onApartmentCardHover}
      />)
    }
  </div>;
};

export default ApartmentList;
