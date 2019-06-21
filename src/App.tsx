import React, { Component, ChangeEvent } from 'react';
import { getLatestRates } from './service/service';
import { RatesLatestResponse } from './service/service.type';
import { calculateRatesByBaseValue, toISOCurrencyName } from './helpers/currency/currencyHelper';
import { AVAILABLE_CURRENCIES } from './helpers/currency/currencyConstant';

interface State extends RatesLatestResponse {
  isLoading: boolean;
  value: string;
  calculatedRates: { [key: string]: any };
  currenciesToDisplay: string[];
}

export default class Entry extends Component<{}, State> {
  state: State = {
    isLoading: true,
    base: 'USD',
    date: '',
    rates: [],
    calculatedRates: [],
    value: "10.00",
    currenciesToDisplay: ['IDR', 'EUR', 'GBP', 'SGD']
  }

  componentDidMount() {
    this.fetchLatest();
  }

  componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.base !== this.state.base) {
      return this.fetchLatest();
    }
    if (prevState.value !== this.state.value) {
      return this.handleCalculateRates();
    }
  }

  fetchLatest = () => {
    const { base, value, currenciesToDisplay } = this.state;

    getLatestRates({ params: { base, symbols: currenciesToDisplay.join(',') } })
      .then(data => {
        const { date, rates } = data;
        return this.setState({
          date, calculatedRates: calculateRatesByBaseValue(rates, Number(value)), rates
        })
      })
  }

  handleCalculateRates = () => this.setState((prevState: State) => ({
    calculatedRates: calculateRatesByBaseValue(prevState.rates, Number(prevState.value))
  }));

  handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const refinedValue = e.target.value.replace(/[^0-9.,]/g, '');
    return this.setState({ value: refinedValue })
  };

  handleChangeBase = (e: ChangeEvent<HTMLSelectElement>) => this.setState({ base: e.target.value })

  render() {
    const { calculatedRates, value, base } = this.state;
    return (
      <div>
        <input type="text" placeholder="Value" value={value} onChange={this.handleChangeValue} />
        <select onChange={this.handleChangeBase}>
          {AVAILABLE_CURRENCIES.map(currency => <option key={currency} value={currency}>{currency}</option>)}
        </select>
        {Object.keys(calculatedRates).map((rate: string) => {
          if (rate === base) {
            return null
          }
          return (
            <div key={rate}>
              <div>{toISOCurrencyName(rate)}</div>
              <div>{calculatedRates[rate].toLocaleString()}</div>
            </div>
          )
        })}
      </div>
    )
  }
}