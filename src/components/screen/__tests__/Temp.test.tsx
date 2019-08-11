import 'react-native';
import * as React from 'react';
import {
  RenderResult,
  act,
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react-native';
import Temp, {
  QUERY_USERS,
} from '../Temp';
import { ApolloProvider } from '@apollo/react-hooks';

import { AppProvider } from '../../../providers';
import { ThemeProvider } from 'styled-components/native';
import { ThemeType } from '../../../types';
import { createClient } from '../../../utils/_testUtils';
import { createTheme } from '../../../theme';
import renderer from 'react-test-renderer';

const createTestProps = (obj: object) => ({
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
  },
  screenProps: {
    theme: jest.mock,
  },
  ...obj,
});

const mocks = [
  {
    request: {
      query: QUERY_USERS,
      // variables: {
      //   email: 'email@email.com',
      // },
    },
    result: {
      data: {
        users: [
          {
            id: 'user_id_1',
            email: 'user_email_1',
          },
          {
            id: 'user_id_2',
            email: 'user_email_2',
          },
        ],
      },
    },
  },
];

let props: any;
let component: React.ReactElement;
let testingLib: RenderResult;
let client;

afterEach(cleanup);

describe('[Temp] render', () => {
  beforeAll(() => {
    props = createTestProps({});
    client = createClient(mocks);
    component = (
      <AppProvider>
        <ThemeProvider theme={createTheme()}>
          <ApolloProvider client={client}>
            <Temp {...props} />
          </ApolloProvider>
        </ThemeProvider>
      </AppProvider>
    );
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(component).toJSON();
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

// describe('[Temp] Interaction', () => {
//   let renderResult: RenderResult;

//   beforeEach(() => {
//     renderResult = render(component);
//   });

//   it('should simulate [onClick] when [btn] has been clicked', () => {
//     const btnInstance = renderResult.getByTestId('btn');
//     fireEvent.press(btnInstance);
//     expect(props.navigation.goBack).toHaveBeenCalled();
//   });
// });
