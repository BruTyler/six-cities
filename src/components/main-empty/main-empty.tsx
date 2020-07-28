import * as React from 'react';

interface Props {
  detailMessage: string;
}

const MainEmpty: React.FunctionComponent<Props> = ({detailMessage}: Props) => (
  <div className="cities">
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <b className="cities__status">No places to stay available</b>
          <p className="cities__status-description">{detailMessage}</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  </div>
);

export default MainEmpty;
