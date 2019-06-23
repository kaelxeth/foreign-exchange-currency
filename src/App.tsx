import React, { Component } from "react";
import styled from "styled-components";
import Button from "@atlaskit/button";
import Spinner from "@atlaskit/spinner";

import BaseCurrencyForm from "./components/BaseCurrencyForm/BaseCurrencyForm";
import { Row } from "./components/Layout/Layout";
import CurrencyList from "./components/CurrencyList/CurrencyList";
import AddCurrencyForm from "./components/AddCurrencyForm/AddCurrencyForm";

import { getLatestRates } from "./service/service";
import { RatesLatestResponse } from "./service/service.type";
import { calculateRatesByBaseValue } from "./helpers/currency/currencyHelper";
import { AVAILABLE_CURRENCIES } from "./helpers/currency/currencyConstant";

interface State extends RatesLatestResponse {
  isLoading: boolean;
  value: string;
  calculatedRates: { [key: string]: any };
  currenciesToDisplay: string[];
  isShowAddMoreActive: boolean;
  addMoreCurrencyValue: string;
}

export default class Entry extends Component<{}, State> {
  state: State = {
    isLoading: true,
    base: "USD",
    date: "",
    rates: [],
    calculatedRates: [],
    value: "10.00",
    currenciesToDisplay: ["IDR", "EUR", "GBP", "SGD"],
    isShowAddMoreActive: false,
    addMoreCurrencyValue: ""
  };

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

  fetchLatest = async () => {
    const { base, value, currenciesToDisplay } = this.state;
    this.setState({
      isLoading: true
    });
    return getLatestRates({
      params: { base, symbols: currenciesToDisplay.join(",") }
    }).then(data => {
      const { date, rates } = data;
      return this.setState({
        isLoading: false,
        date,
        calculatedRates: calculateRatesByBaseValue(rates, Number(value)),
        rates
      });
    });
  };

  handleCalculateRates = () =>
    this.setState((prevState: State) => ({
      calculatedRates: calculateRatesByBaseValue(
        prevState.rates,
        Number(prevState.value)
      )
    }));

  handleChangeValue = (value: string) => {
    const refinedValue = value.replace(/[^0-9.,]/g, "");
    return this.setState({ value: refinedValue });
  };

  handleChangeBase = (base: string) => this.setState({ base: base });

  handleChangeAddMoreCurrency = (addMoreCurrencyValue: string) =>
    this.setState({
      addMoreCurrencyValue
    });

  handleToggleShowAddMore = () =>
    this.setState((prevState: State) => ({
      isShowAddMoreActive: !prevState.isShowAddMoreActive
    }));

  handleAddMoreCurrency = () =>
    AVAILABLE_CURRENCIES.includes(this.state.addMoreCurrencyValue) &&
    this.setState(
      {
        currenciesToDisplay: Array.from(
          new Set([
            ...this.state.currenciesToDisplay,
            this.state.addMoreCurrencyValue
          ])
        )
      },
      () =>
        this.fetchLatest().then(() =>
          this.setState({
            addMoreCurrencyValue: "",
            isShowAddMoreActive: false
          })
        )
    );

  handleRemoveCurrency = (currency: string) => {
    if (this.state.currenciesToDisplay.includes(currency)) {
      const currenciesToDisplay = this.state.currenciesToDisplay.filter(
        curr => curr !== currency
      );
      this.setState({
        currenciesToDisplay
      });
    }
  };

  render() {
    const {
      value,
      base,
      calculatedRates,
      isShowAddMoreActive,
      addMoreCurrencyValue,
      currenciesToDisplay,
      isLoading
    } = this.state;

    const currencyOptions = AVAILABLE_CURRENCIES.map(currency => ({
      label: currency,
      value: currency
    }));

    const rates: { [key: string]: string } = {};
    Object.keys(calculatedRates).forEach((rate: string) => {
      if (currenciesToDisplay.includes(rate)) {
        rates[rate] = calculatedRates[rate];
      }
    });
    return (
      <AppWrapper>
        <BasicAppBar>Foreign Exchange Currency</BasicAppBar>
        <AppBarReservedSpace />
        <BaseCurrencyForm
          value={value}
          onChangeValue={this.handleChangeValue}
          currencyOptions={currencyOptions}
          onChangeCurrency={this.handleChangeBase}
          currencyValue={base}
        />
        {isLoading ? (
          <Row justify="center">
            <Padder>
              <Spinner />
            </Padder>
          </Row>
        ) : (
          <CurrencyList
            currency={base}
            value={value}
            rates={rates}
            onRemoveCurrency={this.handleRemoveCurrency}
          />
        )}
        {isShowAddMoreActive ? (
          <AddCurrencyForm
            value={addMoreCurrencyValue}
            onChange={this.handleChangeAddMoreCurrency}
            onSubmit={this.handleAddMoreCurrency}
            disabled={isLoading}
          />
        ) : (
          <Row justify="stretch">
            <Button
              onClick={this.handleToggleShowAddMore}
              appearance="primary"
              shouldFitContainer
            >
              Add More Currency
            </Button>
          </Row>
        )}
      </AppWrapper>
    );
  }
}

const AppWrapper = styled.div`
  max-width: 360px;
  padding: 16px;
  margin: 0 auto;
  h1 {
    margin-bottom: 16px;
  }
`;

const Padder = styled.div`
  padding: 16px;
`;

const AppBarReservedSpace = styled.div`
  height: 52px;
`;

const BasicAppBar = styled.div`
  position: fixed;
  width: 100vw;
  left: 0;
  top: 0;
  padding: 16px;
  color: #ffffff;
  background-color: #0052cc;
  font-weight: bold;
  text-transform: uppercase;
  z-index: 3;
  text-align: center;
  box-shadow: 0 3px 6px 1px rgba(0, 0, 0, 0.15);
`;
