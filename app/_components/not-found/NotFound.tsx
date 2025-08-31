import { AnimatedRobot } from "./AnimatedRobot"
import { ErrorDisplay } from "./ErrorDisplay"
import { NavigationButtons } from "./NavigationButtons"
import { FloatingDots } from "./FloatingDots"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 flex items-center justify-center px-4 relative">
      <div className="text-center max-w-lg mx-auto h-[calc(100vh-73px)]">
        <AnimatedRobot />
        <ErrorDisplay />
        <NavigationButtons />
      </div>
      <FloatingDots />
    </div>
  )
}
