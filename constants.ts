import {images} from './images';

export const webClientId =
  '171599076764-k9le0ckm8c642fbi26ps1354pjebvgpa.apps.googleusercontent.com';

export const categories = [
  {name: 'Food', image: images.food},
  {name: 'Entertainment', image: images.entertainment},
  {name: 'Education', image: images.education},
  {name: 'Shopping', image: images.shopping},
  {name: 'Travel', image: images.travel},
  {name: 'Others', image: images.others},
];

export const dateOptions = [
  {name: 'Today'},
  {name: 'Yesterday'},
  {name: 'Custom'},
];

export const dateFilters = {
  today: 'Today',
  yesterday: 'Yesterday',
  thisWeek: 'This Week',
  lastWeek: 'Last Week',
  thisMonth: 'This Month',
  custom: 'Custom',
};

const dateFilterNames: string[] = [];

for (const filter in dateFilters) {
  // @ts-ignore
  dateFilterNames.push({name: dateFilters[filter]});
}

export const constants = {
  DATE_FORMAT: 'MMMM D, YYYY',
};

export {dateFilterNames};
