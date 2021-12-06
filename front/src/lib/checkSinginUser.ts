import { useSetRecoilState } from "recoil";
import { userState } from "@states/users/atoms";
import { useEffect } from "react";

interface Props {
  username: string;
  pass: boolean;
  err?: string | undefined;
}

const CheckSinginUser = ({ username, pass }: Props) => {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    console.log(username, pass);
    if (pass && username) setUser(username);
    else setUser(null);
  }, []);

  return null;
};

export default CheckSinginUser;
