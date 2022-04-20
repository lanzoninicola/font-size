import VStackBox from "../shared/vstack-wrapper";

export default function SectionSubHeaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VStackBox
      minH="100px"
      borderBottom="1px solid"
      borderBottomColor="primaryAlpha.20"
      paddingInlineStart="2rem"
      paddingRight="1rem"
    >
      {children}
    </VStackBox>
  );
}
