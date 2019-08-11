import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/native';

const Conainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
`;

const NavigatorText = styled.Text`
  font-size: 16;
  letter-spacing: -0.47;
`;

const FakeNavigator = (props) => (
  <Conainer>
    <NavigatorText>{props.children}</NavigatorText>
  </Conainer>
);
FakeNavigator.propTypes = {
  children: PropTypes.node,
};

export default FakeNavigator;
