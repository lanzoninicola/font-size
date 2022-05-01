import {
  Grid,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MediaQueries } from "~/context/app/interfaces";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesFilter from "~/domain/media-queries/useMediaQueriesFilter";
import useMediaQueriesService from "~/domain/media-queries/useMediaQueriesService";
import useSelectorsService from "~/domain/selectors/useSelectorsService";

import ActionButton from "../shared/action-button";
import {
  EditIcon,
  LineHeightIcon,
  MaxFontSizeIcon,
  MinFontSizeIcon,
  TrashIcon,
} from "../shared/icons";
import TableTitle from "../shared/table-title";

export default function MediaQueryList() {
  const { getBreakpointName } = useBreakpointsQueryService();
  const { getSelectorNameById } = useSelectorsService();

  const { mediaQueriesFiltered } = useMediaQueriesFilter();
  const [mediaQueries, setMediaQueries] = useState<MediaQueries>();

  useEffect(() => {
    if (mediaQueriesFiltered) {
      setMediaQueries(mediaQueriesFiltered);
    }
  }, [mediaQueriesFiltered]);

  return (
    <>
      <TableContainer maxW={"1440px"}>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>
                <TableTitle>Media Query</TableTitle>
              </Th>
              <Th>
                <TableTitle>Selector</TableTitle>
              </Th>
              <Th>
                <TableTitle>Font Size (MIN)</TableTitle>
              </Th>
              <Th>
                <TableTitle>Font Size (MAX)</TableTitle>
              </Th>
              <Th>
                <TableTitle>Line Height</TableTitle>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {mediaQueries &&
              Object.keys(mediaQueries).map((breakpointId) => {
                return Object.keys(mediaQueries[breakpointId]).map(
                  (selectorId, index) => {
                    const { minFontSize, maxFontSize, lineHeight } =
                      mediaQueries[breakpointId][selectorId];

                    const selectorName = getSelectorNameById(selectorId);

                    return (
                      <Tr key={index}>
                        <Td>
                          <Text
                            color="primary.500"
                            fontSize={"sm"}
                            gridArea={"colContent2"}
                          >
                            {getBreakpointName(breakpointId)}
                          </Text>
                        </Td>
                        <Td>
                          <Text color="primary.500" gridArea={"colContent3"}>
                            {selectorName}
                          </Text>
                        </Td>
                        <Td>
                          <HStack>
                            <MinFontSizeIcon color="gray" />
                            <Text color="primary.500">{`${minFontSize}rem`}</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <HStack>
                            <MaxFontSizeIcon color="gray" />
                            <Text color="primary.500">{`${maxFontSize}rem`}</Text>
                          </HStack>
                        </Td>
                        <Td>
                          <HStack>
                            <LineHeightIcon color="gray" />
                            <Text color="primary.500">{`${lineHeight}%`}</Text>
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  }
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
