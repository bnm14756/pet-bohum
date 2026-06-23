import { PetInsurance, MarketMetric, PetProfile } from '../types';

export const KoreanPetInsurances: PetInsurance[] = [
  {
    id: 'meritz-puppydog',
    company: '메리츠화재',
    name: '펫퍼민트 Puppy&Dog 보험',
    type: 'balanced',
    targetBreed: 'dog-only',
    ageLimitMax: 10,
    averagePremium: 48000,
    reimbursementRatio: 80,
    deductible: 10000,
    compensationLimit: '통원 하루 최대 15만원 / 수술 1회 150만원 / 연간 1,500만원 한도',
    specialCoverages: ['슬개골 및 고관절 탈구 보장 (기본 포함)', '피부 및 구강 질환 확대 보장', '반려동물 의료비 다이렉트 청구 서비스 (동물병원 현장 청구)'],
    strengths: ['업계 최장 통원 및 수술 연간 한도', '전국 제휴 동물병원에서 원스톱 다이렉트 자동 청구 가능', '수십만 보호자가 선택한 압도적 가입수 1위 브랜드'],
    bgColor: 'bg-orange-50/90 border-orange-200 text-orange-900',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-900',
    emoji: '🐕',
    description: '대한민국 반려동물 보험의 표준이자 대명사. 병원에서 서류 뗄 필요 없이 모바일로 즉시 자동 청구가 가능한 극강의 편리함을 자랑합니다.',
    link: 'https://www.meritzfire.com'
  },
  {
    id: 'meritz-cat',
    company: '메리츠화재',
    name: '펫퍼민트 Cat 보험',
    type: 'balanced',
    targetBreed: 'cat-only',
    ageLimitMax: 10,
    averagePremium: 39000,
    reimbursementRatio: 80,
    deductible: 10000,
    compensationLimit: '통원 하루 최대 15만원 / 수술 1회 150만원 / 연간 1,500만원 한도',
    specialCoverages: ['고양이 다빈도 질환(비뇨기 질환, 복막염) 기본 보장', '피부 질환 및 헤어볼 치료 보장', '제휴 동물병원 현장 청구'],
    strengths: ['고양이 행동 치료 및 요로결석 집중 보장', '복잡한 서류 없이 즉석 청구 가능', '평생 갱신 가능 (만 20세까지 보장)'],
    bgColor: 'bg-amber-50/90 border-amber-200 text-amber-900',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-900',
    emoji: '🐈',
    description: '예민하고 섬세한 묘르신을 위한 맞춤 설계. 고양이 다빈도 비뇨기 질환 및 복막염 보장으로 고양이 보호자 선호도 1위 상품입니다.',
    link: 'https://www.meritzfire.com'
  },
  {
    id: 'db-promy-all',
    company: 'DB손해보험',
    name: '프로미 반려동물보험',
    type: 'budget',
    targetBreed: 'all',
    ageLimitMax: 8,
    averagePremium: 35000,
    reimbursementRatio: 70,
    deductible: 20000,
    compensationLimit: '통원 하루 최대 10만원 / 수술 1회 100만원 / 연간 1,000만원 한도',
    specialCoverages: ['반려동물 치과 치료 및 스케일링 보장', '아토피 등 피부 알레르기 수술 포함 보장', '타인 배상책임 최대 3,000만원 한도'],
    strengths: ['슬개골/피부 기본은 물론 치과 치료까지 알짜 보장', '가성비 위주의 합리적인 월 보험료 설정', '친절한 다이렉트 가입 지원 및 보험금 청구 간소화'],
    bgColor: 'bg-emerald-50/90 border-emerald-200 text-emerald-900',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-900',
    emoji: '🏠',
    description: '합리적인 비용으로 치과치료 및 스케일링까지 폭넓게 가입하고 싶은 꼼꼼한 실익형 보호자들을 위한 안성맞춤 보험입니다.',
    link: 'https://www.idb.com'
  },
  {
    id: 'samsung-wepet',
    company: '삼성화재',
    name: '위풍댕댕 반려동물보험',
    type: 'premium',
    targetBreed: 'all',
    ageLimitMax: 10,
    averagePremium: 62000,
    reimbursementRatio: 90,
    deductible: 10000,
    compensationLimit: '통원 하루 최대 30만원 / 수술 1회 250만원 / 연간 2,000만원 한도',
    specialCoverages: ['업계 최대 90% 보상 비율 제공', '견주 배상책임 사고 최대 5,000만원 무제한에 준하는 한도', '노령견 전용 맞춤형 웰빙 할인 혜택'],
    strengths: ['국내 최고 수준의 프리미엄 보장 한도', '90% 보상 비율 선택으로 자부담금 최소화 가능', '믿을 수 있는 삼성 브랜드의 압도적인 신속 자산 보상 처리'],
    bgColor: 'bg-blue-50/90 border-blue-200 text-blue-900',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-900',
    emoji: '🦁',
    description: '업계 최고 수준인 90% 보상과 풍성한 의료 실비 한도로 병원비가 어떠한 고액이어도 안심할 수 있는 국내 최상위 안심 프리미엄 프로그램입니다.',
    link: 'https://www.samsungfire.com'
  },
  {
    id: 'kb-golden-pet',
    company: 'KB손해보험',
    name: 'KB 금쪽같은 펫보험',
    type: 'balanced',
    targetBreed: 'all',
    ageLimitMax: 10,
    averagePremium: 45000,
    reimbursementRatio: 80,
    deductible: 20000,
    compensationLimit: '통원 하루 최대 15만원 / 수술 1회 150만원 / 연간 1,500만원 한도',
    specialCoverages: ['업계 최초 행동치료 (훈련사 행동 교정비) 기본 탑재', '장례 비용 및 메모리얼 서비스 실비 정산 지원', '대형견 및 특정 견종 할인 우대'],
    strengths: ['어린 시기 깨물기, 짖음 등 정서 행동 장애 치료 가능', '유골 보관함 및 추모 장례비 등 웰다잉 실용 특약', '다둥이(2마리 이상) 가입 시 추가 5% 평생 할인'],
    bgColor: 'bg-yellow-50/90 border-yellow-200 text-yellow-900',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-900',
    emoji: '⭐',
    description: '반려견의 신체 질환뿐만 아니라 마음의 상처까지! 이상 행동 교정 훈련 비용 및 따뜻한 장례 추모 지원까지 함께하는 세심한 특화 보험입니다.',
    link: 'https://www.kbinsure.co.kr'
  },
  {
    id: 'hyundai-hipet',
    company: '현대해상',
    name: '하이펫 반려동물 안심보험',
    type: 'premium',
    targetBreed: 'all',
    ageLimitMax: 9,
    averagePremium: 55000,
    reimbursementRatio: 80,
    deductible: 10000,
    compensationLimit: '통원 하루 최대 20만원 / 수술 1회 200만원 / 연간 1,500만원 한도',
    specialCoverages: ['소형견 슬개골 탈구 및 무릎 관절 보장 특약 강화', '유기견 입양 가정 10% 추가 보험료 특별 할인', '가해 사고 법률 비용 지원 수당'],
    strengths: ['슬개골/고관절 수술 시 타사 대비 낮은 자기부담 설정 가능', '유기견 입양 가정을 위한 따뜻한 사회공헌 기여 혜택', '다이렉트 간편 청구 및 카카오톡 챗봇 청구 연동'],
    bgColor: 'bg-rose-50/90 border-rose-200 text-rose-900',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-900',
    emoji: '🧁',
    description: '포메라니안, 말티즈, 푸들 등 정형외과 질질이 잦은 소형견 슬개골 탈구 특약을 최고 수준으로 강화하고 유기동물 보호 할인까지 제공하는 품격 있는 상품입니다.',
    link: 'https://www.hi.co.kr'
  },
  {
    id: 'hanwha-plusem',
    company: '한화손해보험',
    name: '한화 다이렉트 펫안심플러스',
    type: 'budget',
    targetBreed: 'all',
    ageLimitMax: 8,
    averagePremium: 29000,
    reimbursementRatio: 70,
    deductible: 30000,
    compensationLimit: '통원 하루 최대 8만원 / 수술 1회 80만원 / 연간 800만원 한도',
    specialCoverages: ['자기부담금 3만원 실속 설정으로 극도의 최저가 보장', '기초 예방 접종 완료 반려견 가입 즉시 할인', '가장 간단한 고지 항목(3가지 질문)으로 번거로운 절차 생략'],
    strengths: ['월 2만원대의 압도적 부담 없는 최경량 다이렉트 설계', '심플한 3개 질의만으로 쾌속 승인 완료', '꼭 필요한 핵심 골절/수술/배상책임만 알짜배기로 농축'],
    bgColor: 'bg-violet-50/90 border-violet-200 text-violet-900',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-900',
    emoji: '🎈',
    description: '불필요한 과다 보장을 걷어내어 월 납입금의 거품을 뺐습니다. 중대 수술과 골절 사고 등 부담스러운 거액 의료 사고 대비용 "소확행" 절약 보험입니다.',
    link: 'https://www.hanwhadirect.com'
  }
];

