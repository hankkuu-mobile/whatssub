import 'react-native';

import * as React from 'react';

import { Props, SearchServiceWithMock } from '../SearchService';
import {
  fireEvent,
  getAllByTestId,
  render,
  wait,
  waitForElement,
} from '@testing-library/react-native';
import renderer, { act, create } from 'react-test-renderer';

import { EXCEPTIONAL_CATEGORY_CASE } from '../SearchService/mock';
import { InitialProviders } from '../../../providers';
import { MOCK } from '../SearchService/containers';
import { getString } from '../../../../STRINGS';
import i18n from 'i18n-js';

i18n.locale = 'ko';

const jestFn = {
  onClickAddService: jest.fn(),
};

const createTestProps = (props: Partial<Props>): Props => ({
  ...MOCK,
  ...jestFn, // override any function from MOCK with jest.fn()
  initialInputValue: '', // custom initial props
  ...props, // override anything as user props
});

const testComponent = (props: Props) => (
  <InitialProviders doNotWaitFont>
    <SearchServiceWithMock {...props} />
  </InitialProviders>
);

describe('[SearchService] render', () => {
  it('component and snapshot matches', () => {
    const rendered: renderer.ReactTestRendererJSON = renderer
      .create(testComponent(createTestProps({})))
      .toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[SearchService] interaction', () => {
  it('should contain service element when searching by its name', () => {
    const toFilter = MOCK.serviceList[0];
    const rendered = render(
      testComponent(createTestProps({ initialInputValue: toFilter.name })),
    );
    const names = rendered.getAllByTestId('SERVICE_ELEMENT_NAME');
    names.map((name) => expect(name.props.children).toContain(toFilter.name));
  });

  it('should contain relevant service element when category is clicked', async () => {
    const { getByTestId, getAllByTestId } = render(
      testComponent(createTestProps({})),
    );

    // *the index can be changed manually by user's needs
    const indexToTest = 0;

    // remove exceptional case from category list
    const categoriesWithoutExceptionalCase = MOCK.categoryList.filter(
      (cat) => cat !== EXCEPTIONAL_CATEGORY_CASE,
    );

    const category = categoriesWithoutExceptionalCase[indexToTest];
    // get category dom
    const categoryDom = getByTestId(`CATEGORY_SELECT_${category}`);
    // click category dom
    fireEvent.press(categoryDom);
    // wait until service element list has relevant element
    const categoryListOfFilteredServiceElement = await waitForElement(() => {
      const categoryListOfServiceElement = getAllByTestId(
        'SERVICE_ELEMENT_CATEGORY',
      );
      return categoryListOfServiceElement.filter((se) => {
        if (se.props.children !== getString(category)) {
          throw Error(`unexpected service elements are included`);
        } else {
          return true;
        }
      });
    });

    // check if the categories of filtered service element are desired category
    categoryListOfFilteredServiceElement.map((se) => {
      expect(se.props.children).toBe(getString(category));
    });

    // Todo: for better test in the future, you might need to check
    // whether all `category` are actually exists in SERVICE_LIST or not
  });
});
