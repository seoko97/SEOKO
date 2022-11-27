import React from "react";
import Styles from "./styles";

const SkeletonPost = () => {
  return (
    <>
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <Styles.Container key={i}>
            <Styles.Image />
            <Styles.PostContent>
              <Styles.Content w="40%" h="23px" />
              <Styles.Content w="90%" h="18px" />
              <Styles.TagWrapper>
                <Styles.Tag />
                <Styles.Tag />
                <Styles.Tag />
                <Styles.Tag />
                <Styles.Tag />
              </Styles.TagWrapper>
              <Styles.Content w="20%" h="18px" />
            </Styles.PostContent>
          </Styles.Container>
        ))}
    </>
  );
};

export default SkeletonPost;
