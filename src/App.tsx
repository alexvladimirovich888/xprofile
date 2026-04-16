import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AccountsTable } from './components/AccountsTable';
import { ProjectsGrid } from './components/ProjectsGrid';
import { FilterBar } from './components/FilterBar';
import { mockProfiles, mockProjects } from './mockData';
import { motion, AnimatePresence } from 'motion/react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { LoginPage } from './components/LoginPage';

function Dashboard() {
  const [activeTab, setActiveTab] = useState<'accounts' | 'projects'>('accounts');
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent-blue selection:text-white flex flex-col">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

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
                
                <FilterBar />
                <AccountsTable profiles={mockProfiles} />
                
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
