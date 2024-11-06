// external import
import { Typography } from "antd";
import styled from "styled-components";
import { FC, PropsWithChildren } from "react";

// internal import
import { EDU_MANAGER_TOKENS } from "../../styles/token";
import type { ParagraphProps } from "antd/es/typography/Paragraph";
import type { TitleProps } from "antd/es/typography/Title";
import type { TextProps as AntTextProps } from "antd/es/typography/Text";

type TextProps = {
  textColor?: string;
  fontSize?: string;
  textType?: "large" | "middle" | "normal";
} & ParagraphProps &
  TitleProps &
  AntTextProps;

const LargeText = styled(Typography.Title)<{
  $textColor?: string;
  $fontSize?: string;
}>`
  margin: 10px 0px !important;
  color: ${(props) =>
    props.$textColor ||
    EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]} !important;
  font-size: ${(props) =>
    props.$fontSize || EDU_MANAGER_TOKENS.fontSize["edu-font-base"]};
  margin: 0;
`;

const MiddleText = styled(Typography.Text)<{
  $textColor?: string;
  $fontSize?: string;
}>`
  color: ${(props) =>
    props.$textColor || EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]};
  font-size: ${(props) =>
    props.$fontSize || EDU_MANAGER_TOKENS.fontSize["edu-font-base"]};
  margin: 0;
`;

const Text = styled(Typography.Paragraph)<{
  $textColor?: string;
  $fontSize?: string;
}>`
  color: ${(props) =>
    props.$textColor || EDU_MANAGER_TOKENS.colors["edu-text-primary-color"]};
  font-size: ${(props) =>
    props.$fontSize || EDU_MANAGER_TOKENS.fontSize["edu-font-base"]};
`;

const NormalText: FC<PropsWithChildren<TextProps>> = ({
  textColor,
  fontSize,
  textType = "normal",
  ...rest
}) => {
  return textType == "normal" ? (
    <Text $textColor={textColor} $fontSize={fontSize} {...rest} />
  ) : textType == "middle" ? (
    <MiddleText $textColor={textColor} $fontSize={fontSize} {...rest} />
  ) : (
    <LargeText $textColor={textColor} $fontSize={fontSize} {...rest} />
  );
};

export default NormalText;
