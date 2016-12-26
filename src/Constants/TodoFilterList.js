export const TodoFilterKeys = {

  'ALL': 'ALL',
  'COMPLETED': 'COMPLETED',
  'INCOMPLETE': 'INCOMPLETE'

};

export const TodoFilters = {

  'ALL': i => true,
  'COMPLETED': i => i.completed,
  'INCOMPLETE': i => !i.completed
};
