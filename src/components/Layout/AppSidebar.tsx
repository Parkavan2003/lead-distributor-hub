
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Building2,
  BarChart3,
  Users,
  Upload,
  Settings,
  LogOut,
  ChevronRight,
  User
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: BarChart3, 
    key: 'dashboard',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100'
  },
  { 
    name: 'Agents', 
    href: '/agents', 
    icon: Users, 
    key: 'agents',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  },
  { 
    name: 'Upload Leads', 
    href: '/upload', 
    icon: Upload, 
    key: 'upload',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100'
  },
  { 
    name: 'Settings', 
    href: '/settings', 
    icon: Settings, 
    key: 'settings',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    hoverColor: 'hover:bg-orange-100'
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar className="border-r border-border bg-gradient-to-b from-white to-gray-50/50">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lead Hub
              </h1>
              <p className="text-xs text-muted-foreground">Distribution Platform</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild className="p-0">
                      <NavLink
                        to={item.href}
                        className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
                          active
                            ? `${item.bgColor} ${item.color} shadow-lg border border-opacity-20 border-current`
                            : `text-gray-700 hover:text-gray-900 ${item.hoverColor} hover:shadow-md`
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} transition-colors`} />
                        {!isCollapsed && (
                          <>
                            <span className="font-medium text-sm">{item.name}</span>
                            {active && (
                              <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border bg-gray-50/50">
        {!isCollapsed && (
          <div className="flex items-center mb-4 p-3 bg-white rounded-lg shadow-sm border">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        )}
        
        <Button
          onClick={logout}
          variant="outline"
          className={`w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 ${
            isCollapsed ? 'px-2' : 'px-4'
          }`}
        >
          <LogOut className={`w-4 h-4 ${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
          {!isCollapsed && 'Sign out'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
