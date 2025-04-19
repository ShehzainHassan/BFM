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

interface ContentWrapperProps {
  children: ReactNode;
}

const Loading = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
`;
export default function ContentWrapper({ children }: ContentWrapperProps) {
  const { loading } = useData();
  if (loading) return <Loading>Loading...</Loading>;
  return <Wrapper>{children}</Wrapper>;
}
