import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

type CallbackFC = (e: ChangeEvent) => void;
type ReturnTypes = [string, CallbackFC, Dispatch<SetStateAction<string>>];

const useInput = (initialValue = ""): ReturnTypes => {
  const [value, setter] = useState<string>(initialValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler, setter];
};

export default useInput;
