import {
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
import { BreakpointFlat } from "~/domain/breakpoints/interfaces";

import useBreakpointsDataService from "~/domain/breakpoints/useBreakpointsDataService";
import useBreakpointsFormService from "~/domain/breakpoints/useBreakpointsFormService";
import useBreakpointsRoutesNavigate from "~/domain/breakpoints/useBreakpointsRoutesNavigate";

import ActionButton from "../shared/action-button";
import {
  EditIcon,
  MaxWidthIcon,
  MinWidthIcon,
  TrashIcon,
} from "../shared/icons";
import TableTitle from "../shared/table-title";

export default function BreakpointsList() {
  const toast = useToast();

  const { breakpoints: breakpointContext } = useBreakpointsSelector();

  const { listAll } = useBreakpointsDataService();
  const { onDeleteBreakpoint } = useBreakpointsFormService();
  const { navigateTuUpdateBreakpoint } = useBreakpointsRoutesNavigate();

  const [breakpoints, setBreakpoints] = useState<BreakpointFlat[]>([]);

  function loadBreakpoints() {
    const breakpointsResponse = listAll();

    if (breakpointsResponse) {
      const { ok, payload } = breakpointsResponse;

      if (ok) {
        if (payload) {
          setBreakpoints(payload);
        }
      }
    }
  }

  function onBreakpointUpdate(breakpointId: BreakpointId) {
    navigateTuUpdateBreakpoint(breakpointId);
  }

  function onBreakpointDelete(id: BreakpointId) {
    const deleteResponse = onDeleteBreakpoint(id);

    if (!deleteResponse.ok) {
      toast({
        title: "Error",
        description: deleteResponse.error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }

  useEffect(() => {
    loadBreakpoints();
  }, [breakpointContext]);

  return (
    <TableContainer>
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th>
              <TableTitle>Actions</TableTitle>
            </Th>
            <Th>
              <TableTitle>Breakpoint</TableTitle>
            </Th>
            <Th>
              <TableTitle>Min Viewport Width</TableTitle>
            </Th>
            <Th>
              <TableTitle>Max Viewport Width</TableTitle>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {breakpoints.map((breakpoint, index) => {
            const { id, minWidth, maxWidth, label } = breakpoint;

            return (
              <Tr key={index}>
                <Td>
                  <HStack>
                    <ActionButton
                      label="Edit entity"
                      noHoverbg
                      onClick={() => onBreakpointUpdate(id)}
                    >
                      <EditIcon ariaLabel="Edit entity" color="gray" />
                    </ActionButton>
                    <ActionButton
                      label="Remove entity"
                      noHoverbg
                      onClick={() => onBreakpointDelete(id)}
                    >
                      <TrashIcon
                        ariaLabel="Remove entity"
                        color="gray"
                        size={20}
                      />
                    </ActionButton>
                  </HStack>
                </Td>
                <Td textAlign={"left"}>
                  <Text color="primary.500">{label}</Text>
                </Td>
                <Td>
                  <HStack>
                    <MinWidthIcon color="gray" />
                    <Text color="primary.500">{`${minWidth}px`}</Text>
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <MaxWidthIcon color="gray" />
                    <Text color="primary.500">{`${maxWidth}px`}</Text>
                  </HStack>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
