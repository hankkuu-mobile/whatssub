import * as React from 'react';

import { getString } from '../../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: ${({ theme }) => (theme.debug ? '#ddd' : 'transparent')};
  margin-left: 20;
  margin-right: 20;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const HorizontalScrollView = styled.ScrollView`
  padding-top: 12;
  padding-bottom: 12;
`;

const Category = styled.TouchableOpacity<{ selected?: boolean }>`
  background-color: ${({ theme, selected }) =>
    theme.debug ? 'red' : selected ? '#3e7eff' : 'transparent'};
  border-width: 1;
  border-color: #e1e4e7;
  border-radius: 17;
  padding-top: 9;
  padding-bottom: 9;
  padding-left: 15;
  padding-right: 15;
  margin-right: 5;
  justify-content: center;
  align-items: center;
`;

const Label = styled.Text<{ selected?: boolean }>`
  color: ${({ selected }) => (selected ? 'white' : '#a4a5a6')};
  font-size: 12;
  letter-spacing: -0.5;
`;

export interface SearchInputProps {
  categoryList: string[];
  initialCategory?: string;
  onSelect?: (category: string) => void;
  style?: any;
}

// TODO: error handle when there is no props.categoryList exists
function ServiceCategory(props: SearchInputProps) {
  const [selected, select] = React.useState(
    props.initialCategory ? props.initialCategory : '',
  );

  // TODO: Add assertion that category is unique. as it is being used as key
  return (
    <Container style={props.style}>
      <HorizontalScrollView horizontal={true}>
        {props.categoryList.map((category) => (
          <Category
            testID={`CATEGORY_SELECT_${category}`}
            key={category}
            selected={category === selected}
            onPress={() => {
              select(category);
              props.onSelect && props.onSelect(category);
            }}
          >
            <Label selected={category === selected}>
              {getString(category)}
            </Label>
          </Category>
        ))}
      </HorizontalScrollView>
    </Container>
  );
}

export default ServiceCategory;
