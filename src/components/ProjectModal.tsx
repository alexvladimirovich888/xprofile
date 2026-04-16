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
import { Project, ProjectType } from '@/src/types';
import { ImagePlus, Loader2 } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Partial<Project>) => Promise<void>;
  initialData?: Project | null;
}

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: 'COMMUNITY', label: 'Community' },
  { value: 'PERSONAL_PAGE', label: 'Personal Page' },
  { value: 'PROJECT_WITH_WEBSITE', label: 'Project with Website' },
];

export function ProjectModal({ isOpen, onClose, onSave, initialData }: ProjectModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    ticker: '',
    description: '',
    type: 'COMMUNITY',
    pnl: '',
    avatarUrl: '',
    bannerUrl: '',
    email: '',
    password: '',
    recoveryEmail: '',
    websiteUrl: '',
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [bannerPreview, setBannerPreview] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setAvatarPreview(initialData.avatarUrl || '');
      setBannerPreview(initialData.bannerUrl || '');
    } else {
      setFormData({
        name: '',
        ticker: '',
        description: '',
        type: 'COMMUNITY',
        pnl: '',
        avatarUrl: '',
        bannerUrl: '',
        email: '',
        password: '',
        recoveryEmail: '',
        websiteUrl: '',
      });
      setAvatarPreview('');
      setBannerPreview('');
      setAvatarFile(null);
      setBannerFile(null);
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Create a combined data object including the raw File objects
      const savePayload = {
        ...formData,
        _avatarFile: avatarFile,
        _bannerFile: bannerFile
      };
      await onSave(savePayload as any);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (field: 'avatar' | 'banner') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (field === 'avatar') {
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
      } else {
        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-card border-border overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight">
            {initialData ? 'Edit Project' : 'Add New Project'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Project Name</Label>
              <Input
                id="name"
                className="bg-background"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="X Manager"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Ticker</Label>
              <Input
                id="ticker"
                className="bg-background"
                value={formData.ticker}
                onChange={(e) => setFormData({ ...formData, ticker: e.target.value })}
                placeholder="$XMAN"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Project View (Type)</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: ProjectType) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {PROJECT_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="pnl" className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">PNL</Label>
              <Input
                id="pnl"
                className="bg-background"
                value={formData.pnl}
                onChange={(e) => setFormData({ ...formData, pnl: e.target.value })}
                placeholder="+150%"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Avatar Image</Label>
              <div className="relative group border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center hover:border-accent-blue/50 transition-colors">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="h-20 w-20 rounded-full object-cover mb-4" />
                ) : (
                  <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload('avatar')}
                />
                <span className="text-[10px] text-muted-foreground">Click to upload avatar</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Banner Image</Label>
              <div className="relative group border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center hover:border-accent-blue/50 transition-colors">
                {bannerPreview ? (
                  <img src={bannerPreview} alt="Banner" className="h-20 w-40 rounded object-cover mb-4" />
                ) : (
                  <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileUpload('banner')}
                />
                <span className="text-[10px] text-muted-foreground">Click to upload banner</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc" className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Text for X Post</Label>
            <Textarea
              id="desc"
              className="bg-background min-h-[120px]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Write the post content here..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">X Profile Email</Label>
              <Input
                id="email"
                className="bg-background"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="project@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pass" className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Password</Label>
              <Input
                id="pass"
                className="bg-background"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rec_email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Recovery Email</Label>
              <Input
                id="rec_email"
                className="bg-background"
                value={formData.recoveryEmail}
                onChange={(e) => setFormData({ ...formData, recoveryEmail: e.target.value })}
                placeholder="recovery@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-xs font-bold uppercase tracking-wider text-muted-foreground text-foreground">Website URL</Label>
              <Input
                id="website"
                className="bg-background"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="border-border">
              Cancel
            </Button>
            <Button disabled={isSaving} type="submit" className="bg-accent-blue text-white hover:bg-accent-blue/90 font-bold px-8">
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? 'Update Project' : 'Add Project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
