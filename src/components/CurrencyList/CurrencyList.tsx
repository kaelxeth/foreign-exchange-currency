import React from "react";
import styled from "styled-components";
import CurrencyCard from "../CurrencyCard/CurrencyCard";
import { toISOCurrencyName } from "../../helpers/currency/currencyHelper";

interface Props {
  rates: { [key: string]: any };
  currency: string;
  value: string;
  onRemoveCurrency: (currency: string) => void;
}

export default function CurrencyList(props: Props) {
  const { rates, currency, value, onRemoveCurrency } = props;

  return (
    <Container>
      {Object.keys(rates).map((rate: string) => {
        if (rate === currency) {
          return null;
        }

        const handleRemoveCurrency = () => {
          if (typeof onRemoveCurrency === "function") {
            return onRemoveCurrency(rate);
          }
        };

        return (
          <CurrencyCard
            key={rate}
            baseCurrency={currency}
            baseValue={value}
            currencyCode={rate}
            currencyName={toISOCurrencyName(rate)}
            value={rates[rate].toLocaleString()}
            onRemove={handleRemoveCurrency}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 16px;
`;
