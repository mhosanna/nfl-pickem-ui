import styled from 'styled-components';

const ErrorMessage = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Oops!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ));
  }
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
