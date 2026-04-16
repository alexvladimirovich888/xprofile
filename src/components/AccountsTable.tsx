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
import { X, Check, Eye, EyeOff, Shield } from 'lucide-react';

interface AccountsTableProps {
  profiles: XProfile[];
}

export function AccountsTable({ profiles }: AccountsTableProps) {
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
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Auth Details (Encrypted)</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground text-right h-12">Followers</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Category</TableHead>
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">2FA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles.map((profile) => (
            <TableRow key={profile.id} className="border-border hover:bg-white/[0.02] transition-colors group">
              <TableCell className="py-3.5">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-7 w-7 border border-border">
                    <AvatarImage src={profile.avatarUrl} />
                    <AvatarFallback className="text-[10px] bg-card">{profile.handle.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <span className="text-accent-blue font-medium text-sm hover:underline cursor-pointer">@{profile.handle}</span>
                      {profile.badge === 'GOLD' && (
                        <Badge variant="outline" className="h-3 px-1 text-[7px] bg-yellow-500/5 text-yellow-500/80 border-yellow-500/20 font-bold tracking-tighter">GOLD</Badge>
                      )}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{profile.displayName}</span>
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
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {renderHiddenField(profile.id + '-email', profile.email, "Email hidden")}
                    <button 
                      onClick={() => toggleVisibility(profile.id + '-email')}
                      className="p-1 hover:bg-secondary rounded opacity-40 hover:opacity-100 transition-all"
                    >
                      {visibleFields[profile.id + '-email'] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderHiddenField(profile.id + '-pass', profile.password, "Pass hidden")}
                    <button 
                      onClick={() => toggleVisibility(profile.id + '-pass')}
                      className="p-1 hover:bg-secondary rounded opacity-40 hover:opacity-100 transition-all"
                    >
                      {visibleFields[profile.id + '-pass'] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-sans text-sm text-foreground">
                {profile.followers.toLocaleString()}
              </TableCell>
              <TableCell>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-secondary text-muted-foreground border border-border">
                  {profile.category}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Shield className={`h-3 w-3 ${profile.twoFactorSeed ? 'text-accent-green' : 'text-muted-foreground/30'}`} />
                  {renderHiddenField(profile.id + '-2fa', profile.twoFactorSeed, "Seed none")}
                  {profile.twoFactorSeed && (
                    <button 
                      onClick={() => toggleVisibility(profile.id + '-2fa')}
                      className="p-1 hover:bg-secondary rounded opacity-40 hover:opacity-100 transition-all"
                    >
                      {visibleFields[profile.id + '-2fa'] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
