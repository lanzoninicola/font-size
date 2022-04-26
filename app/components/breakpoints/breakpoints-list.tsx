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
import useBreakpointsSelector from "~/context/app/hooks/useBreakpointsSelector";
import { BreakpointId } from "~/context/breakpoint-builder/interfaces";
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

  const { breakpoints } = useBreakpointsSelector();
  const { onDeleteBreakpoint } = useBreakpointsFormService();

  const { navigateTuUpdateBreakpoint } = useBreakpointsRoutesNavigate();

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
          {breakpoints &&
            Object.keys(breakpoints).map(
              (breakpointId: BreakpointId, index) => {
                const { minWidth, maxWidth } = breakpoints[breakpointId];

                return (
                  <Tr key={index}>
                    <Td>
                      <HStack>
                        <ActionButton
                          label="Edit entity"
                          noHoverbg
                          onClick={() => onBreakpointUpdate(breakpointId)}
                        >
                          <EditIcon ariaLabel="Edit entity" color="gray" />
                        </ActionButton>
                        <ActionButton
                          label="Remove entity"
                          noHoverbg
                          onClick={() => onBreakpointDelete(breakpointId)}
                        >
                          <TrashIcon
                            ariaLabel="Remove entity"
                            color="gray"
                            size={20}
                          />
                        </ActionButton>
                      </HStack>
                    </Td>
                    <Td textAlign={"right"}>
                      <Text color="primary.500">
                        {breakpoints[breakpointId].label}
                      </Text>
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
              }
            )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
