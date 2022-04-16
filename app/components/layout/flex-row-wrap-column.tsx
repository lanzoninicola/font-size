import VStackBox from "~/components/shared/vstack-wrapper";

export default function FlexRowWrapColumn({
  children,
  wrapAt,
  maxW,
  ...props
}: {
  children: React.ReactNode;
  wrapAt: string;
  maxW: string;
  [key: string]: any;
}) {
  return (
    <VStackBox
      className="flex-row-wrap-column"
      gap="2rem"
      marginBlock="2rem"
      flex={`"1 0 ${wrapAt}"`}
      maxW={maxW}
      {...props}
    >
      {children}
    </VStackBox>
  );
}
