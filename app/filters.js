//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

import govukPrototypeKit from 'govuk-prototype-kit';

const addFilter = govukPrototypeKit.views.addFilter;

addFilter('formatDate', (date, dateStyle) => {
  date = typeof date === 'string' ? Date.parse(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle,
  }).format(date);
});

addFilter('bearerStarting', (token) => token.slice(0, 5).split('').join(' '));
