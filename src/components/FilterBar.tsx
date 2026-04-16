import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function FilterBar() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
        <span className="text-[10px] uppercase font-bold text-muted-foreground mr-2 shrink-0">Sort:</span>
        <Button variant="outline" size="sm" className="h-8 text-[11px] font-semibold bg-secondary/50 border-border hover:bg-secondary transition-all">
          Recent
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-[11px] font-semibold bg-secondary/50 border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10">
          Followers ↓
        </Button>
        <Button variant="outline" size="sm" className="h-8 text-[11px] font-semibold bg-secondary/50 border-border hover:bg-secondary transition-all">
          Unused First
        </Button>
        
        <div className="h-4 w-px bg-border mx-2 shrink-0" />

        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "h-8 text-[11px] font-semibold bg-secondary/50 border-border min-w-[120px] justify-between"
          )}>
            Categories <ChevronDown className="h-3 w-3 opacity-50" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-card border-border">
            <DropdownMenuItem>All Categories</DropdownMenuItem>
            <DropdownMenuItem>Tech</DropdownMenuItem>
            <DropdownMenuItem>News</DropdownMenuItem>
            <DropdownMenuItem>Politics</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input 
          placeholder="Search handle or name..." 
          className="pl-9 h-9 text-xs bg-background border-border focus-visible:ring-accent-blue/30 focus-visible:border-accent-blue/50 transition-all rounded-md"
        />
      </div>
    </div>
  );
}
