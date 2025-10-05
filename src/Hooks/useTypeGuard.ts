import { UIScaleOption, WriteOption } from "../types/types";

function useTypeGuard() {
  const validUIScaleOption = new Set([0, 1, 2, 3]);
  const isUIScaleOption = (value: number): value is UIScaleOption => {
    return validUIScaleOption.has(value);
  };

  const validWriteOption = new Set<WriteOption>(["create", "modify"]);
  const isWriteOption = (value: string | null): value is WriteOption => {
    return validWriteOption.has(value as WriteOption);
  };

  return { isUIScaleOption, isWriteOption };
}

export default useTypeGuard;
