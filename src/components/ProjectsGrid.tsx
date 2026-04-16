import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/src/types';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

interface ProjectsGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function ProjectsGrid({ projects, onProjectClick }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          onClick={() => onProjectClick(project)}
          className="cursor-pointer"
        >
          <Card className="group overflow-hidden border-border bg-card hover:border-accent-blue/40 transition-all duration-300">
            <div className="relative h-40 overflow-hidden">
              <img 
                src={project.avatarUrl || `https://picsum.photos/seed/${project.id}/400/200`} 
                alt={project.name}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute top-3 right-3">
                 <Badge className="bg-accent-blue text-white font-black text-[10px] tracking-widest">{project.ticker}</Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-black group-hover:text-accent-blue transition-colors truncate">{project.name}</CardTitle>
                <span className={`text-[10px] font-black ${project.pnl.startsWith('+') ? 'text-accent-green' : 'text-destructive'}`}>
                  {project.pnl}
                </span>
              </div>
              <CardDescription className="text-xs line-clamp-2 text-muted-foreground">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-[8px] font-black opacity-60">
                   {project.type.replace('_', ' ')}
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="w-full justify-between h-9 text-[11px] font-bold bg-secondary/50 group-hover:bg-accent-blue group-hover:text-white transition-all">
                OPEN PROJECT
                <ArrowRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
