import React, { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { Row } from "../Layout/Layout";

interface Props {
  onSubmit: (value: string) => void;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    typeof onChange === "function" && onChange(e);

  return (
    <form onSubmit={handleSubmit}>
      <Row alignItems="center">
        <TextFieldContainer>
          <TextField value={value} onChange={handleChange} isCompact name="currency" />
        </TextFieldContainer>
        <Button type="submit" appearance="primary" isDisabled={disabled}>
          Add
        </Button>
      </Row>
    </form>
  );
}

const TextFieldContainer = styled.div`
  margin-right: 8px;
  width: 100%;
`;
