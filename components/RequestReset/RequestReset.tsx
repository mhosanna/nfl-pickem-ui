import gql from "graphql-tag";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import Spacer from "../Spacer";
import Icon from "../Icon";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendPlayerPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();
  const [resetPassword, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION
  );
  async function onSubmit(data) {
    const res = await resetPassword({
      variables: data,
    }).catch(console.error);
    console.log(res);
    console.log({ data, loading, error });
    reset();
  }
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate={true}>
        <FormHeader>Request a Password Reset</FormHeader>
        <ErrorMessage error={error} />
        <Spacer size={12} />
        <InputWrapper>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", { required: true })}
            type="email"
            id="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
          />
          {errors.email && (
            <ValidationError>Email cannot be blank</ValidationError>
          )}
        </InputWrapper>
        <Spacer size={24} />
        <Button type="submit">Request Reset</Button>
        {data?.sendPlayerPasswordResetLink === null && (
          <>
            <Spacer size={24} />
            <Tile>
              <Icon name="Check" size={15} color={"var(--gray700)"} />
              <span> Success! Check your email for a link!</span>
            </Tile>
          </>
        )}
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  border: 2px solid var(--black);
  padding: 16px 36px;
  h2 {
    font-size: 2rem;
  }
`;

const FormHeader = styled.h2`
  white-space: nowrap;
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
  width: 100%;
  padding: 1rem;
  font-size: 1.6rem;
  border-radius: 3px;
  border: 2px solid var(--black);
`;

const ValidationError = styled.span`
  font-size: 1.2rem;
  color: var(--warning);
`;

const Tile = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  max-height: 20px;
  padding: 1px 12px;
  border: 2px solid var(--successDark);
  border-radius: 50px;
  font-size: 1.2rem;
  background-color: var(--success);
`;
