import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Login() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="heading-2 mb-4">Login</h1>
      <form className="space-y-3">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Login</Button>
      </form>
    </div>
  )
}
