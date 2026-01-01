
import React, { useState, useContext } from 'react';
import { View } from './types';
import { DataContext } from './context/DataContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MetaDashboardView from './components/views/MetaDashboardView';
import AIAdvisorView from './components/views/AIAdvisorView';
import TransactionsView from './components/views/TransactionsView';
import GlobalChatbot from './components/GlobalChatbot';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.MetaDashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dataContext = useContext(DataContext);

  if (!dataContext) {
    throw new Error("App must be used within a DataProvider");
  }

  const { isLoading, error } = dataContext;

  const handleSetView = (view: View) => {
    if (view !== activeView) {
      setActiveView(view);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      }
    }
  };

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-dashed rounded-full animate-spin"></div>
          <p className="text-cyan-400 animate-pulse font-mono tracking-widest text-xs uppercase">Initializing Sovereign Nexus...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full p-4">
          <div className="bg-gray-900 border border-red-900/50 rounded-xl p-8 max-w-lg text-center shadow-2xl shadow-red-500/10">
            <h1 className="text-2xl font-bold text-red-400 mb-4">Nexus Connection Failure</h1>
            <p className="text-gray-400 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-900/20 border border-red-700 text-red-400 rounded-lg hover:bg-red-900/40 transition-all"
            >
              Attempt Reconnection
            </button>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case View.MetaDashboard:
        return <MetaDashboardView />;
      case View.AIAdvisor:
        return <AIAdvisorView />;
      case View.Transactions:
        return <TransactionsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="text-6xl text-gray-800">⛓️</div>
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-300">Feature Encrypted</h2>
              <p className="text-gray-500 mt-2">View module "{activeView}" is currently undergoing optimization.</p>
            </div>
            <button 
              onClick={() => handleSetView(View.MetaDashboard)}
              className="px-6 py-2 bg-cyan-900/20 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-900/40 transition-all"
            >
              Return to Meta Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-950 text-gray-300 font-sans overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={handleSetView} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} activeView={activeView} />
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
            <div className="max-w-7xl mx-auto h-full">
              {renderView()}
            </div>
          </main>
        </div>
      </div>

      <GlobalChatbot />
    </div>
  );
};

export default App;
