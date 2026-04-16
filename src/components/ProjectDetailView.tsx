import React from 'react';
import { Project } from '@/src/types';
import { motion } from 'motion/react';
import { ArrowLeft, ExternalLink, TrendingUp, Info, Tag, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
}

export function ProjectDetailView({ project, onBack }: ProjectDetailViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-5xl mx-auto"
    >
      <header className="mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 h-8 text-xs font-bold hover:bg-card hover:text-foreground pl-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          BACK TO PROJECTS
        </Button>
        
        <div className="relative group rounded-3xl overflow-hidden border border-border bg-card shadow-2xl">
          {/* Banner */}
          <div className="h-64 sm:h-80 w-full overflow-hidden relative">
            <img 
              src={project.bannerUrl || "https://picsum.photos/seed/banner/1200/400"} 
              alt="Banner" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </div>
          
          <div className="px-8 pb-10 -mt-16 sm:-mt-20 relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-3xl border-4 border-card bg-card overflow-hidden shadow-2xl">
                <img 
                  src={project.avatarUrl || "https://picsum.photos/seed/avatar/200/200"} 
                  alt={project.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="flex-1 text-center sm:text-left pt-2 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                <h1 className="text-3xl font-black tracking-tight text-white">{project.name}</h1>
                <Badge className="w-fit mx-auto sm:mx-0 bg-accent-blue text-white font-black text-xs px-3 py-1">
                  {project.ticker}
                </Badge>
              </div>
              <p className="text-white/60 text-sm font-medium tracking-wide">
                Established: {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center space-x-2">
                 <div className="bg-accent-green/10 border border-accent-green/20 px-4 py-2 rounded-2xl flex flex-col items-center">
                    <span className="text-[10px] font-black text-accent-green uppercase opacity-60">PNL Performance</span>
                    <span className="text-xl font-black text-accent-green">{project.pnl}</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 border-t border-border">
            <div className="lg:col-span-2 p-8 space-y-8 border-r border-border bg-card">
              <section className="space-y-4">
                <div className="flex items-center space-x-2 text-accent-blue font-black text-[10px] tracking-[0.2em] uppercase">
                  <Info className="h-4 w-4" />
                  <span>About Project</span>
                </div>
                <div className="text-muted-foreground leading-relaxed text-sm bg-secondary/30 p-6 rounded-2xl border border-border/50">
                  {project.description}
                </div>
              </section>
              
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-border bg-background space-y-4">
                  <div className="flex items-center space-x-2 text-muted-foreground font-black text-[10px] tracking-[0.2em] uppercase">
                    <Layers className="h-4 w-4" />
                    <span>Project Logic</span>
                  </div>
                  <div className="text-foreground text-sm font-bold bg-card p-4 rounded-xl border border-border">
                    {project.type.replace('_', ' ')}
                  </div>
                </div>
                
                <div className="p-6 rounded-2xl border border-border bg-background space-y-4">
                  <div className="flex items-center space-x-2 text-muted-foreground font-black text-[10px] tracking-[0.2em] uppercase">
                    <Tag className="h-4 w-4" />
                    <span>Market Data</span>
                  </div>
                  <div className="flex items-center space-x-2 text-foreground text-sm font-bold bg-card p-4 rounded-xl border border-border">
                    <TrendingUp className="h-4 w-4 text-accent-green" />
                    <span>Live Analysis Enabled</span>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="p-8 bg-secondary/10 space-y-8">
              <section className="space-y-6">
                <div className="flex items-center space-x-2 text-muted-foreground font-black text-[10px] tracking-[0.2em] uppercase">
                  <ExternalLink className="h-4 w-4" />
                  <span>Connect</span>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-accent-blue text-white hover:bg-accent-blue/90 font-black h-12 rounded-xl">
                    VISIT WEBSITE
                  </Button>
                  <Button variant="outline" className="w-full border-border bg-card hover:bg-secondary font-black h-12 rounded-xl">
                    JOIN COMMUNITY
                  </Button>
                </div>
              </section>
              
              <div className="p-6 rounded-2xl bg-accent-yellow/5 border border-accent-yellow/20 space-y-2">
                <span className="text-[10px] font-black text-accent-yellow uppercase tracking-widest">Internal Status</span>
                <p className="text-xs text-muted-foreground">This project is currently being monitored for abnormal liquidity shifts.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </motion.div>
  );
}
