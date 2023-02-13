import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";

import { userInfoVar } from "@store/userInfo";
import { IPost } from "@queries-types/posts";
import { IProject } from "@queries-types/project";

interface IProps {
  post?: IPost;
  project?: IProject;
}

const auth =
  <Props extends IProps>(Component: React.FC<Props>): React.FC<Props> =>
  (props: Props) => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const { username } = useReactiveVar(userInfoVar);

    const isTemporary: boolean = (props.post || props.project)?.isTemporary || false;

    useEffect(() => {
      if (isTemporary && !username) {
        router.back();
      } else if (!show) setShow(true);
    }, [username]);

    return show ? <Component {...props} /> : <></>;
  };

export default auth;
