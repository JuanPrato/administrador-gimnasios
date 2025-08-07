import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCurrentUser, useLogout } from "@/lib/supabase"
import { User, Settings, LogOut, Shield } from "lucide-react"

export function UserNav() {

  const signOut = useLogout();
  const user = useCurrentUser();


  const handleLogout = () => {
    signOut();
  }

  const handleProfile = () => {
    console.log("Ir a perfil...")
  }

  const handleSettings = () => {
    console.log("Ir a configuración...")
  }

  function getInitials() {
    return `${(user?.user_metadata.first_name || " ")[0]} ${(user?.user_metadata.last_name || " ")[0]}`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={"/placeholder.svg"} alt={user?.user_metadata.first_name} />
            <AvatarFallback className="bg-primary text-primary-foreground">{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.user_metadata.first_name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            <div className="flex items-center gap-1 mt-1">
              <Shield className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">{user?.role}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSettings} className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
