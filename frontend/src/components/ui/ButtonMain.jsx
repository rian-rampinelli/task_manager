import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"


export function ButtonMain({ className, ...props }) {
  return (
      <Button
        type="button"
        className={cn(
        `px-7 py-5
        rounded-xl
        bg-indigo-500
        text-zinc-200
        text-md
        font-semibold
        tracking-wide
        shadow-md shadow-indigo-600/20
        transition-all duration-300
        hover:bg-indigo-700
        hover:shadow-lg hover:shadow-indigo-600/25
        hover:-translate-y-0.5
        active:translate-y-0 active:scale-95`,
        className
        )}
        {...props}
      >
      </Button>
  )
}
