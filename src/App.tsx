import React, { useState, useEffect } from 'react';
import { PetProfile, UserSavedPolicy } from './types';
import PetProfileForm from './components/PetProfileForm';
import RecommendationTab from './components/RecommendationTab';
import CabinetTab from './components/CabinetTab';
import MarketAnalysisTab from './components/MarketAnalysisTab';
import ChatConsultantTab from './components/ChatConsultantTab';
import { Shield, Sparkles, FolderHeart, TrendingUp, HelpCircle, Heart, PlusCircle, Smile, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [profile, setProfile] = useState<PetProfile | null>(null);
  const [savedPolicies, setSavedPolicies] = useState<UserSavedPolicy[]>([]);
  const [activeTab, setActiveTab] = useState<'onboarding' | 'recommendation' | 'cabinet' | 'market' | 'chat'>('onboarding');

  // Load state from localStorage on Mount
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('pet_insurance_profile');
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        setProfile(parsed);
        // If profile exists, default to core recommendation or cabinet tab
        setActiveTab('recommendation');
      }

      const storedPolicies = localStorage.getItem('pet_saved_policies');
      if (storedPolicies) {
        setSavedPolicies(JSON.parse(storedPolicies));
      }
    } catch (e) {
      console.error('Failed to load storage assets:', e);
    }
  }, []);

  // Save profile state change
  const handleSaveProfile = (newProfile: PetProfile) => {
    setProfile(newProfile);
    localStorage.setItem('pet_insurance_profile', JSON.stringify(newProfile));
    setActiveTab('recommendation');
  };

  // Add insurance policy to the Cabinet Refrigerator
  const handleSavePolicy = (insuranceId: string) => {
    if (!profile) return;

    // Avoid duplication
    const exists = savedPolicies.some(p => p.petName === profile.name && p.insuranceId === insuranceId);
    if (exists) return;

    const todayStr = new Date().toISOString().split('T')[0];

    const newPolicy: UserSavedPolicy = {
      id: `policy-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      petName: profile.name,
      insuranceId: insuranceId,
      startDate: todayStr,
      status: 'active',
      customNotes: '갱신 조건 우수팩. 보상 청구 원스톱 대기 중'
    };

    const updated = [...savedPolicies, newPolicy];
    setSavedPolicies(updated);
    localStorage.setItem('pet_saved_policies', JSON.stringify(updated));
  };

  // Remove policy from Cabinet Refrigerator
  const handleRemovePolicy = (policyId: string) => {
    const updated = savedPolicies.filter(p => p.id !== policyId);
    setSavedPolicies(updated);
    localStorage.setItem('pet_saved_policies', JSON.stringify(updated));
  };

  // Update policy notes inside database
  const handleUpdatePolicyNote = (policyId: string, notes: string) => {
    const updated = savedPolicies.map(p => {
      if (p.id === policyId) {
        return { ...p, customNotes: notes };
      }
      return p;
    });
    setSavedPolicies(updated);
    localStorage.setItem('pet_saved_policies', JSON.stringify(updated));
  };

  // Completely reset pet profile and cache
  const handleResetAll = () => {
    if (window.confirm('아이 정보와 서랍에 저장된 보험 목록을 정말 삭제하시겠개? 🐾')) {
      setProfile(null);
      setSavedPolicies([]);
      localStorage.removeItem('pet_insurance_profile');
      localStorage.removeItem('pet_saved_policies');
      setActiveTab('onboarding');
    }
  };

  const savedIds = savedPolicies.map(p => p.insuranceId);

  return (
    <div className="min-h-screen bg-[#FFFBF9] font-sans antialiased text-gray-800 pb-16">
      {/* Decorative top pattern */}
      <div className="h-1.5 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 w-full" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        
        {/* App Main Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100 pb-5" id="app-main-header">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🐾</span>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-1.5 select-none font-sans">
                우리집 <span className="text-orange-500">펫보험고</span> 💼
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              반려가족 의료비 고민을 든든하게 해결해 드리는 맞춤형 펫보험 종합 보관소
            </p>
          </div>

          {/* User profile toggle summary */}
          {profile && (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-2xl p-2.5">
              <div className="h-8 w-8 rounded-xl bg-orange-100 flex items-center justify-center font-bold text-md select-none">
                {profile.type === 'dog' ? '🐕' : profile.type === 'cat' ? '🐈' : '🐹'}
              </div>
              <div className="text-left">
                <span className="text-[10px] text-gray-400 block font-bold leading-none">우리집 등록된 반려동물</span>
                <span className="text-xs font-bold text-gray-800 leading-normal">
                  {profile.name} <span className="text-[10px] font-normal text-gray-500">({profile.breed})</span>
                </span>
              </div>
              <button
                id="header-edit-profile-btn"
                onClick={() => setActiveTab('onboarding')}
                className="ml-2 hover:bg-orange-100/60 p-1.5 rounded-lg text-orange-600 transition-all cursor-pointer text-xs font-bold"
                title="아이 정보 수정"
              >
                정보변경
              </button>
            </div>
          )}
        </header>

        {/* Navigation Tabs - Figma style: Cute pastel buttons and clear selection */}
        <div className="overflow-x-auto pb-1" id="nav-tabs-wrapper">
          <div className="flex gap-2 min-w-max p-1 bg-gray-100/60 rounded-2xl border border-gray-100">
            {profile && (
              <>
                <button
                  id="tab-btn-recommendation"
                  onClick={() => setActiveTab('recommendation')}
                  className={`px-4.5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                    activeTab === 'recommendation'
                      ? 'bg-white text-orange-950 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-orange-500" /> 맞춤 보장추천
                </button>
                <button
                  id="tab-btn-cabinet"
                  onClick={() => setActiveTab('cabinet')}
                  className={`px-4.5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer relative select-none ${
                    activeTab === 'cabinet'
                      ? 'bg-white text-orange-950 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <FolderHeart className="w-4 h-4 text-orange-500" /> 우리집 보험고 서랍
                  {savedPolicies.length > 0 && (
                    <span className="absolute -top-1.5 -right-1 bg-orange-500 text-white text-[9px] font-black h-4.5 min-w-4.5 px-1 rounded-full flex items-center justify-center animate-bounce">
                      {savedPolicies.length}
                    </span>
                  )}
                </button>
              </>
            )}
            
            <button
              id="tab-btn-onboarding"
              onClick={() => setActiveTab('onboarding')}
              className={`px-4.5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                activeTab === 'onboarding'
                  ? 'bg-white text-orange-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-orange-500" /> 펫 등록/수정
            </button>

            <button
              id="tab-btn-market"
              onClick={() => setActiveTab('market')}
              className={`px-4.5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                activeTab === 'market'
                  ? 'bg-white text-orange-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-indigo-500" /> 보험 트렌드분석
            </button>

            <button
              id="tab-btn-chat"
              onClick={() => setActiveTab('chat')}
              className={`px-4.5 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer select-none ${
                activeTab === 'chat'
                  ? 'bg-white text-orange-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Smile className="w-4 h-4 text-orange-500 animate-pulse" /> AI 대화상담소
            </button>
          </div>
        </div>

        {/* Core Tab Screen Router */}
        <main className="min-h-[450px]">
          <AnimatePresence mode="wait">
            {activeTab === 'onboarding' && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <PetProfileForm 
                  onSave={handleSaveProfile} 
                  initialProfile={profile} 
                />
              </motion.div>
            )}

            {activeTab === 'recommendation' && profile && (
              <motion.div
                key="recommendation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <RecommendationTab
                  profile={profile}
                  onSavePolicy={handleSavePolicy}
                  savedInsuranceIds={savedIds}
                  onNavigateToChat={() => setActiveTab('chat')}
                />
              </motion.div>
            )}

            {activeTab === 'cabinet' && (
              <motion.div
                key="cabinet"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <CabinetTab
                  profile={profile}
                  savedPolicies={savedPolicies}
                  onRemovePolicy={handleRemovePolicy}
                  onUpdatePolicyNote={handleUpdatePolicyNote}
                  onResetAll={handleResetAll}
                  onNavigateToForm={() => setActiveTab('onboarding')}
                />
              </motion.div>
            )}

            {activeTab === 'market' && (
              <motion.div
                key="market"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MarketAnalysisTab />
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ChatConsultantTab 
                  profile={profile} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Cute Footer */}
        <footer className="text-center text-[10px] text-gray-400 select-none pt-12 space-y-1 bg-transparent">
          <p>© 2026 우리집 펫보험고. All rights and warmth reserved.</p>
          <p>반려동물 의료 실태 조사 자료에 의거하여 제공된 모의 설계 추천 도구입니다.</p>
        </footer>

      </div>
    </div>
  );
}
