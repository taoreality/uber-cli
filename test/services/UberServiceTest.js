import UberService from '../../src/services/UberService';

describe('Uber Service', () => {
  const uberService = new UberService();

  describe('first location', () => {
    it('throws', () => {
      const geocodeLocations = sinon.stub(uberService.geocodeService, 'getLocations').returns(Promise.resolve(List()));

      expect(uberService.getFirstLocation()).to.be.rejectedWith(RangeError);

      geocodeLocations.restore();
    });

    it('succeeds', () => {
      const geocodeLocations = sinon.stub(uberService.geocodeService, 'getLocations').returns(Promise.resolve(List.of(1, 2, 3)));

      expect(uberService.getFirstLocation()).to.eventually.eql(1);

      geocodeLocations.restore();
    });
  });

  describe('time estimates', () => {
    it('succeeds', () => {
      const firstLocation = sinon.stub(uberService, 'getFirstLocation').returns(Promise.resolve('jaebaebae'));
      const clientTimeEstimation = sinon.stub(uberService.client, 'getTimeEstimates').returns(Promise.resolve({}));
      const pickupTimeTranslation = sinon.stub(uberService.pickupTimeEstimatesTranslator, 'translate').returns(Promise.resolve('bae jadley'));
      const expected = {
        location: 'jaebaebae',
        estimates: 'baejadley',
      };

      expect(uberService.getTimeEstimates()).to.eventually.eql(expected);

      firstLocation.restore();
      clientTimeEstimation.restore();
      pickupTimeTranslation.restore();
    });
  });

  describe('price estimates', () => {
    it('succeeds', () => {
      const firstLocation = sinon.stub(uberService, 'getFirstLocation').returns(Promise.resolve('jaebaebae'));
      const clientPriceEstimation = sinon.stub(uberService.client, 'getPriceEstimates').returns(Promise.resolve({}));
      const priceEstimatesTranslation = sinon.stub(uberService.tripPriceEstimatesTranslator, 'translate').returns(Promise.resolve('bae jadley'));
      const expected = {
        start: 'jaebaebae',
        end: 'jaebaebae',
        estimates: 'bae jadley',
      };
      expect(uberService.getPriceEstimates({ startAddress: 'jae', endAddress: 'baebae' })).to.eventually.eql(expected);

      firstLocation.restore();
      clientPriceEstimation.restore();
      priceEstimatesTranslation.restore();
    });
  });
});
