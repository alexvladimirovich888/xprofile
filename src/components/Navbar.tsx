import React from 'react';
import { Button } from '@/components/ui/button';
import { Users, LayoutGrid, Plus, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from './AuthContext';

interface NavbarProps {
  activeTab: 'accounts' | 'projects';
  onTabChange: (tab: 'accounts' | 'projects') => void;
}

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  const { logout } = useAuth();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-8 flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-accent-green flex items-center justify-center">
            <span className="font-bold text-black text-lg leading-none">X</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Manager
          </span>
        </div>

        <div className="flex items-center space-x-8 text-sm font-medium h-full translate-y-[1px]">
          <button
            onClick={() => onTabChange('accounts')}
            className={cn(
              "flex items-center space-x-2 transition-all hover:text-foreground relative h-full border-b-2",
              activeTab === 'accounts' ? "text-foreground border-foreground" : "text-muted-foreground border-transparent"
            )}
          >
            <span>Accounts</span>
          </button>
          <button
            onClick={() => onTabChange('projects')}
            className={cn(
              "flex items-center space-x-2 transition-all hover:text-foreground relative h-full border-b-2",
              activeTab === 'projects' ? "text-foreground border-foreground" : "text-muted-foreground border-transparent"
            )}
          >
            <span>Projects</span>
          </button>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="default" className="bg-accent-green text-black hover:bg-accent-green/90 font-semibold px-4 py-2 h-9 rounded-md border-none">
            <Plus className="mr-2 h-4 w-4" />
            Add Profile
          </Button>
          
          <div className="h-4 w-px bg-border mx-2" />
          
          <button 
            onClick={logout}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
