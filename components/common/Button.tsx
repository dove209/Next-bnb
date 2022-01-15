import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

// 버튼 색상 구하기
const getButtonColor = (color: string, colorRevers: boolean) => {
  if (colorRevers) {
    switch (color) {
      case "dark_cyan":
        return css`
          border: 2px solid ${palette.dark_cyan};
          color: ${palette.dark_cyan};
          background-color: white;
        `;
      default:
        return css`
          border: 2px solid ${palette.black};
          color: ${palette.black};
          background-color: white;
        `;
    }
  }
  switch (color) {
    case "dark_cyan":
      return css`
        background-color: ${palette.dark_cyan};
        color: #fff;
      `;
    case "bittersweet":
      return css`
        background-color: ${palette.bittersweet};
        color: #fff;
      `;
    case "amaranth":
      return css`
        background-color: ${palette.amaranth};
        color: #fff;
      `;
    default:
      return css`
        background-color: #fff;
        color: ${palette.black};
        border: 1px solid ${palette.gray_c4};
      `;
  }
};

// 버튼 크기 구하기
const getButtonSize = (size: "small" | "medium") => {
  switch (size) {
    case "medium":
      return css`
        height: 48px;
      `;
    case "small":
      return css`
        height: 36px;
        font-size: 14px;
      `;
    default:
      return "";
  }
};

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
  size: "small" | "medium";
}

const Container = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: 100%;
  width: ${(props) => props.width};
  ${(props) => getButtonColor(props.color || "", props.colorReverse)};
  ${(props) => getButtonSize(props.size)};
  svg {
    margin-right: 12px;
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: string;
  width?: string;
  colorReverse?: boolean;
  icon?: JSX.Element;
  size?: "small" | "medium";
}

const Button: React.FC<IProps> = ({
  children,
  color,
  width,
  colorReverse = false,
  icon,
  size = "medium",
  ...props
}) => {
  return (
    <Container
      {...props}
      color={color}
      width={width}
      colorReverse={colorReverse}
      size={size}
    >
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
