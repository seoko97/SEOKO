import React from "react";
import ModalLayout from "@modals/ModalLayout";
import SearchForm from "@organisms/SearchForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: IProps) => {
  return (
    <ModalLayout onClick={onClose}>
      <SearchForm />
    </ModalLayout>
  );
};

export default SearchModal;
