import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { XProfile, Category } from '@/src/types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: Partial<XProfile>) => void;
  initialData?: XProfile | null;
}

const CATEGORIES: Category[] = ['TECH', 'NEWS', 'POLITICS', 'INFLUENCER', 'GOV', 'STREAMER', 'CRYPTO', 'GAMING'];

export function ProfileModal({ isOpen, onClose, onSave, initialData }: ProfileModalProps) {
  const [formData, setFormData] = useState<Partial<XProfile>>({
    handle: '',
    displayName: '',
    category: 'TECH',
    followers: 0,
    email: '',
    password: '',
    recoveryEmail: '',
    notes: '',
    status: 'ACTIVE',
    badge: 'NONE',
    avatarUrl: `https://picsum.photos/seed/${Math.random()}/100/100`
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        handle: '',
        displayName: '',
        category: 'TECH',
        followers: 0,
        email: '',
        password: '',
        recoveryEmail: '',
        notes: '',
        status: 'ACTIVE',
        badge: 'NONE',
        avatarUrl: `https://picsum.photos/seed/${Math.random()}/100/100`
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] bg-card border-border overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {initialData ? 'Edit Profile' : 'Add New Profile'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="handle" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Handle</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">@</span>
                <Input
                  id="handle"
                  className="pl-7 bg-background"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  placeholder="elonmusk"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Display Name</Label>
              <Input
                id="displayName"
                className="bg-background"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                placeholder="Elon Musk"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="followers" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Followers</Label>
              <Input
                id="followers"
                type="number"
                className="bg-background"
                value={formData.followers}
                onChange={(e) => setFormData({ ...formData, followers: parseInt(e.target.value) || 0 })}
                placeholder="1000000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Badge</Label>
              <Select 
                value={formData.badge} 
                onValueChange={(value: any) => setFormData({ ...formData, badge: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="No badge" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="NONE">NONE</SelectItem>
                  <SelectItem value="BLUE">BLUE (Individual)</SelectItem>
                  <SelectItem value="GOLD">GOLD (Business)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'ACTIVE' | 'BANNED') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Active" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="BANNED">BANNED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 border border-accent-blue/20 rounded-lg bg-accent-blue/5 space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-blue flex items-center">
              Authorization Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-background border-border"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-background border-border"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recovery" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Recovery Email</Label>
                <Input
                  id="recovery"
                  type="email"
                  className="bg-background border-border"
                  value={formData.recoveryEmail}
                  onChange={(e) => setFormData({ ...formData, recoveryEmail: e.target.value })}
                  placeholder="recovery@example.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Admin Notes</Label>
            <Textarea
              id="notes"
              className="bg-background min-h-[80px]"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Internal information about this account..."
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-border">
              Cancel
            </Button>
            <Button type="submit" className="bg-accent-green text-black hover:bg-accent-green/90 font-bold px-8">
              {initialData ? 'Update Profile' : 'Save Profile'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
