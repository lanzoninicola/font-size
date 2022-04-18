import { Box } from "@chakra-ui/react";
import { Outlet } from "remix";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import MainGridWrapper from "~/components/shared/main-grid-wrapper";
import SectionHeader from "~/components/shared/section-header";
import Sidebar from "~/components/sidebar/sidebar";

export default function App() {
  return (
    <Box as="main" bg="background.300" minH="100vh">
      <MainGridWrapper minH="100vh">
        <Header />

        <Sidebar />
        <Outlet />
        <Footer />
      </MainGridWrapper>
    </Box>
  );
}
