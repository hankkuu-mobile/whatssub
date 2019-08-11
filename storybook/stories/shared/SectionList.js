import { addDecorator, storiesOf } from '@storybook/react-native';

import FakeNavigator from '../../utils/FakeNavigator';
import React from 'react';
import SectionList from '../../../src/components/shared/SectionList';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Label = styled.Text`
  line-height: 50px;
  padding: 0 16px;
  font-size: 16;
  background-color: white;
  color: rgb(50, 59, 67);
  letter-spacing: -0.5;
`;

const ContainerDeco = (storyFn) => (
  <Container>
    <FakeNavigator>서비스 등록</FakeNavigator>
    {storyFn()}
  </Container>
);

storiesOf('shared-SectionList', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <SectionList
      renderItem={({ item, index, section }) => {
        const { id, name, category } = item;
        return <Label key={id}>{`${name} ----- ${category}`}</Label>;
      }}
      sections={[
        {
          title: '생활 지출',
          data: [
            { id: '1', name: '휴대폰ㆍ인터넷ㆍTV', category: '통신비' },
            { id: '2', name: '대출ㆍ보험ㆍ적금ㆍ예금ㆍ겟돈', category: '금융' },
            { id: '3', name: '학원ㆍ기부ㆍ헌금', category: '주거/관리' },
            { id: '4', name: '넷플릭스', category: '기타' },
          ],
        },
        {
          title: '추천 서비스',
          data: [
            { id: '5', name: '에버노트', category: '통신비' },
            { id: '6', name: '폴라리스 오피스', category: '통신비' },
            { id: '7', name: '위플 해빗', category: '생산성' },
            { id: '8', name: '직접 등록', category: '기타' },
          ],
        },
      ]}
      keyExtractor={(item, index) => item + index}
    />
  ));
