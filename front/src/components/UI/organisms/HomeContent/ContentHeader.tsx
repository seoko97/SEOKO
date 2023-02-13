import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface IProps {
  changeCategory: (e: string) => void;
}

const CATEGORIES = {
  all: "All",
  dev: "Dev",
  daily: "Daily",
} as const;

const ContentHeader = ({ changeCategory }: IProps) => {
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
      <ul>
        {Object.values(CATEGORIES).map((category, i) => (
          <li
            key={i + category}
            onClick={onClickCategory}
            className={selectedCategory === category ? "selected" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;

  & > ul {
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
  }

  @media (max-width: ${({ theme }) => theme.BP.TABLET}) {
    width: 100%;
  }
`;

export default ContentHeader;
