import { BFMPalette } from "@/Theme";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

const OuterCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${BFMPalette.green100};
  border-radius: 50%;
  position: relative;
`;

const InnerCircle = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${BFMPalette.white};
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SpinnerWrapper = styled("div")`
  svg circle {
    fill: none !important;
  }
`;

export default function Spinner() {
  return (
    <OuterCircle>
      <InnerCircle>
        <SpinnerWrapper>
          <TailSpin
            height="40"
            width="40"
            strokeWidth={5}
            color={BFMPalette.green700}
            ariaLabel="loading"
          />
        </SpinnerWrapper>
      </InnerCircle>
    </OuterCircle>
  );
}
