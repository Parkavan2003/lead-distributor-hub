
import React from 'react';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

interface ModernDashboardLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'agents' | 'upload' | 'settings';
}

const getBreadcrumbTitle = (activeTab: string) => {
  switch (activeTab) {
    case 'dashboard':
      return 'Dashboard';
    case 'agents':
      return 'Agent Management';
    case 'upload':
      return 'Upload Leads';
    case 'settings':
      return 'Settings';
    default:
      return 'Dashboard';
  }
};

const ModernDashboardLayout: React.FC<ModernDashboardLayoutProps> = ({ children, activeTab }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
            <SidebarTrigger className="-ml-1 text-gray-600 hover:text-gray-900" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard" className="text-gray-600 hover:text-primary">
                    Lead Hub
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-gray-900">
                    {getBreadcrumbTitle(activeTab)}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="flex-1 p-6">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ModernDashboardLayout;
