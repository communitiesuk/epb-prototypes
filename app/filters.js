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

addFilter('daysAgo', (date) => {
  const createdAt = new Date(date)
  const now = new Date()

  // update this method and check if the format one is still being used.
  const millisecondsPerDay = 1000 * 60 * 60 * 24
  const difference = now.getTime() - createdAt.getTime()
  const days = Math.floor(difference / millisecondsPerDay)

  if (days === 0) {
    return "Today"
  }

  if (days === 1) {
    return "1 day ago"
  }

  return `${days} days ago`
})
