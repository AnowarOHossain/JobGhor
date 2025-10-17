export function Card({ className = '', ...props }) {
  return <div className={`card ${className}`} {...props} />
}
export function CardBody({ className = '', ...props }) {
  return <div className={`card-body ${className}`} {...props} />
}
export function CardHeader({ className = '', ...props }) {
  return <div className={`card-body border-b border-gray-200 dark:border-gray-800 ${className}`} {...props} />
}
export function CardTitle({ className = '', ...props }) {
  return <h3 className={`text-lg font-semibold ${className}`} {...props} />
}
