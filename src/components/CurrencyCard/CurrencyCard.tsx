import React from "react";
import styled from "styled-components";
import SelectClearIcon from "@atlaskit/icon/glyph/select-clear";
import { Row, Column } from "../Layout/Layout";

interface CurrencyCardProps {
  currencyCode: string;
  currencyName: string;
  value: string;
  baseCurrency: string;
  baseValue: string;
  onRemove: (currency: string) => void;
}

export default function CurrencyCard(props: CurrencyCardProps) {
  const {
    baseCurrency,
    baseValue,
    value,
    currencyCode,
    currencyName,
    onRemove
  } = props;

  const handleRemove = () => {
    if (typeof onRemove === "function") {
      onRemove(currencyCode);
    }
  };

  return (
    <Container>
      <CurrencyInformation flex="1">
        <Row justify="space-between">
          <BoldPrimary>{currencyCode}</BoldPrimary>
          <Bold>{value}</Bold>
        </Row>
        <CurrencyName>
          {currencyCode} - {currencyName}
        </CurrencyName>
        <CurrencyRate>
          {baseValue} {baseCurrency} = {currencyCode} {value}
        </CurrencyRate>
      </CurrencyInformation>
      <Column justify="center">
        <ClearButton onClick={handleRemove}>
          <SelectClearIcon label="Remove Currency" />
        </ClearButton>
      </Column>
    </Container>
  );
}

const Container = styled(Row)`
  padding: 12px;
  width: 100%;
  justify-content: space-between;
  border: 2px solid #e2e2e2;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(25, 25, 25, 0.05);
  transition: all 0.3s;
  margin: 8px 0;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 2px 4px rgba(25, 25, 25, 0.15);
    border-color: #0052cc;
  }
`;

const ClearButton = styled.div`
  cursor: pointer;
  svg {
    fill: #ea222d;
    color: #ffffff;
    transition: all 0.2s;
  }
  &:hover {
    svg {
      color: #ea222d;
      fill: #ffffff;
    }
  }
`;

const BoldPrimary = styled.div`
  color: #0052cc;
  font-weight: bold;
  font-size: 16px;
`;

const CurrencyName = styled.div`
  font-weight: 500;
  color: #343434;
  font-size: 10px;
  margin-bottom: 4px;
  text-transform: capitalize;
`;

const Bold = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const CurrencyInformation = styled(Column)`
  padding-right: 16px;
`;

const CurrencyRate = styled.div`
  font-weight: bold;
`;
