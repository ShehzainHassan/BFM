import { useData } from "@/DataContext";
import styled from "styled-components";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 76px;
  @media (max-width: 1023px) {
    margin-left: unset;
  }
`;
import { ReactNode } from "react";
import LoadingModal from "../Modal/LoadingModal/LoadingModal";

interface ContentWrapperProps {
  children: ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  const { loading } = useData();
  if (loading) return <LoadingModal />;
  return <Wrapper>{children}</Wrapper>;
}
