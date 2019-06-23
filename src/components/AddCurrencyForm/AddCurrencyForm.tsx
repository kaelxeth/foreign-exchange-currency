import React, { FormEvent } from "react";
import styled from "styled-components";
import Select from "@atlaskit/select";
import Button from "@atlaskit/button";
import { Row } from "../Layout/Layout";
import { AVAILABLE_CURRENCIES } from "../../helpers/currency/currencyConstant";
import { currencyOptions, CurrencyOption } from "../../helpers/currency/currencyHelper";

interface Props {
  onSubmit: (value: string) => void;
  value: string;
  onChange: (e: string) => void;
  disabled: boolean;
}
export default function AddCurrencyForm(props: Props) {
  const { onChange, onSubmit, value, disabled } = props;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      return onSubmit(props.value);
    }
  };

  const handleChange = (selectedOption: CurrencyOption) =>
    typeof onChange === "function" && onChange(selectedOption.value);

  // Check only when value length is a valid currency code length
  const isInvalid = value.length === 3 && !AVAILABLE_CURRENCIES.includes(value);
  const selectedValue = currencyOptions.find(currency => currency.value === value);
  return (
      <form onSubmit={handleSubmit}>
        <Row alignItems="center">
          <SelectContainer>
            <Select
              options={currencyOptions}
              value={selectedValue}
              onChange={handleChange}
              placeholder="Choose currency to add"
              isCompact
              name="currency"
              isInvalid={isInvalid}
            />
          </SelectContainer>
          <Button type="submit" appearance="primary" isDisabled={disabled}>
            Add
          </Button>
        </Row>
      </form>
  );
}

const SelectContainer = styled.div`
  margin-right: 8px;
  width: 100%;
`;
