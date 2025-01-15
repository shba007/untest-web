export default function (time: { seconds: number; minutes: number; hours: number; days: number; months: number; years: number }) {
  let timeString = ''

  if (time.years) {
    timeString += time.years + 'Y '

    if (time.months) timeString += time.months + 'M '
  } else if (time.months) {
    timeString += time.months + 'M '

    if (time.days) timeString += time.days + 'D '
  } else if (time.days) {
    timeString += time.days + 'D '

    if (time.hours) timeString += time.hours + 'h '
  } else if (time.hours) {
    timeString += time.hours + 'h '

    if (time.minutes) timeString += time.minutes + 'm '
  } else if (time.minutes) {
    timeString += time.minutes + 'm '

    if (time.seconds) timeString += time.seconds + 's '
  } else {
    timeString += time.seconds + 's '
  }

  return timeString.slice(0, -1)
}
