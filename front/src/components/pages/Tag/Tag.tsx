import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Tag = () => {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    const { name } = router.query;
    if (typeof name === "string") setSelectedTag(name);
    else if (typeof name === "object")
      setSelectedTag(
        name.reduce((text, cur) => {
          text += cur;
          return text;
        }, ""),
      );
  }, []);

  return (
    <div>
      <div>태그 리스트</div>
      <div>포스트 리스트</div>
    </div>
  );
};

export default Tag;
