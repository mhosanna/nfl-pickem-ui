// @ts-nocheck
import { useState, useEffect } from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import Icon from '../Icon';
import { useGetTeamsQuery } from '../../types/generated-queries';

export default function TeamComboBoxWrapper(props) {
  const { data, error, loading } = useGetTeamsQuery();
  const [allItems, setAllItems] = useState([]);
  const [inputItems, setInputItems] = useState([]);

  useEffect(() => {
    if (data) {
      const { teams } = data;
      setAllItems(teams);
      setInputItems(teams);
    }
  }, [data]);

  const itemToString = (item) => (item ? item.city + ' ' + item.name : '');

  return (
    <TeamsComboBox
      {...props}
      allItems={allItems}
      inputItems={inputItems}
      setInputItems={setInputItems}
      itemToString={itemToString}
      teamsLoading={loading}
    />
  );
}

const TeamsComboBox = ({
  id,
  onChange,
  inputRef,
  disabled = false,
  allItems,
  inputItems,
  setInputItems,
  itemToString,
  label,
  teamsLoading,
  initialTeam = null,
}) => (
  <Downshift
    id={id}
    onChange={onChange}
    itemToString={itemToString}
    initialSelectedItem={initialTeam}
    onInputValueChange={(inputValue) => {
      setInputItems(
        allItems.filter((item) =>
          itemToString(item).toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      getToggleButtonProps,
      clearSelection,
      highlightedIndex,
      selectedItem,
      isOpen,
    }) => (
      <div>
        <Label {...getLabelProps()}>{label}</Label>
        <ComboBoxWrapper>
          <Input {...getInputProps({ inputRef, isOpen, disabled })} />
          {selectedItem ? (
            <ControllerButton
              disabled={disabled}
              onClick={clearSelection}
              aria-label="clear selection"
            >
              <Icon name={'X'} />
            </ControllerButton>
          ) : (
            <ControllerButton {...getToggleButtonProps()}>
              {isOpen ? <Icon name="ChevronUp" /> : <Icon name="ChevronDown" />}
            </ControllerButton>
          )}
          <Menu {...getMenuProps()}>
            {isOpen && teamsLoading ? (
              <Item>...Loading</Item>
            ) : (
              isOpen &&
              inputItems.map((item, index) => (
                <Item
                  {...getItemProps({
                    item,
                    index,
                    disabled,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'var(--gray50)' : 'white',
                    },
                  })}
                  key={`${item}${index}`}
                >
                  {itemToString(item)}
                </Item>
              ))
            )}
          </Menu>
        </ComboBoxWrapper>
      </div>
    )}
  </Downshift>
);

const ComboBoxWrapper = styled.div`
  position: relative;
  width: 95%;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const Input = styled.input<{ isOpen?: boolean }>`
  width: 95%;
  display: inline-block;
  font-size: 1.8rem;
  word-wrap: break-word;
  min-height: 1.8rem;
  padding: 1rem;
  background-color: ${(props) =>
    props.disabled ? 'var(--transparentGray15)' : 'none'};
  color: ${(props) =>
    props.disabled ? 'var(--gray500)' : 'rgba(0, 0, 0, 0.87)'};
  border: 2px solid var(--black);
  border-radius: ${(props) => (props.isOpen ? '3px 3px 0px 0px' : '3px')};
`;

const ControllerButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: -12px;
  top: 10px;
  cursor: ${(props) => (props.disabled ? 'inherit' : 'pointer')};
`;

const Menu = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 30rem;
  background-color: white;
  overflow-x: hidden;
  overflow-y: auto;
  border-radius: 0px 0px 3px 3px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  border-color: var(--gray50);
  border-right-width: 1px;
  border-left-width: 1px;
  border-style: solid;
`;

const Item = styled.li`
  position: relative;
  cursor: pointer;
  padding: 6px 12px;
`;
