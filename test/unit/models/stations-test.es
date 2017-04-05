/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */
import { expect } from 'chai';
import { describe, it } from 'mocha';
import _ from 'lodash';

import { stationsCollection, hasCachedStations,
         stationNames, riverNames,
         catchmentNames, matchStations,
         stationWithId } from '../../../app/es/models/stations.es';
import Station from '../../../app/es/models/station.es';

describe('stations model', () => {
  it('should provide a promise of a collection of stations', () => {
    expect(hasCachedStations()).to.equal(false);

    return stationsCollection().then((stations) => {
      expect(stations.length).to.be.above(0);
      expect(stations[0]).to.be.instanceof(Station);
      expect(hasCachedStations()).to.equal(true);
    });
  });

  it('should return a promise of all of the names of stations', () =>
    stationNames().then((names) => {
      expect(names.length).to.be.above(0);
      // TODO we need to come back to this test
      // expect(names).to.include.members(['Crowhurst', 'Summergrove']);
      expect(names).to.not.contain(['']);
    }),
  );


  it('should return a promise of all of the names of rivers', () =>
    riverNames().then((names) => {
      expect(names.length).to.be.above(0);
      expect(names).to.include.members(['Tide']);
      expect(names).to.not.contain(['']);
    }),
  );

  it('should return a promise of all of the names of catchments', () =>
    catchmentNames().then((names) => {
      expect(names.length).to.be.above(0);
      expect(names).to.include.members(['England - South Coast']);
      expect(names).to.not.contain(['']);
    }),
  );

  it('should match stations by name', () =>
    matchStations({ notation: 'E72639' }).then((stations) => {
      expect(stations.length).to.be.above(0);
      _.each(stations, (station) => {
        expect(station.label().toLocaleLowerCase()).to.include('avonmouth');
      });
    }),
  );

  it('should return a station if the ID matches', () =>
    stationWithId('E72639').then((station) => {
      expect(station.label()).to.equal('Avonmouth Portbury');
    }),
  );

  it('should return a null if the ID does not match', () =>
    stationWithId('522039999999999999999').then((station) => {
      expect(station).to.be.undefined;
    }),
  );
});
