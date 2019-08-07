import { IC_FACEBOOK, IC_GOOGLE, IC_LOGO, IC_SLASH } from '../../../src/utils/Icons';
import { addDecorator, storiesOf } from '@storybook/react-native';
import { boolean, number, text } from '@storybook/addon-knobs';
import { Button } from 'dooboo-native-widgets';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
`;

const ContainerDeco = (storyFn) => (
  <Container>
    {storyFn()}
  </Container>
);

storiesOf('shared-Button', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <Button
      // using console.log() here in storybook is necessary
      // for testing its behavior until using 'action' addons
      // eslint-disable-next-line no-console
      onClick={() => console.log('button clicked')}
      text='Test Button'
      style={{
        backgroundColor: '#fff',
      }}
    />
  ))
  .add('isLoading', () => (
    <Button
      isLoading={true}
    />
  ))
  .add('isDisabled', () => (
    <Button
      text='Test Button'
      isDisabled={true}
    />
  ))
  .add('img Source', () => (
    <>
      <Button
        text='Test Button'
        style={{
          backgroundColor: '#fff',
        }}
        imgLeftSrc={IC_GOOGLE}
      />
      <Button
        text='Test Button'
        style={{
          backgroundColor: '#fff',
        }}
        imgLeftSrc={IC_FACEBOOK}
      />
    </>
  ))
  .add('custom', () => (
    <Button
      style={{
        backgroundColor: '#ccc',
      }}
      text={text('text', 'editable')}
      isDisabled={boolean('isDisabled', false)}
      isLoading={boolean('isLoading', false)}
    />
  ));
