import { useSetRecoilState } from "recoil";
import { userState } from "@states/users/atoms";
import { useEffect } from "react";

interface Props {
  username: string | null;
  pass: boolean;
  err?: string;
}

const CheckSinginUser = ({ username, pass }: Props) => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    if (pass) setUser(username);
  }, []);

  return null;
};

export default CheckSinginUser;
