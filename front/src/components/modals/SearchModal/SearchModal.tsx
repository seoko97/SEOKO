import React from "react";
import ModalLayout from "@modals/ModalLayout";
import SearchForm from "@organisms/SearchForm";

interface IProps {
  onClose: () => void;
}

const SearchModal = ({ onClose }: IProps) => {
  return (
    <ModalLayout onClick={onClose}>
      <SearchForm />
    </ModalLayout>
  );
};

export default SearchModal;
