import { GetServerSideProps, GetServerSidePropsContext } from "next";

const withErrorHandling =
  (cb: GetServerSideProps) => async (context: GetServerSidePropsContext) => {
    try {
      return await cb(context);
    } catch (e) {
      return {
        props: {},
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  };

export { withErrorHandling };
