import { Spin, SpinProps } from "antd";
import { RiLoaderLine } from "react-icons/ri";
import styled from "styled-components";
import { EDU_MANAGER_TOKENS } from "../../styles/token";

interface LoadingSpinProps extends SpinProps {
  fontSize?: number;
  color?: string;
}

const CustomSpin = styled(Spin)<LoadingSpinProps>`
  .spin-icon {
    font-size: ${(props) => props.fontSize || 20}px;
    color: ${(props) =>
      props.color || EDU_MANAGER_TOKENS.colors["edu-primary"]};
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpin: React.FC<LoadingSpinProps> = ({
  fontSize = 20,
  color 
}) => {
  return (
    <CustomSpin
      indicator={
        <RiLoaderLine className="spin-icon" style={{ fontSize, color }} />
      }
      fontSize={fontSize}
      color={color}
    />
  );
};

export default LoadingSpin;
