import useHtmlSelectorsSelector from "~/context/app/hooks/useHtmlSelectorsSelector";

export default function useSelectorsQueryService() {
  const { htmlSelectors } = useHtmlSelectorsSelector();
}
