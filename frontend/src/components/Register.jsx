import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register, login } from "@/api/user"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"

export function Register({ className, ...props }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email)
  }

  async function handleRegister(e) {
    e.preventDefault()
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Please input your name."
    if (!email.trim()) newErrors.email = "Please input your email."
    else if (!isValidEmail(email)) {
    newErrors.email = "Please input a valid email."
    }
    if (!password.trim()) newErrors.password = "Please input your password."
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await register(name, email, password)
      const loginResult = await login(email, password)
      const token = loginResult.token
      localStorage.setItem("token", token)
      navigate("/home")
    } catch (e) {
      console.error("Erro ao criar conta:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-3 ", className)} {...props}>
      <Card className="bg-(--bg-secondary)">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-(--primary-color)">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}  noValidate>
            <FieldGroup>
              <Field>
                <FieldLabel className="text-(--primary-color)" htmlFor="name">
                  Name
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="rian barbosa"
                  required
                />
                 {errors.name && <p className="text-(--danger) text-xs mt-1 ml-2 text-left">{errors.name}</p>}
              </Field>
              <Field >
                <FieldLabel className="text-(--primary-color)" htmlFor="email">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
                 {errors.email && <p className="text-(--danger) text-xs mt-1 ml-2 text-left">{errors.email}</p>}
              </Field>
              <Field>
                <FieldLabel className="text-(--primary-color)" htmlFor="password">
                  Password
                </FieldLabel>
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
                 {errors.password && <p className="text-(--danger) text-xs mt-1 ml-2 text-left">{errors.password}</p>}
              </Field>

              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Criando..." : "Create"}
                </Button>
                <FieldDescription className="text-center text-(--text-three)">
                  have an account? <Link to={"/"}>Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
