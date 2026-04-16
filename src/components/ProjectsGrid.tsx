import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Project } from '@/src/types';
import { Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="group overflow-hidden border-border bg-card hover:border-accent-blue/40 transition-all duration-300">
            <div className="relative h-40 overflow-hidden">
              <img 
                src={project.thumbnailUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-secondary text-[8px] flex items-center justify-center font-bold text-muted-foreground">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                  <div className="h-6 w-6 rounded-full border-2 border-background bg-accent-blue/20 text-accent-blue text-[8px] flex items-center justify-center font-bold">
                    +{project.profileCount - 3}
                  </div>
                </div>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold group-hover:text-accent-blue transition-colors">{project.title}</CardTitle>
              <CardDescription className="text-xs line-clamp-2 text-muted-foreground">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {project.profileCount} Profiles
                </div>
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {project.updatedAt}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button variant="ghost" className="w-full justify-between h-9 text-[11px] font-bold bg-secondary/50 hover:bg-accent-green hover:text-black transition-all">
                VIEW PROJECT
                <ArrowRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
