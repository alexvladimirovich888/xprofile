import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { XProfile } from '@/src/types';
import { X, Check } from 'lucide-react';

interface AccountsTableProps {
  profiles: XProfile[];
}

export function AccountsTable({ profiles }: AccountsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden relative">
      <Table>
        <TableHeader className="bg-card">
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-[300px] text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Handle</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Display Name</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground text-right h-12">Followers</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Category</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Added Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow key={profile.id} className="border-border hover:bg-white/[0.02] transition-colors">
              <TableCell className="py-3.5">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-7 w-7 border border-border">
                    <AvatarImage src={profile.avatarUrl} />
                    <AvatarFallback className="text-[10px] bg-card">{profile.handle.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex items-center space-x-2">
                    <span className="text-accent-blue font-medium text-sm hover:underline cursor-pointer">@{profile.handle}</span>
                    {profile.badge === 'GOLD' && (
                      <Badge variant="outline" className="h-4 px-1 text-[8px] bg-yellow-500/5 text-yellow-500/80 border-yellow-500/20 font-bold tracking-tighter">GOLD</Badge>
                    )}
                    {profile.badge === 'BLUE' && (
                      <Badge variant="outline" className="h-4 px-1 text-[8px] bg-blue-500/5 text-blue-500/80 border-blue-500/20 font-bold tracking-tighter">BLUE</Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-foreground font-medium text-sm">{profile.displayName}</TableCell>
              <TableCell className="text-right font-sans text-sm text-foreground">
                {profile.followers.toLocaleString()}
              </TableCell>
              <TableCell>
                <div className="flex">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-secondary text-muted-foreground border border-border">
                    {profile.category}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">{profile.addedDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
