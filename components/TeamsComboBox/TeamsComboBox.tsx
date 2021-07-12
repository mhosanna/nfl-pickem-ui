import React from "react";
import Downshift from "downshift";
import styled from "styled-components";
import Icon from "../Icon";

const TeamsComboBox = ({
  onChange,
  ref,
  allItems,
  inputItems,
  setInputItems,
  itemToString,
  label,
  teamsLoading,
}) => (
  <Downshift
    onChange={onChange}
    itemToString={(item) => (item ? item.city + " " + item.name : "")}
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
        <InputWrapper>
          <Input {...getInputProps({ ref, isOpen })} />
          {selectedItem ? (
            <ControllerButton
              onClick={clearSelection}
              aria-label="clear selection"
            >
              <Icon name={"X"} />
            </ControllerButton>
          ) : (
            <ControllerButton {...getToggleButtonProps()}>
              <Icon name={`${isOpen ? "ChevronUp" : "ChevronDown"}`} />
            </ControllerButton>
          )}
        </InputWrapper>
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
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? "var(--gray50)" : "white",
                  },
                })}
                key={`${item}${index}`}
              >
                {itemToString(item)}
              </Item>
            ))
          )}
        </Menu>
      </div>
    )}
  </Downshift>
);

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 80%;
`;

const Input = styled.input`
  width: 100%;
  display: inline-block;
  font-size: 1.8rem;
  word-wrap: break-word;
  min-height: 1.8rem;
  padding: 1rem;
  color: rgba(0, 0, 0, 0.87);
  border: 2px solid var(--black);
  border-radius: ${(props) => (props.isOpen ? "3px 3px 0px 0px" : "3px")};
`;

const ControllerButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: -12px;
  top: 10px;
  cursor: pointer;
`;

const Menu = styled.ul`
  position: absolute;
  width: 76.5%;
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

export default TeamsComboBox;
