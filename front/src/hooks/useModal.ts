import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

type CallbackFC = () => void;
type ReturnTypes = [boolean, CallbackFC, CallbackFC, Dispatch<SetStateAction<boolean>>];

const useModal = (): ReturnTypes => {
  const router = useRouter();
  const [isOpen, setter] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setter(true);
  }, []);

  const onClose = useCallback(() => {
    setter(false);
  }, []);

  useEffect(() => {
    onClose();
  }, [router.asPath]);

  return [isOpen, onOpen, onClose, setter];
};

export default useModal;
