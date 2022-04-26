import VStackBox from "../shared/vstack-wrapper";

export default function InnerPageHeaderArea({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <VStackBox
      minH="100px"
      borderBottom="1px solid"
      borderBottomColor="primaryAlpha.20"
      paddingInlineStart="1rem"
      paddingRight="1rem"
      className="inner-page-header-area"
      {...props}
    >
      {children}
    </VStackBox>
  );
}
