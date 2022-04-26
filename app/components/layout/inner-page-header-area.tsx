import VStackBox from "../shared/vstack-wrapper";

export default function InnerPageHeaderArea({
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
      className="inner-page-header-area"
    >
      {children}
    </VStackBox>
  );
}
