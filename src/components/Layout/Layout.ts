import styled from 'styled-components';
import { JustifyContentProperty, AlignContentProperty, AlignItemsProperty, FlexProperty } from 'csstype';

interface RowColumnProps {
  justify?: JustifyContentProperty;
  alignContent?: AlignContentProperty;
  alignItems?: AlignItemsProperty;
  flex?: FlexProperty<string>;
}

const BaseLayout = styled.div<RowColumnProps>`
  display: flex;
  justify-content: ${({ justify }) => justify };
  align-content: ${({ alignContent }) => alignContent };
  align-items: ${({ alignItems }) => alignItems};
  flex: ${({ flex }) => flex};
`;

export const Row = styled(BaseLayout)<RowColumnProps>`
  flex-direction: row;
`;

export const Column = styled(BaseLayout)<RowColumnProps>`
  flex-direction: column;
`;