export const KoreanMarketMetrics: MarketMetric[] = [
  { year: 2020, penetrationRate: 0.35, marketSizeBillions: 15, averageAnnualMedicalCost: 35 },
  { year: 2021, penetrationRate: 0.55, marketSizeBillions: 21, averageAnnualMedicalCost: 40 },
  { year: 2022, penetrationRate: 0.82, marketSizeBillions: 28, averageAnnualMedicalCost: 47 },
  { year: 2023, penetrationRate: 1.10, marketSizeBillions: 39, averageAnnualMedicalCost: 55 },
  { year: 2024, penetrationRate: 1.40, marketSizeBillions: 52, averageAnnualMedicalCost: 64 },
  { year: 2025, penetrationRate: 1.95, marketSizeBillions: 78, averageAnnualMedicalCost: 73 },
  { year: 2026, penetrationRate: 2.70, marketSizeBillions: 110, averageAnnualMedicalCost: 82 } // Predicted
];

export const PetBreedsBySpecies = {
  dog: [
    '말티즈',
    '토이푸들',
    '포메라니안',
    '믹스견 (소형)',
    '치와와',
    '시츄',
    '요크셔테리어',
    '비숑프리제',
    '골든리트리버',
    '시바견',
    '믹스견 (대형)',
    '웰시코기',
    '프렌치불독',
    '기타 견종'
  ],
  cat: [
    '코리안숏헤어',
    '품종묘 믹스',
    '러시안블루',
    '페르시안',
    '샴',
    '터키쉬앙고라',
    '렉돌',
    '스코티시폴드',
    '먼치킨',
    '브리티시숏헤어',
    '기타 묘종'
  ],
  other: [
    '토끼',
    '햄스터',
    '페럿',
    '고슴도치',
    '새 (앵무새 등)',
    '파충류/도마뱀',
    '기타 소동물'
  ]
};

