import { KoreanMarketMetrics } from '../data/insuranceData';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from 'react';
import { TrendingUp, Award, Users, PlusCircle, AlertCircle, ShoppingBag, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function MarketAnalysisTab() {
  const chartData = KoreanMarketMetrics;

  const compareCountries = [
    { country: '스웨덴 🇸🇪', rate: 40, color: 'w-[40%]', desc: '설치 100년이 넘은 가장 성숙한 펫문화' },
    { country: '영국 🇬🇧', rate: 25, color: 'w-[25%]', desc: '가장 합리적이고 치밀한 정밀 약관체계' },
    { country: '일본 🇯🇵', rate: 10, color: 'w-[10%]', desc: '아시아 최초 펫의료 대중성 기여' },
    { country: '대한민국 🇰🇷 (현재)', rate: 1.4, color: 'w-[1.4%]', desc: '초기 단계이지만 세계 최고속 펫케어 시장성' },
    { country: '대한민국 🇰🇷 (2026 예상)', rate: 2.7, color: 'w-[2.7%]', desc: '정부 활성화 지원으로 보급률 대폭 급팽창' }
  ];

  return (
    <div className="space-y-8 animate-fade-in" id="market-analysis-sec">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-2xl font-sans font-bold text-gray-800 tracking-tight">
          📈 한국 및 글로벌 펫보험 시장 분석 리포트
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          국내외 펫메디컬 트렌드와 원자료 실태를 알기 쉽게 가이드합니다. 
          반려동물 의료비 부담 완화가 시장 확대를 이끌고 있습니다.
        </p>
      </div>

      {/* Bento Layout Grid of Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Insight Card A */}
        <div className="bg-white rounded-3xl border border-orange-100 p-5 shadow-sm space-y-3">
          <div className="h-9 w-9 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-gray-800">반려동물 의료비 부담 급증</h5>
          <p className="text-xs text-gray-500 leading-relaxed font-sans">
            반려동물의 가족화와 수명 증가로 인해 평균 수술비는 약 50만원에서 최고 수백만원대에 육박합니다. 
            <strong> 사전에 준비되지 못한 거액의 의료비 지출</strong>이 펫보험 가입을 이끄는 핵심 요인입니다.
          </p>
        </div>

        {/* Insight Card B */}
        <div className="bg-white rounded-3xl border border-orange-100 p-5 shadow-sm space-y-3">
          <div className="h-9 w-9 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-gray-800">미국 & 유럽 보호자 꾸준한 가입</h5>
          <p className="text-xs text-gray-500 leading-relaxed font-sans">
            미국과 유럽에서는 반려동물 양육 시 보험 가입이 보편적인 보호자의 상식으로 입증되고 있습니다. 
            의료비 고통을 사전에 청산하기 위해 신규 가입 보호자는 매년 12~15%씩 지속 증가하는 추세입니다.
          </p>
        </div>

        {/* Insight Card C */}
        <div className="bg-white rounded-3xl border border-orange-100 p-5 shadow-sm space-y-3">
          <div className="h-9 w-9 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-gray-800">보장 다변화 및 시장 확장</h5>
          <p className="text-xs text-gray-500 leading-relaxed font-sans">
            과거 단순 입통원 중심의 상품 구성에서 이제는 <strong>슬개골 탈구, 피부, 치과 가성비, 평생 갱신 가능 (만 20세까지)</strong> 등 
            보장 한도와 상품 유형이 매우 넓어지며 전체적인 시장 파이가 급속도로 활성화되고 있습니다.
          </p>
        </div>
      </div>

      {/* Double Combination Recharts Graph */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 space-y-4">
        <div>
          <h4 className="text-[15px] font-bold text-gray-800">📊 연도별 국내 펫보험 가입률 및 시장 규모 트렌드 (2020 ~ 2026)</h4>
          <p className="text-[11px] text-gray-400">시장 규모(십억원, 막대그래프)와 인구대비 보험 가입보급률(%, 꺾은선)의 고성장 웰케어 흐름</p>
        </div>

        <div className="h-80 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F5" />
              <XAxis dataKey="year" stroke="#868E96" />
              <YAxis yAxisId="left" label={{ value: '시장규모 (십억원)', angle: -90, position: 'insideLeft', offset: -5 }} stroke="#495057" />
              <YAxis yAxisId="right" orientation="right" label={{ value: '가입 보급률 (%)', angle: 90, position: 'insideRight', offset: 5 }} stroke="#E64980" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#202529', border: 'none', borderRadius: '12px', color: '#fff' }}
                formatter={(value: any, name: string) => {
                  if (name === 'penetrationRate') return [`${value}%`, '가입률'];
                  if (name === 'marketSizeBillions') return [`${value} 십억원`, '시장규모'];
                  return [value, name];
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar yAxisId="left" dataKey="marketSizeBillions" barSize={35} fill="#FFD8A8" radius={[4, 4, 0, 0]} name="국내 시장규모 (십억원)" />
              <Line yAxisId="right" type="monotone" dataKey="penetrationRate" stroke="#FF7E40" strokeWidth={3} activeDot={{ r: 8 }} name="보험 보급 가입률 (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Global & Korean Insurance Penetration Rate Benchmarking bar */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-[15px] font-bold text-gray-800">🇸🇪 글로벌 가입률 벤치마킹 및 국내 잠재력 수준</h4>
            <p className="text-[11px] text-gray-400">한국은 낮은 보급률에 비해 대단히 많은 반려동물 인구(1,500만명)을 지녀, 폭발적인 고성장 단계에 위치합니다.</p>
          </div>

          <div className="space-y-4 pt-2">
            {compareCountries.map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between items-center font-bold">
                  <span>{item.country}</span>
                  <span className="text-orange-600 font-mono">{item.rate}%</span>
                </div>
                <div className="w-full h-3.5 bg-gray-50 rounded-full overflow-hidden flex">
                  <div className={`h-full ${idx === 3 ? 'bg-orange-400 animate-pulse' : idx === 4 ? 'bg-orange-500' : 'bg-slate-300'} rounded-full transition-all duration-1000 ${item.color}`} />
                </div>
                <span className="text-[10px] text-gray-400 block">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Insights Footnote */}
      <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100/30 text-xs text-orange-950 leading-relaxed font-sans space-y-1">
        <p className="font-bold text-sm text-orange-900">
          💡 핵심 요약: 반려동물 의료비 부담이 펫허브 시장 확대를 이끌고 있습니다
        </p>
        <p className="text-orange-900/80">
          수의 의료 진료 기술 발달과 CT/MRI 대중화로 진료 단가는 급격히 상승했습니다. 
          질병 보장뿐만 아니라 평생 안녕을 정교하게 관리하는 일체형 펫허브 시장은 이미 보호자가 매일 아이의 영양을 챙기듯 삶의 소중한 필수요소이자 든든한 동반자가 되어가고 있습니다.
        </p>
      </div>
    </div>
  );
}
