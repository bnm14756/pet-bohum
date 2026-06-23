export interface PetProfile {
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: number;
  gender: 'male' | 'female' | 'neutered-male' | 'neutered-female';
  hasPreExisting: boolean;
  preExistingDetail: string;
  concerns: string[]; // ['joints', 'skin', 'teeth', 'digestive', 'eyes', 'general']
  policyPreference: 'budget' | 'balanced' | 'premium';
}

export interface PetInsurance {
  id: string;
  company: string;
  name: string;
  type: 'budget' | 'balanced' | 'premium';
  targetBreed: 'all' | 'dog-only' | 'cat-only';
  ageLimitMax: number;
  averagePremium: number; // 월 평균 보험료 (KRW)
  reimbursementRatio: number; // 보상 비율: 70%, 80%, 90%
  deductible: number; // 자기부담금: 1만원, 2만원, 3만원
  compensationLimit: string; // "1일 15만원 / 연간 500만원"
  specialCoverages: string[]; // 특약 정보
  strengths: string[]; // 강점/추천이유
  bgColor: string; // Tailwind background style or hex
  borderColor: string;
  textColor: string;
  emoji: string;
  description: string;
  link: string;
}

export interface UserSavedPolicy {
  id: string;
  petName: string;
  insuranceId: string;
  startDate: string;
  status: 'active' | 'pending' | 'expired';
  customNotes?: string;
}

export interface MarketMetric {
  year: number;
  penetrationRate: number; // 가입률 (%)
  marketSizeBillions: number; // 시장 규모 (십억원)
  averageAnnualMedicalCost: number; // 연평균 반려동물 의료비 (만원)
}
