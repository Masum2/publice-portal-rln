import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Clock, Users, ArrowRight, } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Full Width Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80")',
        }}
      />
      
      {/* Gradient Backdrop Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900/95 via-blue-950/90 to-slate-900/95 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 md:px-12 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Header Logo */}
              <div className="flex items-center">
                <svg className="h-8 md:h-10 w-auto" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                
                  <image href="https://www.beratensoftware.com/Images/Logos/BeratenLogo.svg" width="100%" height="100%" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }} />
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-white font-bold tracking-widest uppercase -mt-0.5">
                  Adult & Family Protective Services
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:flex text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/30 uppercase tracking-widest items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                SECURE PORTAL
              </span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-6xl w-full">
            {/* Hero Section with Glass Morphism */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
              <div className="text-center">
                {/* Hero Logo Box */}
                <div className="mb-8 flex justify-center">
                  <div className="w-48 h-28 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-4 shadow-2xl shadow-blue-500/30">
                   <svg className="h-8 md:h-10 w-auto" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
               
                  <image href="https://www.beratensoftware.com/Images/Logos/BeratenLogo.svg" width="100%" height="100%" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.5))' }} />
                </svg>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-black text-white text-center mb-4 tracking-tight">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">APS</span>
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-blue-400 text-center mb-2">
                  Protecting Our Community
                </h2>
                <p className="text-sm md:text-base text-gray-300 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
                  Secure and confidential reporting system for adult protection cases.
                  Submit referrals, track cases, and ensure the safety of our community members.
                </p>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 max-w-3xl mx-auto">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/15 transition group">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg group-hover:scale-110 transition">
                        <FileText className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">24/7</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Reporting Available</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/15 transition group">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:scale-110 transition">
                        <Clock className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">100%</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Confidential</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center hover:bg-white/15 transition group">
                    <div className="flex justify-center mb-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 transition">
                        <Users className="w-6 h-6 text-purple-400" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">Secure</p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Encrypted Portal</p>
                  </div>
                </div>

                {/* New Referral Button */}
                <Link
                  to="/portal"
                  className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-lg font-bold uppercase rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Shield className="w-5 h-5" />
                    New Referral
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                </Link>

                {/* Quick Info */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                    <span>System Online</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    <span>Secure Connection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                    <span>Encrypted Data</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-center px-4">
              <p className="text-xs text-gray-500 max-w-2xl mx-auto">
                🔒 All information is transmitted securely and handled with the strictest confidentiality.
             
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600">
                <span>© 2026 Red Lake Nation APS</span>
                <span className="hidden sm:inline">•</span>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};