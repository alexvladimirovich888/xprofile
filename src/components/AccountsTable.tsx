import React, { useState } from 'react';
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
import { X, Check, Eye, EyeOff, Shield, Edit2, Trash2, AlertTriangle } from 'lucide-react';

interface AccountsTableProps {
  profiles: XProfile[];
  onEdit: (profile: XProfile) => void;
  onDelete: (id: string) => void;
}

export function AccountsTable({ profiles, onEdit, onDelete }: AccountsTableProps) {
  const [visibleFields, setVisibleFields] = useState<Record<string, boolean>>({});

  const toggleVisibility = (id: string) => {
    setVisibleFields(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderHiddenField = (id: string, value?: string, placeholder: string = "••••••••") => {
    const isVisible = visibleFields[id];
    return (
      <div className="flex items-center space-x-2 font-mono text-[11px] bg-secondary/30 px-2 py-1 rounded max-w-[150px] truncate">
        <span className={isVisible ? "text-foreground" : "text-muted-foreground/40"}>
          {isVisible ? value : placeholder}
        </span>
      </div>
    );
  };

  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden relative">
      <Table>
        <TableHeader className="bg-card">
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="w-[240px] text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Account</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Status</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Auth Details</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground text-right h-12">Followers</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-40 text-center text-muted-foreground italic">
                No accounts found matching your filters.
              </TableCell>
            </TableRow>
          ) : (
            profiles.map((profile) => (
              <TableRow 
                key={profile.id} 
                className={`border-border hover:bg-white/[0.02] transition-colors group ${profile.status === 'BANNED' ? 'opacity-50' : ''}`}
              >
                <TableCell className="py-3.5">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className={`h-7 w-7 border ${profile.status === 'BANNED' ? 'border-destructive/50' : 'border-border'}`}>
                        <AvatarImage src={profile.avatarUrl} />
                        <AvatarFallback className="text-[10px] bg-card">{profile.handle.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {profile.status === 'BANNED' && (
                        <div className="absolute -top-1 -right-1 bg-destructive text-white rounded-full p-0.5 z-10">
                          <AlertTriangle className="h-2 w-2" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-accent-blue font-medium text-sm hover:underline cursor-pointer">@{profile.handle}</span>
                        {profile.badge === 'GOLD' && (
                          <Badge variant="outline" className="h-3 px-1 text-[7px] bg-yellow-500/5 text-yellow-500/80 border-yellow-500/20 font-bold tracking-tighter">GOLD</Badge>
                        )}
                        {profile.badge === 'BLUE' && (
                          <Badge variant="outline" className="h-3 px-1 text-[7px] bg-blue-400/5 text-blue-400/80 border-blue-400/20 font-bold tracking-tighter">BLUE</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-muted-foreground">{profile.displayName}</span>
                        <span className="text-[10px] text-muted-foreground/30">•</span>
                        <span className="text-[10px] text-muted-foreground px-1 py-0 rounded bg-secondary/50 border border-border/30">{profile.category}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex">
                    <Badge 
                      variant="outline" 
                      className={`h-5 text-[9px] font-bold ${
                        profile.status === 'ACTIVE' 
                          ? 'bg-accent-green/10 text-accent-green border-accent-green/20' 
                          : 'bg-destructive/10 text-destructive border-destructive/20'
                      }`}
                    >
                      {profile.status === 'ACTIVE' ? <Check className="h-2 w-2 mr-1" /> : <X className="h-2 w-2 mr-1" />}
                      {profile.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1.5 py-1">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter leading-none mb-0.5">Email</span>
                      <span className="text-[11px] font-mono text-foreground bg-secondary/20 px-1.5 py-0.5 rounded border border-border/30 truncate max-w-[180px]">
                        {profile.email || '—'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter leading-none mb-0.5">Password</span>
                      <span className="text-[11px] font-mono text-foreground bg-secondary/20 px-1.5 py-0.5 rounded border border-border/30 truncate max-w-[180px]">
                        {profile.password || '—'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-tighter leading-none mb-0.5">Recovery</span>
                      <span className="text-[11px] font-mono text-foreground bg-secondary/20 px-1.5 py-0.5 rounded border border-border/30 truncate max-w-[180px]">
                        {profile.recoveryEmail || '—'}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-sans text-sm text-foreground">
                  {profile.followers.toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center space-x-1">
                    <button 
                      onClick={() => onEdit(profile)}
                      className="p-2 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-all"
                      title="Edit Account"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => onDelete(profile.id)}
                      className="p-2 hover:bg-destructive/10 rounded text-muted-foreground hover:text-destructive transition-all"
                      title="Delete Account"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
