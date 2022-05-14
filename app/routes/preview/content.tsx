import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import VStackBox from "~/components/shared/vstack-wrapper";
import usePostMessageService from "~/domain/preview/usePostMessageService";

export default function PreviewFrames() {
  const { handleMessages } = usePostMessageService();

  useEffect(() => {
    handleMessages();
  }, []);

  return (
    <Box id="page">
      {/** Hero Section */}
      <Section id="hero" h="35vh">
        <Center h="100%" w="100%">
          <Container textAlign="center">
            <h1>Make ideas happen</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Donec a
              diam lectus. Set sit amet ipsum mauris.
            </p>
            <Button>Contact Us</Button>
          </Container>
        </Center>
      </Section>

      {/** Service Section */}
      <Section id="services">
        <Center w="100%" h="100%" marginBlock="auto">
          <VStackBox>
            <Center w="100%">
              <Container flexDirection={"column"} textAlign="center">
                <h2>Our Services</h2>
                <p>The most powerful services of the world</p>
              </Container>
            </Center>
            <HStack
              w="100%"
              justify={"center"}
              wrap={["wrap", "wrap", "wrap", "nowrap"]}
              gap="2rem"
            >
              <Card />
              <Card />
              <Card />
            </HStack>
          </VStackBox>
        </Center>
      </Section>

      {/** About Us Section */}
      <Section id="about-us">
        <HStack w="100%" wrap={["wrap", "wrap", "nowrap"]} gap="2rem">
          <Center w="100%">
            <Container
              flexDirection={"column"}
              w="max-content"
              textAlign={["center", "center", "left"]}
            >
              <h2>About us</h2>
              <h3>Lorem ipsum dolor sit amet</h3>
            </Container>
          </Center>
          <Center w="100%">
            <VStackBox spacing={4}>
              <Container m="0" flexDirection={"column"}>
                <h4>Our Vision</h4>
                <p>
                  Consequat consequat Lorem pariatur commodo. Nisi anim occaecat
                  tempor dolor ipsum do eu sint culpa non amet. Tempor do mollit
                  mollit ut ea cillum quis ut non voluptate cupidatat.
                </p>
              </Container>
              <Container flexDirection={"column"}>
                <h4>Our Mission</h4>
                <p>
                  Consequat consequat Lorem pariatur commodo. Nisi anim occaecat
                  tempor dolor ipsum do eu sint culpa non amet. Tempor do mollit
                  mollit ut ea cillum quis ut non voluptate cupidatat.
                </p>
              </Container>
              <Container flexDirection={"column"}>
                <h4>Our Goals</h4>
                <p>
                  Consequat consequat Lorem pariatur commodo. Nisi anim occaecat
                  tempor dolor ipsum do eu sint culpa non amet. Tempor do mollit
                  mollit ut ea cillum quis ut non voluptate cupidatat.
                </p>
              </Container>
            </VStackBox>
          </Center>
        </HStack>
      </Section>

      {/** Latest News Section */}
      <Section id="latest-news">
        <VStackBox>
          <Center w="100%">
            <Container flexDirection={"column"} textAlign="center">
              <h2>Latest News</h2>
              <p>Lorem ipsum dolor sit amet</p>
            </Container>
          </Center>

          <Center w="100%">
            <Container>
              <ArticlePreview />
              <ArticlePreview />
              <ArticlePreview />
              <ArticlePreview />
            </Container>
          </Center>
        </VStackBox>
      </Section>

      {/** Contact Us Section */}
      <Section id="contact-us" minH="auto">
        <Center w="100%" flexDirection={"column"}>
          <Container flexDirection={"column"} textAlign="center">
            <h2>Subscribe to our newsletter</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </Container>
          <HStack>
            <Input variant="outline" placeholder="Your best e-mail" />
            <Button>Subscribe</Button>
          </HStack>
        </Center>
      </Section>
    </Box>
  );
}

function ArticlePreview() {
  return (
    <VStackBox flexDirection={"column"} mb="1rem">
      <h3>Article title</h3>
      <h4>Article subtitle</h4>
      <p>
        Consequat consequat Lorem pariatur commodo. Nisi anim occaecat tempor
        dolor ipsum do eu sint culpa non amet...
      </p>
    </VStackBox>
  );
}

function Card() {
  return (
    <Box
      borderRadius={"md"}
      boxShadow={"md"}
      p="1rem"
      minW="270px"
      maxW="450px"
    >
      <h4>Card title</h4>
      <p>
        Vivamus fermentum semper porta. Nunc diam velit, adipscing ut tristique
        vitae sagittis vel odio...
      </p>
    </Box>
  );
}

function Section({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Box
      display="flex"
      as="section"
      paddingInline="1rem"
      minH="50vh"
      maxW={["lg", "xl", "6xl"]}
      margin="0 auto"
      paddingBlock="5rem"
      {...props}
    >
      {children}
    </Box>
  );
}
