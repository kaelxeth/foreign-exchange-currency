import * as helpers from '../currencyHelper';
import mockRates from './mockData.json';

describe('calculateRates', () => {

  it('Calculate rates based at it values', () => {
    expect(helpers.calculateRatesByBaseValue(mockRates, 10)).toMatchSnapshot();
  });

  it('Returns correct Currency Name', () => {
    // THB = Thai baht;
    const currencyName = helpers.toISOCurrencyName('THB');
    expect(currencyName).toBe('Thai baht');
  });
  
})