// Recommend a pet insurance based on profile
export function recommendInsurance(profile: PetProfile): PetInsurance[] {
  // Filter core breed target
  const filtered = KoreanPetInsurances.filter(ins => {
    if (ins.targetBreed === 'all') return true;
    if (profile.type === 'dog' && ins.targetBreed === 'dog-only') return true;
    if (profile.type === 'cat' && ins.targetBreed === 'cat-only') return true;
    return false;
  });

  // Calculate score for each
  return filtered.map(ins => {
    let score = 0;

    // Preference mapping
    if (profile.policyPreference === 'budget' && ins.type === 'budget') score += 40;
    else if (profile.policyPreference === 'balanced' && ins.type === 'balanced') score += 40;
    else if (profile.policyPreference === 'premium' && ins.type === 'premium') score += 40;
    else score += 15; // secondary

    // Health concerns mapping
    profile.concerns.forEach(concern => {
      if (concern === 'joints' && (ins.id.includes('meritz-puppy') || ins.id.includes('hyundai') || ins.id.includes('samsung'))) {
        score += 20; // These has strong joint coverage
      }
      if (concern === 'skin' && (ins.id.includes('meritz') || ins.id.includes('kb') || ins.id.includes('db'))) {
        score += 20;
      }
      if (concern === 'teeth' && ins.id.includes('db-promy')) {
        score += 30; // DB is superb for teeth
      }
      if (concern === 'general' && ins.id.includes('samsung')) {
        score += 25; // Elite limits
      }
    });

    // Age suitability
    if (profile.age >= 7) {
      if (ins.id.includes('meritz') || ins.id.includes('samsung')) {
        score += 15; // Better senior options and lifespan stability
      }
    } else {
      if (ins.type === 'budget') {
        score += 10;
      }
    }

    return { ins, score };
  })
  .sort((a, b) => b.score - a.score)
  .map(item => item.ins);
}
