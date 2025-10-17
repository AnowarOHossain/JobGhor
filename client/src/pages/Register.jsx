import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Register() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="heading-2 mb-4">Register</h1>
      <form className="space-y-3">
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Create account</Button>
      </form>
    </div>
  )
}
