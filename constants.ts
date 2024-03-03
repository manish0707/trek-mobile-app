export const webClientId =
  '171599076764-k9le0ckm8c642fbi26ps1354pjebvgpa.apps.googleusercontent.com';

export const categories = [
  'Food',
  'Entertaiment',
  'Subscription',
  'Pet',
  'Wellness',
  'Education',
  'Eat',
];

export const dateOptions = ['Today', 'Yesterday', 'Custom'];

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
  dateFilterNames.push(dateFilters[filter]);
}

export const constants = {
  DATE_FORMAT: 'MMMM D, YYYY',
};

export {dateFilterNames};
