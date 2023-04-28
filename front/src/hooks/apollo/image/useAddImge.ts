import { useMutation } from "@apollo/client";
import { IAddImage } from "@queries-types/image";
import { ADD_IMAGE } from "@queries/image/addImage.queries";
import { useCallback, useState } from "react";

interface IProps {
  defaultImg?: string;
  type: "post" | "project" | "skill";
}

const useAddImage = ({ defaultImg, type }: IProps) => {
  const [addImageMutation] = useMutation<IAddImage>(ADD_IMAGE, {
    onCompleted({ addImage }) {
      const { image } = addImage;

      setCoverImg(image);
    },
  });

  const [coverImg, setCoverImg] = useState<string>(defaultImg || "/main.jpg");

  const clearCoverImage = useCallback(() => {
    setCoverImg("");
  }, []);

  const onChangeImage: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!e.target.files) return;

    addImageMutation({
      variables: {
        input: {
          type,
          image: e.target.files[0],
        },
      },
    });
  }, []);

  return [coverImg, onChangeImage, clearCoverImage] as const;
};

export { useAddImage };
