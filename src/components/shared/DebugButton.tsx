import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';

import { Text } from 'react-native';

const LabelWrapper = styled.TouchableOpacity`
  height: 50;
  width: 70;
  border-radius: 200;
  position: absolute;
  bottom: 100;
  right: 20;
  justify-content: center;
  align-items: center;
  background-color: #686cc3;
`;

const DebugButton = () => {
  const { debug, setDebug } = useContext(ThemeContext);
  return (
    <LabelWrapper onPress={() => setDebug(!debug)}>
      <Text>{`Debug ${debug}`}</Text>
    </LabelWrapper>
  );
};

export default DebugButton;
