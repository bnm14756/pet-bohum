import React, { useState, useTransition } from 'react';
import { PetProfile } from '../types';
import { PetBreedsBySpecies } from '../data/insuranceData';
import { Sparkles, Heart, Activity, Check, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PetProfileFormProps {
  onSave: (profile: PetProfile) => void;
  initialProfile?: PetProfile | null;
}

export default function PetProfileForm({ onSave, initialProfile }: PetProfileFormProps) {
  const [name, setName] = useState(initialProfile?.name || '');
  const [type, setType] = useState<PetProfile['type']>(initialProfile?.type || 'dog');
  const [breed, setBreed] = useState(initialProfile?.breed || '');
  const [age, setAge] = useState<number>(initialProfile?.age || 2);
  const [gender, setGender] = useState<PetProfile['gender']>(initialProfile?.gender || 'neutered-male');
  const [hasPreExisting, setHasPreExisting] = useState(initialProfile?.hasPreExisting || false);
  const [preExistingDetail, setPreExistingDetail] = useState(initialProfile?.preExistingDetail || '');
  const [concerns, setConcerns] = useState<string[]>(initialProfile?.concerns || []);
  const [policyPreference, setPolicyPreference] = useState<PetProfile['policyPreference']>(initialProfile?.policyPreference || 'balanced');

  const [isError, setIsError] = useState(false);
  const [, startTransition] = useTransition();

  const handleConcernToggle = (concern: string) => {
    if (concerns.includes(concern)) {
      setConcerns(concerns.filter(c => c !== concern));
    } else {
      setConcerns([...concerns, concern]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed) {
      setIsError(true);
      return;
    }
    setIsError(false);

    const profile: PetProfile = {
      name,
      type,
      breed,
      age,
      gender,
      hasPreExisting,
      preExistingDetail: hasPreExisting ? preExistingDetail : '',
      concerns: concerns.length > 0 ? concerns : ['general'],
      policyPreference,
    };

    onSave(profile);
  };

  const breedOptions = PetBreedsBySpecies[type];

  const concernOptions = [
    { value: 'joints', label: '🦴 슬개골 & 고관절', desc: '소형견 다빈도 관절 탈구 수술대비' },
    { value: 'skin', label: '🧪 아토피 & 피부질환', desc: '만성 피부 가려움증, 약값 고액 발생' },
    { value: 'teeth', label: '🦷 치과치료 & 스케일링', desc: '노령화 시 유독 흔한 잇몸 염증 대비' },
    { value: 'digestive', label: '🍱 만성 위염 & 구토', desc: '헤어볼이나 소화불량, 장염 잦음' },
    { value: 'eyes', label: '👁️ 백내장 & 안구질환', desc: '품종견 특화 안질환 집중 치료안심' },
    { value: 'general', label: '🩹 종합 일상 상해', desc: '골절, 감기, 예방 접종 후 알레르기 등' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-50/50 p-6 md:p-8 max-w-2xl mx-auto"
      id="pet-onboarding-card"
    >
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 text-orange-600 font-medium text-xs font-mono uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" /> step 1 . 아이 정보 보관함에 등록하기
        </span>
        <h2 className="text-2xl font-sans font-bold text-gray-800 tracking-tight">
          아이의 정보를 알려주세요! 😊
        </h2>
        <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
          우리 소중한 아이의 데이터를 근거로 꼭 맞고 든든한 맞춤형 보험 혜택을 찾아 드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selector (Dog/Cat) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 text-left">
            반려동물 종류
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              id="select-dog-btn"
              type="button"
              onClick={() => {
                setType('dog');
                setBreed('');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                type === 'dog'
                  ? 'border-orange-500 bg-orange-50/40 text-orange-900 shadow-sm'
                  : 'border-gray-100 hover:border-gray-200 text-gray-500 bg-gray-50/20'
              }`}
            >
              <span className="text-4xl mb-2">🐕</span>
              <span className="font-semibold text-sm">강아지</span>
            </button>
            <button
              id="select-cat-btn"
              type="button"
              onClick={() => {
                setType('cat');
                setBreed('');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                type === 'cat'
                  ? 'border-orange-500 bg-orange-50/40 text-orange-900 shadow-sm'
                  : 'border-gray-100 hover:border-gray-200 text-gray-500 bg-gray-50/20'
              }`}
            >
              <span className="text-4xl mb-2">🐈</span>
              <span className="font-semibold text-sm">고양이</span>
            </button>
            <button
              id="select-other-btn"
              type="button"
              onClick={() => {
                setType('other');
                setBreed('');
              }}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${
                type === 'other'
                  ? 'border-orange-500 bg-orange-50/40 text-orange-900 shadow-sm'
                  : 'border-gray-100 hover:border-gray-200 text-gray-500 bg-gray-50/20'
              }`}
            >
              <span className="text-4xl mb-2">🐹</span>
              <span className="font-semibold text-sm">기타</span>
            </button>
          </div>
        </div>

        {/* Name and Breed Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pet-name-input" className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              이름
            </label>
            <input
              id="pet-name-input"
              type="text"
              placeholder="예: 초코, 냥이"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (isError) setIsError(false);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-800"
            />
          </div>
          <div>
            <label htmlFor="pet-breed-select" className="block text-sm font-semibold text-gray-700 mb-2 text-left">
              품종
            </label>
            <select
              id="pet-breed-select"
              value={breed}
              onChange={(e) => {
                setBreed(e.target.value);
                if (isError) setIsError(false);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-gray-800"
            >
              <option value="">품종을 선택해 주세요</option>
              {breedOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Age Indicator */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="pet-age-slider" className="text-sm font-semibold text-gray-700">
              아이 나이
            </label>
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
              {age}살 {age === 0 ? '(생후 수개월)' : age >= 10 ? '(노령기 장고펫)' : '(성장 청년펫)'}
            </span>
          </div>
          <input
            id="pet-age-slider"
            type="range"
            min="0"
            max="20"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
            <span>0세</span>
            <span>5세</span>
            <span>10세 (노령기 입문)</span>
            <span>15세</span>
            <span>20세</span>
          </div>
        </div>

        {/* Gender / Neutralization */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
            성별 및 중성화 여부
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'male', label: '남아 ♂' },
              { id: 'female', label: '여아 ♀' },
              { id: 'neutered-male', label: '중성 남아 ♂' },
              { id: 'neutered-female', label: '중성 여아 ♀' }
            ].map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGender(g.id as any)}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  gender === g.id
                    ? 'border-orange-500 bg-orange-50/50 text-orange-900 font-semibold'
                    : 'border-gray-100 bg-gray-50/30 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Special Concerns (Crucial mapping) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
            특별히 걱정되는 건강 부위 (중복 선택)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {concernOptions.map((opt) => {
              const checked = concerns.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleConcernToggle(opt.value)}
                  className={`flex items-start text-left p-2.5 rounded-xl border transition-all ${
                    checked
                      ? 'border-orange-500/80 bg-orange-50/20 text-orange-950 font-medium'
                      : 'border-gray-100 bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className={`mt-0.5 mr-2 rounded h-4 w-4 flex items-center justify-center border transition-all ${
                    checked ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 bg-white'
                  }`}>
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">{opt.label}</span>
                    <span className="text-[10px] text-gray-400 font-sans block mt-0.5">{opt.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Existing condition */}
        <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 ">
              <ShieldAlert className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-semibold text-gray-800">
                현재 앓고 있거나 치료 중인 질환이 있나요?
              </span>
            </div>
            <button
              id="ext-illness-toggle"
              type="button"
              onClick={() => {
                setHasPreExisting(!hasPreExisting);
                if (!hasPreExisting) setPreExistingDetail('');
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-all duration-200 ease-in-out ${
                hasPreExisting ? 'bg-orange-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  hasPreExisting ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
          {hasPreExisting && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3"
            >
              <textarea
                placeholder="질병명, 수술기록, 투약 내용 등을 가볍게 적어주세요. (인공지능 상담 매칭 시 최우선 반영)"
                value={preExistingDetail}
                onChange={(e) => setPreExistingDetail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500/15 focus:border-orange-500 text-xs text-gray-700 bg-white resize-none"
                rows={2}
              />
            </motion.div>
          )}
        </div>

        {/* Budget Preference */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">
            희망 보험료 / 보장 선호형태
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'budget', label: '가성비 알뜰형 💰', desc: '월 2~3만원대 핵심 수술대비' },
              { id: 'balanced', label: '밸런스 정밀형 ⚖️', desc: '월 4~5만원대 평균 보장성' },
              { id: 'premium', label: '안심 최고형 🌟', desc: '월 6만원대+ 최대90% 실손환원' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPolicyPreference(p.id as any)}
                className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all ${
                  policyPreference === p.id
                    ? 'border-orange-500 bg-orange-50/30 text-orange-950 font-bold'
                    : 'border-gray-100 bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="text-xs font-bold block">{p.label}</span>
                <span className="text-[9px] text-gray-400 mt-1 leading-snug">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {isError && (
          <p className="text-xs text-red-500 text-center font-medium">
            ⚠️ 아이의 이름과 품종을 정확하게 선택 및 입력해 주세요!
          </p>
        )}

        <button
          id="profile-submit-btn"
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold text-center text-sm shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99]"
        >
          <Activity className="w-4 h-4 animate-pulse" /> 보험 확인하기 🐾
        </button>
      </form>
    </motion.div>
  );
}
