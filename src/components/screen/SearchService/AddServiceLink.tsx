import * as React from 'react';

import styled from 'styled-components/native';

export interface AddServiceLinkProps {
  onClickAddServiceLink: () => void;
  style?: any;
}

const Container = styled.View`
  background-color: ${({ theme }) => (theme.debug ? 'salmon' : 'transparent')};
  height: 50;
  justify-content: center;
  align-items: center;
`;

const Touchable = styled.TouchableOpacity`
  background-color: ${({ theme }) => (theme.debug ? '#40E0D0' : 'transparent')};
  padding-top: 7;
  padding-bottom: 7;
  padding-left: 10;
  padding-right: 10;
`;

const StyledText = styled.Text`
  color: #407fff;
`;

function AddServiceLink({
  onClickAddServiceLink,
  ...rest
}: AddServiceLinkProps) {
  return (
    <Container {...rest}>
      <Touchable
        testID={'TOUCHABLE_ADD_SERVICE_LINK'}
        onPress={onClickAddServiceLink}
      >
        <StyledText>
          {'+ 검색 결과가 없다면 여기를 눌러 직접 입력해보세요.'}
        </StyledText>
      </Touchable>
    </Container>
  );
}

export default AddServiceLink;
