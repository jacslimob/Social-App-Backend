module.exports = (
  function format_date(date) {
    const options = { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true};
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
  }
)