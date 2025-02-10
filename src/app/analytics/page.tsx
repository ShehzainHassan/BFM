import Navbar from "../components/Navbar/Navbar";

export default function Analytics() {
  return (
    <Navbar
      navItems={[
        { label: "Dashboard", path: "/" },
        { label: "Analytics", path: "/analytics" },
        { label: "Invoices", path: "/invoices" },
        { label: "Calender", path: "/calender" },
        { label: "ESG", path: "/esg" },
      ]}
    />
  );
}
