import React, { useEffect, useMemo, useState } from 'react';

import SectionList from '../../shared/SectionList';
import ServiceElement from '../../shared/ServiceElement';
import { ServiceGroup } from './dataTransform';
import { getString } from '../../../../STRINGS';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
`;

interface Props {
  serviceList: ServiceGroup[];
}
function ServiceList({ serviceList }: Props) {
  return (
    <Container>
      <SectionList
        localizeTitle={true}
        renderItem={({ item, index, section }) => {
          return (
            <ServiceElement
              key={item.id}
              imageSource={{
                uri: item.thumbnail,
              }}
              {...item}
              category={getString(item.category)}
            />
          );
        }}
        sections={serviceList}
        keyExtractor={(item, index) => item + index}
      />
    </Container>
  );
}

export default ServiceList;
