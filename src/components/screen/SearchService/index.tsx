import {
  CATEGORY_LIST,
  EXCEPTIONAL_CATEGORY_CASE,
  INITIAL_GROUP_ORDER_TABLE,
  SERVICE_LIST,
  Service,
  SeviceGroupTable,
} from './mock';
import React, { useEffect, useState } from 'react';

import AddServiceLink from './AddServiceLink';
import { NavigationScreenProp } from 'react-navigation';
import SearchInput from './SearchInput';
import ServiceCategory from './ServiceCategory';
import ServiceList from './ServiceList';
import { dataTransform } from './dataTransform';
import { getString } from '../../../../STRINGS';
import { searchKeyword } from './searchKeyword';
import styled from 'styled-components/native';
import { withSearchServiceMock } from './containers';

/**
 * Get service list from server and process it with categorizing
 * and input keyword filtering. then transform its data as
 * the form of sectionList to show on UI
 */

const Container = styled.View`
  flex: 1;
`;

export interface Props {
  navigation?: NavigationScreenProp<any, any>;
  initialInputValue?: string;
  serviceList: Service[];
  initialServiceGroupTable: SeviceGroupTable;
  categoryList: string[];
  // navigate to Add Service Screen
  onClickAddService: () => void;
}

const localizeCategoryProperty = (obj: Service): Service =>
  Object.assign<{}, Service, Pick<Service, 'category'>>({}, obj, {
    category: getString(obj.category),
  });

function SearchService(props: Props) {
  const [inputValue, setInputValue] = useState(
    props.initialInputValue ? props.initialInputValue : '',
  );
  const [category, setCategory] = useState(EXCEPTIONAL_CATEGORY_CASE);
  const [serviceListOfSectionList, setServiceListOfSectionList] = useState([]);

  useEffect(() => {
    let filteredServiceList;
    if (inputValue !== '' || category === EXCEPTIONAL_CATEGORY_CASE) {
      filteredServiceList = props.serviceList.filter((service) => {
        return searchKeyword<Service>(
          localizeCategoryProperty(service),
          inputValue,
          ['name', 'category'],
        );
      });
    } else {
      filteredServiceList = props.serviceList.filter((service) => {
        return searchKeyword<Service>(
          localizeCategoryProperty(service),
          getString(category),
          ['category'],
        );
      });
    }

    setServiceListOfSectionList(
      dataTransform(filteredServiceList, props.initialServiceGroupTable),
    );
  }, [category, inputValue]);

  return (
    <Container>
      <SearchInput value={inputValue} onDebounceOrOnReset={setInputValue} />
      <ServiceCategory
        style={inputValue !== '' && { display: 'none' }}
        categoryList={props.categoryList}
        initialCategory={category}
        onSelect={(category) => setCategory(category)}
      />
      {inputValue !== '' && (
        <AddServiceLink onClickAddServiceLink={props.onClickAddService} />
      )}
      <ServiceList serviceList={serviceListOfSectionList} />
    </Container>
  );
}

export default SearchService;

const SearchServiceWithMock = withSearchServiceMock(SearchService);

export { SearchServiceWithMock };
