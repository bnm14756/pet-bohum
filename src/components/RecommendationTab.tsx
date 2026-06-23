import { useState } from 'react';
import { PetProfile, PetInsurance } from '../types';
import { recommendInsurance, KoreanPetInsurances } from '../data/insuranceData';
import { Shield, Sparkles, AlertCircle, ArrowRight, HelpCircle, ExternalLink, BookmarkCheck, LayoutGrid, CheckCircle2, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecommendationTabProps {
  profile: PetProfile;
  onSavePolicy: (insuranceId: string) => void;
  savedInsuranceIds: string[];
  onNavigateToChat: () => void;
}

export default function RecommendationTab({
  profile,
  onSavePolicy,
  savedInsuranceIds,
  onNavigateToChat,
}: RecommendationTabProps) {
  const [showAllInsurances, setShowAllInsurances] = useState(false);
  const [justSavedId, setJustSavedId] = useState<string | null>(null);

  const recommendedList = recommendInsurance(profile);
  const topPick = recommendedList[0];
  const budgetPick = recommendedList.find(ins => ins.type === 'budget') || recommendedList[1];
  const restPicks = recommendedList.slice(1, 3);

  // Derive custom pet diagnosis card
  const getPetDiagnosticType = () => {
    const hasJoints = profile.concerns.includes('joints');
    const hasSkin = profile.concerns.includes('skin');
    const hasTeeth = profile.concerns.includes('teeth');
    
    if (profile.type === 'dog') {
      if (['말티즈', '토이푸들', '포메라니안', '치와와'].includes(profile.breed) || hasJoints) {
        return {
          title: '🦴 슬개골 집중 경보형',
          desc: '소형 견종 특성상 90% 확률로 발생하는 슬개골 탈구 및 무릎 관절 전십자인대 부상에 단단히 예비해야 합니다. 관절 특약과 일일 보장 한도가 넉넉한 보험을 눈여겨보관 하세요!',
          color: 'from-orange-500 to-amber-500',
        };
      }
      if (hasSkin) {
        return {
          title: '🧪 아토피 & 피부 촉촉 케어형',
          desc: '말티즈나 시츄 등 귓병, 아토피성 피부염으로 한 달 약값이 고액으로 지속되는 것에 대비해 약값 실손 한도가 높은 보람상조형 안심 처치가 시급합니다.',
          color: 'from-emerald-500 to-teal-500',
        };
      }
    } else if (profile.type === 'cat') {
      if (hasTeeth) {
        return {
          title: '🦷 덴탈 잇몸 고독한 미식묘형',
          desc: '고양이 다빈도 구강 질환(흡수성 병변, 치주염) 치료비는 수십만원대입니다. 유일무이 치과 스케일링 특약과 수술 하루 한도가 높은 DB 제품군을 눈여겨보세요.',
          color: 'from-indigo-500 to-blue-500',
        };
      }
      return {
        title: '💎 요로비뇨기 안심 묘르신형',
        desc: '고양이는 환경 변화나 스트레스로 인한 특발성 방광염, 요로결석 확률이 극히 높습니다. 통원 횟수 한도가 크고 신속 보장이 되는 메리츠 캣 제품군이 환상적입니다.',
        color: 'from-pink-500 to-rose-500',
      };
    } else {
      return {
        title: '🌟 소중한 소동물 안심보장형',
        desc: '특수동물(토끼, 햄스터, 조류 등)은 전문 치료 및 입원/수술 비용에 대한 대비가 유용합니다. 의료실비 종합 가성비 플랜을 눈여겨보고 꼼꼼히 보정해 보세요.',
        color: 'from-purple-500 to-indigo-500',
      };
    }

    return {
      title: '🌟 실속 한도 종합 튼튼형',
      desc: '의료비 부담 완비를 목표로, 뜻밖의 골절이나 이물질 섭취 수술 등 고액 지출에 똑똑하게 대응할 수 있도록 전체 보상비율이 균형 잡힌 가성비 플랜을 추천합니다.',
      color: 'from-blue-500 to-purple-500',
    };
  };

  const diagnostic = getPetDiagnosticType();

  const handleSaveToCabinet = (id: string) => {
    onSavePolicy(id);
    setJustSavedId(id);
    setTimeout(() => setJustSavedId(null), 1800);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' })
      .format(val)
      .replace('₩', '') + '원';
  };

  return (
    <div className="space-y-8 animate-fade-in" id="recommendation-sec">
      {/* 1. Pet Analysis Diagnostic Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-y-6 translate-x-6 text-9xl">
          {profile.type === 'dog' ? '🐕' : profile.type === 'cat' ? '🐈' : '🐹'}
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-bold font-mono">
              <Sparkles className="w-3.5 h-3.5" /> AGENT REPORT FOR {profile.name.toUpperCase()}
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-sm px-2.5 py-1 rounded-lg font-bold bg-gradient-to-r ${diagnostic.color} text-white`}>
                {diagnostic.title}
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">유형 분석</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-2xl font-sans">
              <strong>{profile.breed}</strong> 품종의 <strong>{profile.age}살</strong> {profile.name}이는{' '}
              {diagnostic.desc}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              id="ai-consultant-cta-btn"
              onClick={onNavigateToChat}
              className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" /> AI 댕냥이 상담사 특별질의 💬
            </button>
            <a
              id="human-consultant-call-btn"
              href="tel:010-1234-5678"
              className="px-5 py-3 rounded-2xl bg-white hover:bg-orange-50 border border-orange-100 text-orange-950 font-bold text-xs shadow-lg shadow-orange-100/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>📞 전화 상담원 연결:</span>
              <span className="font-mono text-orange-600">010-1234-5678</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Top Pick Insurance Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold text-gray-800 flex items-center gap-1.5 select-none" id="fresh-picks-title">
            🥇 {profile.name}이만을 위한 맞춤형 펫보험 추천
          </h4>
          <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-1 rounded-full">
            매칭도 99% 최선의 정밀성
          </span>
        </div>

        {/* The Golden Card */}
        {topPick && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-3xl border-2 p-6 md:p-8 relative overflow-hidden shadow-lg ${topPick.bgColor}`}
          >
            <div className="absolute right-0 top-0 opacity-15 text-8xl transform translate-y-3 translate-x-3 pointer-events-none">
              {topPick.emoji}
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{topPick.emoji}</span>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{topPick.company}</span>
                    <h5 className="text-xl font-bold text-gray-900 leading-tight">{topPick.name}</h5>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 block">설계된 평균 월 보험료</span>
                  <span className="text-2xl font-black text-gray-900">{formatCurrency(topPick.averagePremium)}</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/50 rounded-2xl p-4">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">보상 비율</span>
                  <span className="text-md font-extrabold text-gray-900">{topPick.reimbursementRatio}% 실값 환원</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">자기 부담금</span>
                  <span className="text-md font-extrabold text-gray-900">{topPick.deductible / 10000}만원 / 일(회)</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">가입 연령 상한</span>
                  <span className="text-md font-extrabold text-gray-900">만 {topPick.ageLimitMax}세까지</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">연간 최대 보장 총한도</span>
                  <span className="text-md font-extrabold text-gray-900">1,500 ~ 2,000만원</span>
                </div>
              </div>

              {/* Compensation Limit Detail */}
              <div className="flex items-start gap-2 bg-white/30 rounded-xl p-3 text-xs">
                <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800">지급 한도 정보: </span>
                  <span className="text-gray-700">{topPick.compensationLimit}</span>
                </div>
              </div>

              {/* Special Coverages Checklist */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-gray-600 block">📌 {profile.name}이 집중 우치보장 특약</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {topPick.specialCoverages.map((cov, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span>{cov}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-black/5 pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  id={`save-top-pick-${topPick.id}`}
                  onClick={() => handleSaveToCabinet(topPick.id)}
                  disabled={savedInsuranceIds.includes(topPick.id)}
                  className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md ${
                    savedInsuranceIds.includes(topPick.id)
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-slate-800 active:scale-[0.99]'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  {savedInsuranceIds.includes(topPick.id) ? '우리집 보험고 보관 완료!' : '우리집 보험고에 보관하기 💼'}
                </button>
                <a
                  href={topPick.link}
                  target="_blank"
                  rel="noreferrer referrer"
                  className="px-5 py-3.5 rounded-xl border border-black/10 bg-white/70 hover:bg-white text-gray-800 font-semibold text-sm transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  공식 약관 확인 <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 3. Secondary dynamic recommendations (Two cards grid) */}
      <div className="space-y-4">
        <h4 className="text-[15px] font-bold text-slate-700 select-none">
          💡 함께 살펴보면 유용한 대안 보장 옵션
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restPicks.map((ins) => {
            const isSaved = savedInsuranceIds.includes(ins.id);
            return (
              <div
                key={ins.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between ${ins.bgColor} shadow-sm hover:shadow-md transition-all`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{ins.emoji}</span>
                      <div>
                        <span className="text-[10px] text-gray-500 font-bold block">{ins.company}</span>
                        <h6 className="text-[15px] font-bold text-gray-900 leading-tight">{ins.name}</h6>
                      </div>
                    </div>
                    <span className="text-xs bg-white/70 px-2 py-0.5 rounded-full font-bold text-gray-600">
                      {ins.type === 'budget' ? '알뜰형' : ins.type === 'premium' ? '최고형' : '균형형'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {ins.description}
                  </p>

                  <div className="space-y-1 bg-white/40 rounded-xl p-3 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">통원 및 수술배상:</span>
                      <span className="font-bold">{ins.reimbursementRatio}% 보상</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">평균 월보험료:</span>
                      <span className="font-bold text-gray-950">{formatCurrency(ins.averagePremium)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">핵심 가입혜택:</span>
                      <span className="font-bold text-orange-800 text-[10px] truncate max-w-[200px]">
                        {ins.specialCoverages[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex gap-2">
                  <button
                    id={`save-alternative-${ins.id}`}
                    onClick={() => handleSaveToCabinet(ins.id)}
                    disabled={isSaved}
                    className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      isSaved
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {isSaved ? '보관됨 💼' : '보험고 보관'}
                  </button>
                  <a
                    href={ins.link}
                    target="_blank"
                    rel="noreferrer referrer"
                    className="px-3 py-2 rounded-lg bg-gray-900/5 hover:bg-gray-900/10 text-gray-800 font-medium text-xs transition-all flex items-center justify-center gap-0.5"
                  >
                    약관 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Complete Insurance Market View Toggle */}
      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-center">
          <button
            id="toggle-all-insurances-btn"
            onClick={() => setShowAllInsurances(!showAllInsurances)}
            className="px-6 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.01]"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            {showAllInsurances ? '상세 분석 추천 페이지 보러 가기' : '대한민국 전체 펫보험 요약비교서 보기'}
          </button>
        </div>

        {/* Beautiful Expandable Master Compare Table */}
        <AnimatePresence>
          {showAllInsurances && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 overflow-hidden"
            >
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <h5 className="text-[15px] font-bold text-gray-800">
                      📊 대한민국 펫보험 전체 라인업 실물비교
                    </h5>
                    <p className="text-[11px] text-gray-400">
                      각 보험사에서 제공하는 다이렉트 대표 상품 요율입니다. (아이 연령수준에 따라 변동 가능)
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">가정용 Excel 등록용 원자료 데이터제공</span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-100">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 border-b border-gray-100">
                        <th className="p-3 font-bold">보험사 / 상품명</th>
                        <th className="p-3 font-bold">월 평균료</th>
                        <th className="p-3 font-bold">보상비율</th>
                        <th className="p-3 font-bold">자부담금</th>
                        <th className="p-3 font-bold">주요 특장점</th>
                        <th className="p-3 font-bold text-right" style={{ width: '80px' }}>보관</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {KoreanPetInsurances.map((ins) => {
                        const isSaved = savedInsuranceIds.includes(ins.id);
                        return (
                          <tr key={ins.id} className="hover:bg-gray-50/50 transition-all text-gray-700">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{ins.emoji}</span>
                                <div>
                                  <span className="text-[10px] text-gray-400 block font-medium">{ins.company}</span>
                                  <span className="font-bold text-gray-900">{ins.name}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 font-mono font-bold text-gray-800">{formatCurrency(ins.averagePremium)}</td>
                            <td className="p-3 font-medium">{ins.reimbursementRatio}% 실손</td>
                            <td className="p-3 font-medium font-mono text-gray-500">{ins.deductible / 10000}만원</td>
                            <td className="p-3 max-w-[280px]">
                              <p className="truncate text-gray-500" title={ins.description}>
                                {ins.description}
                              </p>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                id={`table-save-${ins.id}`}
                                onClick={() => handleSaveToCabinet(ins.id)}
                                disabled={isSaved}
                                className={`text-[10px] py-1.5 px-2.5 rounded font-bold transition-all block w-full text-center ${
                                  isSaved
                                    ? 'bg-orange-50 text-orange-600 cursor-not-allowed'
                                    : 'bg-orange-500 text-white hover:bg-orange-600 cursor-pointer'
                                }`}
                              >
                                {isSaved ? '보관중' : '넣기'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating alert when saved */}
      <AnimatePresence>
        {justSavedId && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-800"
          >
            <div className="bg-orange-500 rounded-full h-5 w-5 flex items-center justify-center text-xs">💼</div>
            <span className="text-xs font-bold font-sans">
              선택한 펫보험을 [보관창고 서랍]에 안심해 저장했개!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
