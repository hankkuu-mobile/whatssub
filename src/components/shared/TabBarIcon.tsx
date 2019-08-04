import * as Icon from '@expo/vector-icons';
import React from 'react';
import styled from 'styled-components';

// Static Variable
const DEFAULT_ICON_SIZE = 32;
const COLOR_TABICON_DEFAULT = '#c6cbcf';
const COLOR_TABICON_SELECTED = '#75a3ff';

// Style Components
const MaterialIcons = styled(Icon.MaterialIcons)`
`;
const AntDesignIcons = styled(Icon.AntDesign)`
`;
const IoniconsIcons = styled(Icon.Ionicons)`
`;

interface Props {
  name: string;
  focused: boolean;
  type?: string;
  size?: number;
  testID?: string;
}

function Shared(props: Props) {
  const iconSize = props.size || DEFAULT_ICON_SIZE;

  if (props.type && props.type === 'MaterialIcons') {
    return (
      <MaterialIcons
        testID={props.testID}
        name={props.name}
        size={iconSize}
        color={props.focused ? COLOR_TABICON_SELECTED : COLOR_TABICON_DEFAULT}
      />
    );
  }

  if (props.type && props.type === 'AntDesign') {
    return (
      <AntDesignIcons
        testID={props.testID}
        name={props.name}
        size={iconSize}
        color={props.focused ? COLOR_TABICON_SELECTED : COLOR_TABICON_DEFAULT}
      />
    );
  }

  return (
    <IoniconsIcons
      testID={props.testID}
      name={props.name}
      size={iconSize}
      color={props.focused ? COLOR_TABICON_SELECTED : COLOR_TABICON_DEFAULT}
    />
  );
}

export default Shared;
