import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { type LucideIcon, ChevronRight, Folder, List, LogOut, User } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useNavigate } from "react-router-dom"
import { logout } from "@/api/logout"

/**
 * Use these to create items and routes for the sidebar
 */
const menu_items = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [ 
        {
            title: "Projects",
            url: "#",
            icon: Folder,
            isActive: false,
            items: [
                {
                    title: "Project Table",
                    url: "/dashboard/projects",
                },
                {
                    title: "Create Project",
                    url: "/dashboard/projects/create",
                },
            ],
        },
        {
            title: "Tasks",
            url: "#",
            icon: List,
            isActive: false,
            items: [
                {
                    title: "Task Table",
                    url: "#",
                },
                {
                    title: "Create Task",
                    url: "#",
                },
            ],
        },
        {
            title: "Users",
            url: "#",
            icon: User,
            isActive: false,
            items: [
                {
                    title: "User Table",
                    url: "#",
                },
            ],
        },
    ],
}

export function AppSidebar() {
  return (
   <Sidebar>
        <SidebarHeader>
            TFG Fire
        </SidebarHeader>

        <SidebarContent>
            <NavMain items={menu_items.navMain} />
        </SidebarContent>

        <SidebarFooter>
            <NavLogout />            
        </SidebarFooter>
    </Sidebar>
  )
}

export function NavLogout() {
    const navigate = useNavigate()

    const handleLogout = () => {
        logout(navigate)
    }
    return (
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <a onClick={handleLogout} className="cursor-pointer">
                            <LogOut />
                            <span>Logout</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const navigate = useNavigate()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} onClick={() => navigate(item.url)}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={subItem.url}>
                          <span>{subItem.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
