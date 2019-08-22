import { CATEGORY_LIST, INITIAL_GROUP_ORDER_TABLE, SERVICE_LIST } from './mock';

import { withContainer } from '../../../utils/hocs';

// used at Test
export const MOCK = {
  serviceList: SERVICE_LIST,
  initialServiceGroupTable: INITIAL_GROUP_ORDER_TABLE,
  categoryList: CATEGORY_LIST,
};

// used at storybook for now
// we might be able to use this(withContainer()) as a pattern for injecting real data later
const withSearchServiceMock = withContainer({
  ...MOCK,
});

export { withSearchServiceMock };
