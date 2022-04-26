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
import { MediaQueries } from "~/context/font-size/interfaces";
import useBreakpointsQueryService from "~/domain/breakpoints/useBreakpointsQueryService";
import useMediaQueriesFilter from "~/domain/media-query/useMediaQueriesFilter";
import useMediaQueryService from "~/domain/media-query/useMediaQueryService";

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
  const { editMediaQuery, deleteMediaQuery } = useMediaQueryService();

  const { getBreakpointName } = useBreakpointsQueryService();

  const { mediaQueriesFiltered } = useMediaQueriesFilter();
  const [mediaQueries, setMediaQueries] = useState<MediaQueries>();

  useEffect(() => {
    if (mediaQueriesFiltered) {
      setMediaQueries(mediaQueriesFiltered);
    }

    console.log("MediaQueryListItems", mediaQueriesFiltered, mediaQueries);
  }, [mediaQueriesFiltered]);

  return (
    <>
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>
                <TableTitle textAlign="center">Actions</TableTitle>
              </Th>
              <Th>
                <TableTitle gridArea={"colTitle2"}>Media Query</TableTitle>
              </Th>
              <Th>
                <TableTitle gridArea={"colTitle3"}>Selector</TableTitle>
              </Th>
              <Th>
                <TableTitle gridArea={"colTitle4"}>Values</TableTitle>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {mediaQueries &&
              Object.keys(mediaQueries).map((breakpointId) => {
                return Object.keys(mediaQueries[breakpointId]).map(
                  (selectorId, index) => {
                    const { minFontSize, maxFontSize } =
                      mediaQueries[breakpointId][selectorId];

                    return (
                      <Tr key={index}>
                        <Td>
                          <HStack gridArea={"colContent1"}>
                            <ActionButton
                              label="Edit entity"
                              noHoverbg
                              onClick={() =>
                                editMediaQuery(breakpointId, selectorId)
                              }
                            >
                              <EditIcon ariaLabel="Edit entity" color="gray" />
                            </ActionButton>
                            <ActionButton
                              label="Remove entity"
                              noHoverbg
                              onClick={() =>
                                deleteMediaQuery(breakpointId, selectorId)
                              }
                            >
                              <TrashIcon
                                ariaLabel="Remove entity"
                                color="gray"
                                size={20}
                              />
                            </ActionButton>
                          </HStack>
                        </Td>
                        <Td>
                          <Text color="primary.500" gridArea={"colContent2"}>
                            {getBreakpointName(breakpointId)}
                          </Text>
                        </Td>
                        <Td>
                          <Text color="primary.500" gridArea={"colContent3"}>
                            {selectorId}
                          </Text>
                        </Td>
                        <Td>
                          <HStack gap="1rem" gridArea={"colContent4"}>
                            <HStack>
                              <MinFontSizeIcon color="gray" />
                              <Text color="primary.500">{`${minFontSize}rem`}</Text>
                            </HStack>
                            <HStack>
                              <MaxFontSizeIcon color="gray" />
                              <Text color="primary.500">{`${maxFontSize}rem`}</Text>
                            </HStack>
                            <HStack>
                              <LineHeightIcon color="gray" />
                              <Text color="primary.500">0.1</Text>
                            </HStack>
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
