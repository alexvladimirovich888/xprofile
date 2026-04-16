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

import { XProfile, Category } from '@/src/types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category | 'ALL';
  onCategoryChange: (category: Category | 'ALL') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const CATEGORIES: (Category | 'ALL')[] = ['ALL', 'TECH', 'NEWS', 'POLITICS', 'INFLUENCER', 'GOV', 'STREAMER', 'CRYPTO', 'GAMING'];

export function FilterBar({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
        <span className="text-[10px] uppercase font-bold text-muted-foreground mr-2 shrink-0">Sort:</span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onSortChange('recent')}
          className={cn(
            "h-8 text-[11px] font-semibold bg-secondary/50 border-border hover:bg-secondary transition-all",
            sortBy === 'recent' && "border-accent-blue/50 text-accent-blue"
          )}
        >
          Recent
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onSortChange('followers')}
          className={cn(
            "h-8 text-[11px] font-semibold bg-secondary/50 border-border hover:bg-secondary",
            sortBy === 'followers' && "border-accent-blue/50 text-accent-blue"
          )}
        >
          Followers ↓
        </Button>
        
        <div className="h-4 w-px bg-border mx-2 shrink-0" />

        <DropdownMenu>
          <DropdownMenuTrigger className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "h-8 text-[11px] font-semibold bg-secondary/50 border-border min-w-[140px] justify-between",
            selectedCategory !== 'ALL' && "border-accent-blue/50 text-accent-blue"
          )}>
            {selectedCategory === 'ALL' ? 'All Categories' : selectedCategory} 
            <ChevronDown className="h-3 w-3 opacity-50" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-card border-border max-h-[300px] overflow-y-auto">
            {CATEGORIES.map((cat) => (
              <DropdownMenuItem key={cat} onClick={() => onCategoryChange(cat)} className="text-xs">
                {cat === 'ALL' ? 'All Categories' : cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative w-full md:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <Input 
          placeholder="Search handle or name..." 
          className="pl-9 h-9 text-xs bg-background border-border focus-visible:ring-accent-blue/30 focus-visible:border-accent-blue/50 transition-all rounded-md"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
