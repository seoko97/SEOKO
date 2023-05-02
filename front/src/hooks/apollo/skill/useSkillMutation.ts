import { useMutation } from "@apollo/client";
import {
  IAddSkill,
  IDeleteSkill,
  IEditSkill,
  IGetSkills,
  ISkillInput,
  SkillType,
} from "@queries-types/skill";
import { ADD_SKILL, DELETE_SKILL, EDIT_SKILL, GET_SKILLS } from "@queries/skills";

const useSkillMutation = (cb: () => void) => {
  const onCompleted = () => cb();

  const [addSkillMutation] = useMutation<IAddSkill>(ADD_SKILL, {
    onCompleted,
    update: (cache, { data }) => {
      if (!data?.addSkill) return;

      const { skill } = data.addSkill;

      cache.updateQuery<IGetSkills>(
        {
          query: GET_SKILLS,
        },
        (prev) => {
          if (!prev) return;

          const {
            getSkills: { skills },
          } = prev;

          const newSkills = { ...skills };

          newSkills[skill.type] = [...newSkills[skill.type], skill];

          return {
            getSkills: {
              ...prev.getSkills,
              skills: newSkills,
            },
          };
        },
      );
    },
  });

  const [editSkillMutation] = useMutation<IEditSkill>(EDIT_SKILL, {
    onCompleted,
    update: (cache, { data }) => {
      if (!data?.editSkill) return;

      const { skill } = data.editSkill;

      cache.updateQuery<IGetSkills>(
        {
          query: GET_SKILLS,
        },
        (prev) => {
          if (!prev) return;

          const {
            getSkills: { skills },
          } = prev;

          const newSkills = { ...skills };
          const types = Object.keys(newSkills) as SkillType[];

          types.forEach((key) => {
            if (!(newSkills[key] instanceof Array)) return;
            newSkills[key] = newSkills[key].filter((s) => s._id !== skill._id);
          });

          newSkills[skill.type] = [...newSkills[skill.type], skill];

          return {
            getSkills: {
              ...prev.getSkills,
              skills: newSkills,
            },
          };
        },
      );
    },
  });
  const [deleteSkillMutation] = useMutation<IDeleteSkill>(DELETE_SKILL, {
    onCompleted,
    update: (cache, { data }) => {
      if (!data?.deleteSkill) return;

      const id = cache.identify({ _id: data.deleteSkill.skill._id, __typename: "Skill" });

      cache.evict({ id });
      cache.gc();
    },
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
