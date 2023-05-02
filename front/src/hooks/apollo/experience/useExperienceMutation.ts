import { useMutation } from "@apollo/client";
import {
  IAddExperience,
  IDeleteExperience,
  IEditExperience,
  IExperienceInput,
  IGetExperiences,
} from "@queries-types/experience";
import {
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  EDIT_EXPERIENCE,
  GET_EXPERIENCES,
} from "@queries/experience";

const useExperienceMutation = (cb: () => void) => {
  const onCompleted = () => cb();

  const [addExpMutation] = useMutation<IAddExperience>(ADD_EXPERIENCE, {
    onCompleted,
    update: (cache, { data }) => {
      if (!data?.addExperience) return;

      const { experience } = data.addExperience;

      cache.updateQuery<IGetExperiences>(
        {
          query: GET_EXPERIENCES,
        },
        (prev) => {
          if (!prev) return;

          const {
            getExperiences: { experiences },
          } = prev;

          const newExperiences = [...experiences, experience];

          newExperiences.sort((a, b) => {
            const aStartDate = new Date(a.startDate);
            const bStartDate = new Date(b.startDate);

            return bStartDate.getTime() - aStartDate.getTime();
          });

          return {
            getExperiences: {
              ...prev.getExperiences,
              experiences: newExperiences,
            },
          };
        },
      );
    },
  });
  const [editExpMutation] = useMutation<IEditExperience>(EDIT_EXPERIENCE, {
    onCompleted,
  });
  const [deleteExpMutation] = useMutation<IDeleteExperience>(DELETE_EXPERIENCE, {
    onCompleted,
    update: (cache, { data }) => {
      if (!data?.deleteExperience) return;

      const id = cache.identify({
        _id: data?.deleteExperience.experience._id,
        __typename: "Experience",
      });

      cache.evict({ id });
      cache.gc();
    },
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
