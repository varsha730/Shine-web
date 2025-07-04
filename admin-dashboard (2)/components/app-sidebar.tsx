"use client"

import {
  BarChart3,
  Calendar,
  Home,
  Inbox,
  Settings,
  Users,
  TrendingUp,
  FileText,
  CheckSquare,
  Award,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"

// Update the menu items to be education-focused
const menuItems = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
    isActive: true,
  },
  {
    title: "Analytics",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Student Details",
    url: "#",
    icon: Users,
  },
  {
    title: "Attendance",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Task Upload",
    url: "#",
    icon: FileText,
  },
  {
    title: "Task Submitted",
    url: "#",
    icon: CheckSquare,
  },
  {
    title: "Quiz Results",
    url: "#",
    icon: Award,
  },
]

const secondaryItems = [
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Messages",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <TrendingUp className="h-4 w-4" />
          </div>
          {/* Update the header to show "EduAdmin" instead of "AdminPro" */}
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Admin</span>
            <span className="truncate text-xs text-muted-foreground">Education Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
