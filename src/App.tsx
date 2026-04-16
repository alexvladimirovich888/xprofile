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
import { XProfile, Category } from './types';
import { supabase } from './lib/supabase';
import { Loader2 } from 'lucide-react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'accounts' | 'projects'>('accounts');
  const [profiles, setProfiles] = useState<XProfile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState<XProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState('recent');

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfiles();
    }
  }, [isAuthenticated]);

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
          twoFactorSeed: item.two_fa_seed,
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
        handle: profileData.handle,
        display_name: profileData.displayName,
        followers: profileData.followers,
        category: profileData.category,
        status: profileData.status,
        email: profileData.email,
        password: profileData.password,
        two_fa_seed: profileData.twoFactorSeed,
        notes: profileData.notes,
        badge: profileData.badge,
        avatar_url: profileData.avatarUrl
      };

      if (editingProfile) {
        const { error } = await supabase
          .from('accounts')
          .update(payload)
          .eq('id', editingProfile.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('accounts')
          .insert([payload]);
        if (error) throw error;
      }
      
      fetchProfiles();
    } catch (err) {
      console.error('Error saving profile:', err);
      // Fallback for prototype
      if (editingProfile) {
        setProfiles(profiles.map(p => p.id === editingProfile.id ? { ...p, ...profileData } as XProfile : p));
      } else {
        const newProfile: XProfile = {
          ...profileData,
          id: Math.random().toString(36).substr(2, 9),
          addedDate: new Date().toISOString().split('T')[0],
        } as XProfile;
        setProfiles([newProfile, ...profiles]);
      }
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-blue selection:text-white flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onAddProfile={handleAddProfile}
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
                    profiles={filteredProfiles} 
                    onEdit={handleEditProfile}
                    onDelete={handleDeleteProfile}
                  />
                )}
                
                <div className="mt-8 flex items-center justify-center space-x-1">
                  <div className="h-8 w-8 rounded border border-border bg-card text-foreground flex items-center justify-center text-xs font-medium">1</div>
                  <div className="h-8 w-8 rounded border border-transparent hover:border-border transition-colors flex items-center justify-center text-xs font-medium cursor-pointer text-muted-foreground hover:text-foreground">2</div>
                  <div className="h-8 w-8 rounded border border-transparent hover:border-border transition-colors flex items-center justify-center text-xs font-medium cursor-pointer text-muted-foreground hover:text-foreground">3</div>
                  <span className="text-muted-foreground px-1 self-center pb-1">...</span>
                  <div className="h-8 w-8 rounded border border-transparent hover:border-border transition-colors flex items-center justify-center text-xs font-medium cursor-pointer text-muted-foreground hover:text-foreground">23</div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
                </div>
                <ProjectsGrid projects={mockProjects} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <ProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveProfile}
        initialData={editingProfile}
      />

      <footer className="border-t border-border py-4 mt-auto">
        <div className="container mx-auto px-4 flex items-center justify-between text-[11px] text-muted-foreground">
          <div>Showing {mockProfiles.length} profiles</div>
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
