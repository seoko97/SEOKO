import { Dispatch, SetStateAction, useCallback, useState } from "react";

type CallbackFC = () => void;
type ReturnTypes = [boolean, CallbackFC, CallbackFC, Dispatch<SetStateAction<boolean>>];

const useModal = (): ReturnTypes => {
  const [isOpen, setter] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setter(true);
  }, []);

  const onClose = useCallback(() => {
    setter(false);
  }, []);

  return [isOpen, onOpen, onClose, setter];
};

export default useModal;
