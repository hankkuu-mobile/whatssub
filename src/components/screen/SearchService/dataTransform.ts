import { Service, SeviceGroupTable } from './mock';

import { getString } from '../../../../STRINGS';

export interface ServiceGroup {
  title: string;
  data: { id: string; name: string; category: string; thumbnail: string }[];
  order: number;
}

export const dataTransform = (
  serviceList: Service[],
  serviceGroupTable: SeviceGroupTable,
) => {
  const serviceGroup = serviceList.reduce((acc: ServiceGroup[], service) => {
    const group = serviceGroupTable[service.initialGroup];
    const isServiceGroupExist = acc.find((obj) => obj.title === group.key);

    if (isServiceGroupExist) {
      isServiceGroupExist.data.push(service);
    } else {
      acc.push({
        title: group.key,
        data: [service],
        order: group.order,
      });
    }
    return acc;
  }, []);

  return serviceGroup.sort((a, b) => a.order - b.order);
};
