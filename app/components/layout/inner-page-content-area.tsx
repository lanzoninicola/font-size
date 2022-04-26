import VStackBox from "../shared/vstack-wrapper";

export default function InnerPageContentArea({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VStackBox
      w="100%"
      gap=".5rem"
      paddingLeft="1rem"
      paddingRight="1rem"
      mt="2rem"
    >
      {children}
    </VStackBox>
  );
}
