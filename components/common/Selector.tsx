import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;
  select {
    width: 100%;
    height: 100%;
    background-color: ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    -webkit-appearance: none;
    background: url("/static/svg/common/selector/selector_down_arrow.svg")
      no-repeat right 11px center;
    font-size: 16px;
  }
  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
        background-color: ${isValid ? "#fff" : palette.snow};
      }
    `}
`;

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disabledOptions?: string[];
  value?: string;
  isValid?: boolean;
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  isValid,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);
  return (
    <Container isValid={!!isValid} validateMode={validateMode}>
      <select {...props}>
        {disabledOptions.map((option, idx) => (
          <option key={idx} value={option} disabled>
            {option}
          </option>
        ))}
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default React.memo(Selector);
