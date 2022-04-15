import React from "react";

interface Props {
  openMenu: () => void;
}

const MenuIcon = ({ openMenu }: Props) => (
  <svg onClick={openMenu} width="24" height="24" viewBox="0 0 24 24">
    <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
  </svg>
);

export default MenuIcon;
