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
            <TableHead className="text-[11px] font-bold uppercase tracking-[0.05em] text-muted-foreground h-12">Auth Details (Encrypted)</TableHead>
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
                    <div className="w-px h-4 bg-border mx-1" />
                    <div className="flex items-center space-x-1 px-1">
                      <Shield className={`h-3 w-3 ${profile.twoFactorSeed ? 'text-accent-green' : 'text-muted-foreground/30'}`} />
                      <button 
                        disabled={!profile.twoFactorSeed}
                        onClick={() => toggleVisibility(profile.id + '-2fa')}
                        className="p-1 hover:bg-secondary rounded opacity-40 hover:opacity-100 transition-all disabled:opacity-0"
                      >
                        {visibleFields[profile.id + '-2fa'] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </button>
                    </div>
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
