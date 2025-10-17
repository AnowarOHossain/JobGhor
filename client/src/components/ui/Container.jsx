export default function Container({ className = '', ...props }) {
  return <div className={`container ${className}`} {...props} />
}
