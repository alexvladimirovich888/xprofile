import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AccountsTable } from './components/AccountsTable';
import { ProjectsGrid } from './components/ProjectsGrid';
import { FilterBar } from './components/FilterBar';
import { mockProfiles, mockProjects } from './mockData';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginPage } from './components/LoginPage';
import { ProfileModal } from './components/ProfileModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectDetailView } from './components/ProjectDetailView';
import { XProfile, Category, Project, ProjectType } from './types';
import { supabase } from './lib/supabase';
import { Loader2 } from 'lucide-react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'accounts' | 'projects'>('accounts');
  const [profiles, setProfiles] = useState<XProfile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
  const [editingProfile, setEditingProfile] = useState<XProfile | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewingProjectDetail, setViewingProjectDetail] = useState<Project | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState('recent');

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfiles();
      fetchProjects();
    }
  }, [isAuthenticated]);

  const fetchProjects = async () => {
    setProjectsLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedData: Project[] = data.map(item => ({
          id: item.id,
          name: item.name,
          ticker: item.ticker,
          description: item.description,
          type: item.type as ProjectType,
          pnl: item.pnl,
          avatarUrl: item.avatar_url,
          bannerUrl: item.banner_url,
          createdAt: item.created_at
        }));
        setProjects(mappedData);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setProjectsLoading(false);
    }
  };

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedData: XProfile[] = data.map(item => ({
          id: item.id,
          handle: item.handle,
          displayName: item.display_name,
          followers: item.followers,
          category: item.category as Category,
          addedDate: new Date(item.created_at).toISOString().split('T')[0],
          avatarUrl: item.avatar_url,
          badge: item.badge,
          status: item.status,
          email: item.email,
          password: item.password,
          recoveryEmail: item.recovery_email,
          profileUrl: item.profile_url,
          notes: item.notes
        }));
        setProfiles(mappedData);
      }
    } catch (err) {
      console.error('Error fetching profiles:', err);
      // Fallback to mock data if DB fails/not setup
      setProfiles(mockProfiles);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const handleAddProfile = () => {
    setEditingProfile(null);
    setIsModalOpen(true);
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = async (projectData: Partial<Project>) => {
    try {
      const payload = {
        name: projectData.name || '',
        ticker: projectData.ticker || '',
        description: projectData.description || '',
        type: projectData.type || 'COMMUNITY',
        pnl: projectData.pnl || '0%',
        avatar_url: projectData.avatarUrl || '',
        banner_url: projectData.bannerUrl || '',
      };

      let result;
      if (editingProject) {
        result = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingProject.id);
      } else {
        result = await supabase
          .from('projects')
          .insert([payload]);
      }

      if (result.error) throw result.error;

      await fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Error saving project to database.');
    }
  };

  const handleProjectClick = (project: Project) => {
    setViewingProjectDetail(project);
  };

  const handleEditProfile = (profile: XProfile) => {
    setEditingProfile(profile);
    setIsModalOpen(true);
  };

  const handleDeleteProfile = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        const { error } = await supabase
          .from('accounts')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        setProfiles(profiles.filter(p => p.id !== id));
      } catch (err) {
        console.error('Error deleting profile:', err);
        // Optimistic UI fallback
        setProfiles(profiles.filter(p => p.id !== id));
      }
    }
  };

  const handleSaveProfile = async (profileData: Partial<XProfile>) => {
    try {
      const payload = {
        handle: profileData.handle || '',
        display_name: profileData.displayName || '',
        followers: Number(profileData.followers) || 0,
        category: profileData.category || 'TECH',
        status: profileData.status || 'ACTIVE',
        email: profileData.email || '',
        password: profileData.password || '',
        recovery_email: profileData.recoveryEmail || '',
        profile_url: profileData.profileUrl || '',
        notes: profileData.notes || '',
        badge: profileData.badge || 'NONE',
        avatar_url: profileData.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.handle || 'default'}`
      };

      let result;
      if (editingProfile) {
        result = await supabase
          .from('accounts')
          .update(payload)
          .eq('id', editingProfile.id);
      } else {
        result = await supabase
          .from('accounts')
          .insert([payload]);
      }
      
      if (result.error) {
        console.error('Supabase Error:', result.error);
        alert(`database error: ${result.error.message}\n\nMake sure you have disabled RLS or added a policy in Supabase Dashboard -> SQL Editor.`);
        return;
      }
      
      // Success path
      await fetchProfiles();
      setIsModalOpen(false);
      setEditingProfile(null);
    } catch (err) {
      console.error('Critical save error:', err);
      alert('A critical error occurred while saving. Check the console for details.');
    }
  };

  // Logic: Filter & Sort
  const filteredProfiles = profiles.filter(p => {
    const matchesSearch = p.handle?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.displayName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'followers') return b.followers - a.followers;
    return b.addedDate.localeCompare(a.addedDate);
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const paginatedProfiles = filteredProfiles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-blue selection:text-white flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab);
          setViewingProjectDetail(null);
        }} 
        onAddProfile={handleAddProfile}
        onAddProject={handleAddProject}
      />

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'accounts' ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Accounts</h1>
                </div>
                
                <FilterBar 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
                
                {loading ? (
                  <div className="h-64 flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-border bg-card/20">
                    <Loader2 className="h-8 w-8 text-accent-blue animate-spin" />
                    <p className="text-sm text-muted-foreground font-medium animate-pulse">Fetching encrypted database...</p>
                  </div>
                ) : (
                  <AccountsTable 
                    profiles={paginatedProfiles} 
                    onEdit={handleEditProfile}
                    onDelete={handleDeleteProfile}
                  />
                )}
                
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`h-8 w-8 rounded border transition-colors flex items-center justify-center text-xs font-medium ${
                          currentPage === page 
                            ? 'border-border bg-card text-foreground' 
                            : 'border-transparent hover:border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
                </div>
                <ProjectsGrid 
                  projects={projects} 
                  onProjectClick={handleProjectClick}
                />

                {projectsLoading && (
                  <div className="mt-4 flex items-center justify-center">
                     <Loader2 className="h-4 w-4 animate-spin mr-2" />
                     <span className="text-xs text-muted-foreground">Syncing projects...</span>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Detail View Overlay */}
      <AnimatePresence>
        {viewingProjectDetail && (
           <div className="fixed inset-0 z-[60] bg-background pt-8 px-4 overflow-y-auto">
              <ProjectDetailView 
                project={viewingProjectDetail} 
                onBack={() => setViewingProjectDetail(null)} 
              />
           </div>
        )}
      </AnimatePresence>

      <ProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProfile}
        initialData={editingProfile}
      />

      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
      />

      <footer className="border-t border-border py-4 mt-auto">
        <div className="container mx-auto px-4 flex items-center justify-between text-[11px] text-muted-foreground">
          <div>Showing {activeTab === 'accounts' ? profiles.length : projects.length} tracking nodes</div>
          <div className="flex items-center space-x-2">
            <span>System Status:</span>
            <span className="text-accent-green font-medium">All Nodes Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
