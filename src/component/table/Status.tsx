import { classNames } from './utils'
const moment = require('moment')

export function StatusPill({ value }: any) {
  const status =
    value === 'verified'
      ? 'verified'
      : value === 'pending'
      ? 'pending'
      : value === 'completed'
      ? 'verified'
      : value == 'rejected'
      ? 'rejected'
      : 'rejected'

  return (
    <span
      className={classNames(
        'px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
        status.startsWith('pending') ? 'bg-green-100 text-yellow-700' : null,
        status.startsWith('verified') ? 'bg-green-100 text-green-700' : null,
        status.startsWith('Failed') ? 'bg-red-100 text-red-700' : null,
        status.startsWith('rejected') ? 'bg-red-100 text-red-700' : null
      )}
    >
      {status}
    </span>
  )
}

export function CreatedDate({ value }: any) {
  return (
    <span className="px-3 py-1 uppercase leading-wide font-bold text-xs rounded-full shadow-sm">
      {moment(value).format('MMMM DD, YYYY')}
    </span>
  )
}
