export default function Button({ variant = 'primary', className = '', ...props }) {
  const base = 'btn'
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
