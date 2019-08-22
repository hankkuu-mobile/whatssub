import {
  SectionList as ReactNativeSectionList,
  SectionListData,
} from 'react-native';

import React from 'react';
import { getString } from '../../../STRINGS';
import styled from 'styled-components/native';

const StyledSelectionList = styled(ReactNativeSectionList)`
  background-color: rgb(249, 250, 251);
`;

const SectionSeparator = styled.View`
  display: flex;
  width: 100%;
  height: 1px;
  background-color: rgb(230, 234, 238);
`;

const SectionItemSeparator = styled.View`
  display: flex;
  width: 91.47%;
  height: 1px;
  background-color: rgb(243, 245, 247);
  align-self: center;
`;

const SectionEmptyHeader = styled.View`
  display: flex;
  justify-content: center;
  height: 12px;
  background-color: rgb(249, 250, 251);

  padding: 0 16px;
`;

const SectionHeader = styled(SectionEmptyHeader)`
  height: 36px;
`;

const SectionHeaderText = styled.Text`
  font-size: 12;
  color: rgb(153, 162, 170);
  letter-spacing: -0.5;
`;

interface Props {
  sections: readonly SectionListData<any>[];
  localizeTitle?: boolean;
  [prop: string]: any;
}

function SectionList({ sections, localizeTitle, ...props }: Props) {
  return (
    <StyledSelectionList
      renderSectionHeader={({ section: { title } }) => (
        <>
          <SectionSeparator />
          {title ? (
            <SectionHeader testID='sectionHeader'>
              <SectionHeaderText>
                {localizeTitle ? getString(title) : title}
              </SectionHeaderText>
            </SectionHeader>
          ) : (
            <SectionEmptyHeader testID='sectionEmptyHeader' />
          )}
        </>
      )}
      sections={sections}
      ItemSeparatorComponent={SectionItemSeparator}
      ListFooterComponent={SectionSeparator}
      keyExtractor={(item, index) => item + index}
      {...props}
    />
  );
}

export default SectionList;
