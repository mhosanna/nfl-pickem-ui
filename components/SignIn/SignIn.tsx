import { useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import styled from 'styled-components';
import Spacer from '../Spacer';
import Tile from '../Tile';
import {
  refetchPlayerQuery,
  useSigninMutation,
} from '../../types/generated-queries';

function SignIn() {
  const [signIn, { data, error: networkError, loading }] = useSigninMutation({
    // refetch the currently logged in Player
    refetchQueries: [refetchPlayerQuery()],
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
    }).catch(console.error);
    reset();
  }

  const error =
    data?.authenticatePlayerWithPassword.__typename ===
    'PlayerAuthenticationWithPasswordFailure'
      ? data?.authenticatePlayerWithPassword
      : undefined;
  return (
    <FormWrapper>
      <form onSubmit={handleSubmit(onSubmit)} method="POST" noValidate={true}>
        <FormHeader>Sign Into Your Account</FormHeader>
        <ErrorMessage error={error || networkError} />
        <Spacer size={12} />
        <InputWrapper>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register('email', { required: true })}
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
        <InputWrapper>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register('password', { required: true })}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
          />
          {errors.password && (
            <ValidationError>Password cannot be blank</ValidationError>
          )}
        </InputWrapper>
        <Spacer size={24} />
        <Button type="submit" disabled={loading}>
          Sign In
        </Button>
        {data?.authenticatePlayerWithPassword.__typename ===
          'PlayerAuthenticationWithPasswordSuccess' && (
          <>
            <Spacer size={24} />
            <Tile type="success">Success! You are now signed in</Tile>
          </>
        )}
      </form>
    </FormWrapper>
  );
}

export { SignIn };

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
  &:disabled {
    background: var(--gray700);
  }
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
