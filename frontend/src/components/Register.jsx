import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@/api/login"
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

export function Register({className,...props}) {
  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault()

    try {
      const data = await login(email,password)
      const token = data.token;
      localStorage.setItem("token", token)
      console.log("Token:", token);
      
      navigate("/home")

    } catch (e) {
      setError(e)
      console.error("Erro ao fazer login:", error)
    }
  }
  
  return (
    <div className= {cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className = "bg-(--bg-secondary)" >
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-(--primary-color)">Create Account</CardTitle>
              <Field>
                <FieldLabel
                className="text-(--primary-color)" 
                htmlFor="email">
                  Email
                </FieldLabel>
                <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                placeholder="m@example.com" 
                required />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                   className="text-(--primary-color)"
                   htmlFor="password">Password
                  </FieldLabel>
                </div>
                <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="********"
                required
                 />
              </Field>
              {error && (
                <p className="mt-3 text-(--danger)">
                  Email ou senha invalidos!
                </p>
              )}

        </CardHeader >
        <CardContent>
          <form  onSubmit={(e) => handleLogin(e)}>
            <FieldGroup>
              <Field>
                <Button type="submit">Create</Button>
                <FieldDescription className="text-center text-(--text-three)">
                   have an account?
                   <Link to={"/"}>Login</Link>
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
  );
}
