import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { CURRENT_PLAYER_QUERY } from "../../lib/usePlayer";
import ErrorMessage from "../ErrorMessage";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticatePlayerWithPassword(email: $email, password: $password) {
      ... on PlayerAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on PlayerAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    // refetch the currently logged in Player
    refetchQueries: [{ query: CURRENT_PLAYER_QUERY }],
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(data) {
    console.log(data);
    const res = await signin({
      variables: data,
    });
    console.log(res);
    reset();
  }
  const error =
    data?.authenticatePlayerWithPassword.__typename ===
    "PlayerAuthenticationWithPasswordFailure"
      ? data?.authenticatePlayerWithPassword
      : undefined;
  return (
    <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate={true}>
      <h2>Sign Into Your Account</h2>
      <ErrorMessage error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
          />
        </label>
        <button type="submit">Sign In!</button>
      </fieldset>
    </form>
  );
}
