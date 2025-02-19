import { BFMPalette } from "@/Theme";
import styled from "styled-components";

const SidebarContainer = styled("div")`
  width: 76px;
  height: 100vh;
  background-color: ${BFMPalette.purple925};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
`;
export default function Sidebar() {
  return <SidebarContainer />;
}
