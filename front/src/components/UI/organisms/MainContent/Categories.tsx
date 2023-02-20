import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";

interface IProps {
  changeCategory: (e: string) => void;
}

const CATEGORIES = {
  all: "All",
  dev: "Dev",
  daily: "Daily",
} as const;

const Categories: React.FC<IProps> = ({ changeCategory }) => {
  const router = useRouter();
  const category = router.query.category as keyof typeof CATEGORIES;
  const [selectedCategory, setSelectedCategory] = useState<string>(CATEGORIES[category] ?? "All");

  const onClickCategory: React.MouseEventHandler<HTMLLIElement> = useCallback(
    (e) => {
      const category =
        CATEGORIES[e.currentTarget.innerText.toLowerCase() as keyof typeof CATEGORIES];

      if (!category) return;

      setSelectedCategory(category);
      changeCategory(e.currentTarget.innerText.toLowerCase());
    },
    [changeCategory],
  );

  return (
    <Container>
      {Object.values(CATEGORIES).map((category, i) => (
        <li
          key={i + category}
          onClick={onClickCategory}
          className={selectedCategory === category ? "selected" : ""}
        >
          {category}
        </li>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  gap: 12px;

  font-weight: bold;
  color: #cccccc;

  & > li {
    transition: color 0.3s;
    cursor: pointer;

    &.selected,
    &:hover {
      color: ${({ theme }) => theme.FONT_COLOR.PRIMARY_COLOR};
    }
  }
`;

export default Categories;
