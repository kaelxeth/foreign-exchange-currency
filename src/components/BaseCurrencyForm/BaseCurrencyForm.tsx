import React, { ChangeEvent } from "react";
import TextField from "@atlaskit/textfield";
import Select from "@atlaskit/select";
import styled from "styled-components";

interface Props {
  onChangeCurrency: (currency: string) => void;
  onChangeValue: (value: string) => void;
  currencyOptions: { label: string; value: string }[];
  currencyValue: string;
  value: string;
}

const BaseCurrencyForm: React.FunctionComponent<Props> = (
  props
): JSX.Element => {
  
  const {
    currencyOptions,
    currencyValue,
    onChangeCurrency,
    onChangeValue,
    value
  } = props;

  const handleCurrencyChange = ({ value }: { value: string }) => {
    if (typeof onChangeCurrency === "function") {
      return onChangeCurrency(value);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof onChangeValue === "function") {
      return onChangeValue(e.target.value);
    }
  };

  return (
    <Container>
      <TextField value={value} onChange={handleChangeValue} label="Currency Value"/>
      <Select
        options={currencyOptions}
        onChange={handleCurrencyChange}
        // Atlaskit accept the full object with label instead of only value
        value={currencyOptions.filter(currency => currency.value === currencyValue)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 80px;
  gap: 15px;
  margin-bottom: 16px;
`;

export default BaseCurrencyForm;
