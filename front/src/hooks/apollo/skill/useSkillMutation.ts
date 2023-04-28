import { useMutation } from "@apollo/client";
import { IAddSkill, IDeleteSkill, IEditSkill, ISkillInput } from "@queries-types/skill";
import { ADD_SKILL, DELETE_SKILL, EDIT_SKILL } from "@queries/skills";

const useSkillMutation = (cb: () => void) => {
  const onCompleted = () => cb();

  const [addSkillMutation] = useMutation<IAddSkill>(ADD_SKILL, {
    onCompleted,
  });
  const [editSkillMutation] = useMutation<IEditSkill>(EDIT_SKILL, {
    onCompleted,
  });
  const [deleteSkillMutation] = useMutation<IDeleteSkill>(DELETE_SKILL, {
    onCompleted,
  });

  const onCreateOrUpdateSkill = (input: ISkillInput) => {
    const mutation = input._id ? editSkillMutation : addSkillMutation;

    mutation({ variables: { input } });
  };

  const onDeleteSkill = (_id: string) => {
    deleteSkillMutation({ variables: { input: { _id } } });
  };

  return [onCreateOrUpdateSkill, onDeleteSkill] as const;
};

export { useSkillMutation };
