import React, { Component } from 'react'


/**
 * Componnet used to display the current date
 *
 * @class      DatePane (name)
 */
export default class DatePane extends Component {
  constructor(context, props) {
    super(context, props)

    /**
     * Day list ordered for Date object getDay()
     */
    this.days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    /**
     * Month list ordered for Date object getMonth()
     */
    this.months = [
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
      'December',
    ]

  }

  /**
   * Transforms a date object to the string "Day Month DD YYYY"
   *
   * @param      {Date}  date    The date object to transform
   * @return     {String} The formatted date
   */
  formatDate(date) {
   
    /**
     * Start with written day
     */
    let formatted = this.days[date.getDay()];

    /**
     * Add written month
     */
    formatted += ' '.concat(this.months[date.getMonth()]);

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

  }

  render() {
    return(
      <div className="date--container">
        <span className="date--banner">{this.formatDate(new Date())}</span>
      </div>
    )
  }
}