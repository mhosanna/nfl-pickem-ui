import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { CURRENT_PLAYER_QUERY } from "../../lib/usePlayer";
import ErrorMessage from "../ErrorMessage";
import styled from "styled-components";
import Spacer from "../Spacer";

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
  const [signIn, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    // refetch the currently logged in Player
    refetchQueries: [{ query: CURRENT_PLAYER_QUERY }],
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  async function onSubmit(data) {
    await signIn({
      variables: data,
    });
    reset();
  }
  const error =
    data?.authenticatePlayerWithPassword.__typename ===
    "PlayerAuthenticationWithPasswordFailure"
      ? data?.authenticatePlayerWithPassword
      : undefined;
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate={true}>
        <h2>Sign Into Your Account</h2>
        <ErrorMessage error={error} />
        <Spacer size={12} />
        <InputWrapper>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", { required: true })}
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
          />
          {errors.email && (
            <ValidationError>Email cannot be blank</ValidationError>
          )}
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", { required: true })}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
          />
          {errors.password && (
            <ValidationError>Password cannot be blank</ValidationError>
          )}
        </InputWrapper>
        <Spacer size={24} />
        <Button type="submit">Sign In</Button>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  width: 33%;
  border: 2px solid var(--black);
  padding: 16px;
  h2 {
    font-size: 2rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 5px;
`;

const Button = styled.button`
  display: block;
  font-size: 1.4rem;
  padding: 8px 32px;
  background: var(--black);
  color: white;
  border: none;
  border-radius: 3px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 1rem;
  font-size: 1.5rem;
  border-radius: 3px;
  border: 2px solid var(--black);
`;

const ValidationError = styled.span`
  font-size: 1.2rem;
  color: var(--warning);
`;
