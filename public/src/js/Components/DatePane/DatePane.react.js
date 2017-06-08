import React, { Component } from 'react'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];


/**
 * Transforms a date object to the string "Day Month DD YYYY"
 *
 * @param      {Date}  date    The date object to transform
 * @return     {String} The formatted date
 */
const formatDate = date => {
   
  /**
   * Start with written day
   */
  let formatted = days[date.getDay()];

  /**
   * Add written month
   */
  formatted += ' '.concat(months[date.getMonth()]);

  /**
   * Add day
   */
  let day = date.getDate();
  formatted += ' '.concat(day)

  /**
   * Add day postfix
   */
  let postfix = '';
  if (day !== 11 && day % 10 === 1) postfix = 'st';
  else if (day !== 12 && day % 10 === 2) postfix = 'nd';
  else if (day !== 13 && day % 10 === 3) postfix = 'rd';
  else postfix = 'th';

  formatted += postfix;

  /**
   * Add full year
   */
  formatted += ' '.concat(date.getFullYear());

  return formatted

};


/**
 * Componnet used to display the current date
 *
 * @class      DatePane (name)
 * @param      {Object}  arg1   Component props
 * @return     {Object}  React component
 */
const DatePane = ({}) => (
  <div className="date--container">
    <span className="date--banner">{formatDate(new Date())}</span>
  </div>
);

export default DatePane;

