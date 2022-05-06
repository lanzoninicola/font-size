import { useNavigate } from "remix";
import useAppRoutes from "../app/useAppRoutes";

export default function useTypeScaleCalculatorRoutes() {
  const navigate = useNavigate();

  const { ROUTE_APP_ERROR_MISSING_BREAKPOINTS } = useAppRoutes();

  const ROUTE_TYPE_SCALE_CALCULATOR_BASE_ROUTE = "/app/type-scale-calculator";
  const ROUTE_TYPE_SCALE_CALCULATOR = `${ROUTE_TYPE_SCALE_CALCULATOR_BASE_ROUTE}`;

  const actions = {
    NAVIGATE_TO_MISSING_BREAKPOINTS: {
      dispatch: () => navigate(ROUTE_APP_ERROR_MISSING_BREAKPOINTS),
    },
    NAVIGATE_TO_CALCULATOR: {
      dispatch: () => navigate(ROUTE_TYPE_SCALE_CALCULATOR),
    },
  };

  return {
    ROUTE_TYPE_SCALE_CALCULATOR_BASE_ROUTE,
    ROUTE_TYPE_SCALE_CALCULATOR,
    actions,
  };
}
