import { Box, Container, Heading, Text } from "@chakra-ui/react";
import Footer from "~/components/footer/footer";
import Header from "~/components/header/header";
import ContentWrapper from "~/components/shared/contet-wrapper";
import InputNumber from "~/components/shared/input-number";
import InputSelect from "~/components/shared/input-select";
import MainGridWrapper from "~/components/shared/main-grid-wrapper";
import Sidebar from "~/components/sidebar/sidebar";

export default function Index() {
  return (
    <Box as="main" bg="background.500" paddingLeft={["1rem", "5rem", "10rem"]}>
      <MainGridWrapper minH="100vh">
        <Header />
        <Sidebar />
        <ContentWrapper>
          <Box h="100px" w="100%">
            <InputNumber />
            <InputSelect>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </InputSelect>
          </Box>
          <Box bg="blue" h="100px" w="100%"></Box>
        </ContentWrapper>
        <Footer />
      </MainGridWrapper>
    </Box>
  );
}
