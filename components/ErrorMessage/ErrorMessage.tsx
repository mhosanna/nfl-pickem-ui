import { ApolloError } from '@apollo/client';
import styled from 'styled-components';

interface ErrorMessageProps {
  error:
    | ApolloError
    | UserAuthenticationWithPasswordFailure
    | RedeemUserPasswordResetTokenResult
    | undefined;
}

interface UserAuthenticationWithPasswordFailure {
  message: string;
}

interface RedeemUserPasswordResetTokenResult {
  code: PasswordResetRedemptionErrorCode;
  message: string;
}

enum PasswordResetRedemptionErrorCode {
  FAILURE,
  TOKEN_EXPIRED,
  TOKEN_REDEEMED,
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error || !error.message) return null;

  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Oops!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  );
};

const ErrorStyles = styled.div`
  padding: 1rem;
  background: var(--warningLight);
  margin: 1rem 0;
  border: 1px solid var(--warning);
  border-radius: 30px;
  strong {
    margin-right: 1rem;
  }
`;

export default ErrorMessage;
