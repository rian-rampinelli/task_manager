import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

function PasswordInput({className,disabled,...props}) {
  const [showPassword, setShowPassword] = useState(false)
  const Icon = showPassword ? EyeOff : Eye

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        className={cn("pr-10", className)}
        disabled={disabled}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="absolute
        inset-y-0 right-1
        my-auto text-muted-foreground hover:bg-transparent hover:text-foreground"
        onClick={() => setShowPassword((current) => !current)}
        disabled={disabled}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        <Icon className="size-4 text-zinc-900" aria-hidden="true" />
      </Button>
    </div>
  )
}

export { PasswordInput }
