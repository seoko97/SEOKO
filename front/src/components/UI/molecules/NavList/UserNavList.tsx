import React, { useCallback } from "react";
import NavItem from "@atoms/NavItem";
import styled from "@emotion/styled";
import { useMutation, useReactiveVar } from "@apollo/client";
import { setUserInfo, userInfoVar } from "@store/userInfo";
import { SIGN_OUT } from "@queries/users";
import { ISignOut } from "@queries-types/users";
import { useRouter } from "next/router";

export const Container = styled.ul`
  width: 150px;
  padding: 10px 8px;

  & li {
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
    color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    transition: background-color 0.3s;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 5px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const NavList = () => {
  const { username } = useReactiveVar(userInfoVar);
  const router = useRouter();
  const [singout, { client }] = useMutation<ISignOut>(SIGN_OUT, {
    onCompleted({ signout }) {
      if (signout.ok) {
        client.cache.evict({
          id: "ROOT_QUERY",
          fieldName: "getUserInfo",
        });
        setUserInfo(null);
        router.push("/");
      }
    },
  });

  const onSignOut = useCallback(() => singout(), []);

  return (
    <Container>
      <li>{username} 님</li>
      <NavItem name="새 글쓰기" href="/write/post" />
      <NavItem name="프로젝트 추가" href="/write/project" />
      <li onClick={onSignOut}>로그아웃</li>
    </Container>
  );
};
export default NavList;
