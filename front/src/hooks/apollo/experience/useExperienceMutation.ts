import { useMutation } from "@apollo/client";
import {
  IAddExperience,
  IDeleteExperience,
  IEditExperience,
  IExperienceInput,
} from "@queries-types/experience";
import { ADD_EXPERIENCE, DELETE_EXPERIENCE, EDIT_EXPERIENCE } from "@queries/experience";

const useExperienceMutation = (cb: () => void) => {
  const onCompleted = () => cb();

  const [addExpMutation] = useMutation<IAddExperience>(ADD_EXPERIENCE, {
    onCompleted,
  });
  const [editExpMutation] = useMutation<IEditExperience>(EDIT_EXPERIENCE, {
    onCompleted,
  });
  const [deleteExpMutation] = useMutation<IDeleteExperience>(DELETE_EXPERIENCE, {
    onCompleted,
  });

  const onCreateOrUpdateExp = (input: IExperienceInput) => {
    const mutation = input._id ? editExpMutation : addExpMutation;

    mutation({ variables: { input } });
  };

  const onDeleteExp = (_id: string) => {
    deleteExpMutation({ variables: { input: { _id } } });
  };

  return [onCreateOrUpdateExp, onDeleteExp] as const;
};

export { useExperienceMutation };
