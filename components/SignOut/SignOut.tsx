import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_PLAYER_QUERY } from "../../lib/usePlayer";
import Icon from "../Icon";

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signOut] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_PLAYER_QUERY }],
  });
  return (
    <StyledButton type="button" onClick={signOut}>
      <Icon name={"LogOut"} />
      Sign Out
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  gap: 1.8rem;
  align-items: center;
  flex-basis: 4rem;
  font-size: 1.8rem;
  font-family: var(--body-font);
  color: var(--black);
  width: 259px;
  padding-left: 59px;
  background-color: inherit;
  border: none;
  border-radius: 0px 15px 15px 0px;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;
