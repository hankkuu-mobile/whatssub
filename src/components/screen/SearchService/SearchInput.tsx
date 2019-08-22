import * as React from 'react';

import { IC_MAGNIFIER } from '../../../utils/Icons';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({ theme }) => (theme.debug ? '#ddd' : '#f3f5f7')};
  height: 42;
  margin-left: 20;
  margin-right: 20;
  border-radius: 8;

  flex-direction: row;
`;

const MagContainer = styled.View`
  background-color: ${({ theme }) => (theme.debug ? 'red' : 'transparent')};
  height: 24;
  width: 24;
  margin-left: 8;
  margin-right: 2;
  margin-top: 9;
  margin-bottom: 9;
  justify-content: center;
  align-items: center;
`;

const Magnifier = styled.Image`
  background-color: ${({ theme }) => (theme.debug ? 'green' : 'transparent')};
  width: 16;
  height: 16;
  margin-bottom: 2;
`;

const Input = styled.TextInput`
  background-color: ${({ theme }) => (theme.debug ? '#aaa' : 'transparent')};
  flex-grow: 1;
  align-self: center;
  font-size: 16;
`;

const ResetContainer = styled.View`
  background-color: ${({ theme }) => (theme.debug ? 'blue' : 'transparent')};
  height: 24;
  width: 24;
  margin-left: 2;
  margin-right: 11;
  margin-top: 9;
  margin-bottom: 9;
  justify-content: center;
  align-items: center;
`;

const Reset = styled.TouchableOpacity`
  background-color: ${({ theme }) => (theme.debug ? 'yellow' : '#c6ccd1')};
  border-radius: 20;
  width: 20;
  height: 20;
  justify-content: center;
  align-items: center;
`;

const ResetText = styled.Text`
  color: white;
`;

interface SearchInputProps {
  value: string;
  onDebounceOrOnReset: (value: string) => void;
  style?: any;
}

// reference : https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

function SearchInput(props: SearchInputProps) {
  const [value, setValue] = React.useState(props.value);
  const debouncedValue = useDebounce(value, 400);

  React.useEffect(() => {
    props.onDebounceOrOnReset(debouncedValue);
  }, [debouncedValue]);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Container style={props.style}>
      <MagContainer>
        <Magnifier source={IC_MAGNIFIER} />
      </MagContainer>
      {/* TODO: add placeholder string to Sting */}
      <Input
        testID={'SEARCH_INPUT'}
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
        placeholder={'검색어를 입력해주세요.'}
        placeholderTextColor={'#cdd2d7'}
      />
      {props.value !== '' && (
        <ResetContainer>
          <Reset
            testID='RESET_BUTTON'
            onPress={() => {
              props.onDebounceOrOnReset('');
            }}
          >
            <ResetText>X</ResetText>
          </Reset>
        </ResetContainer>
      )}
    </Container>
  );
}

export default SearchInput;
