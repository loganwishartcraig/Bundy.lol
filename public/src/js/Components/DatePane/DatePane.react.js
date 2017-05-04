import React, { Component } from 'react'

export default class DatePane extends Component {
  constructor(context, props) {
    super(context, props)

    this.days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ]

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

  formatDate(date) {
   
    let formatted = this.days[date.getDay() - 1];

    formatted += ' '.concat(this.months[date.getMonth()]);

    let day = 20;

    formatted += ' '.concat((day < 10) ? '0'.concat(day) : day);

    let postfix = '';
    if (day !== 11 && day % 10 === 1) postfix = 'st';
    else if (day !== 12 && day % 10 === 2) postfix = 'nd';
    else if (day !== 13 && day % 10 === 3) postfix = 'rd';
    else postfix = 'th';

    formatted += postfix;

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