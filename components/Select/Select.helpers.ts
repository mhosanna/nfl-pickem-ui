import React from 'react';

export function getDisplayedValue(value, children) {
  const childArray = React.Children.toArray(children);
  // @ts-ignore
  const selectedChild = childArray.find((child) => child.props.value === value);
  // @ts-ignore
  return selectedChild.props.children;
}
