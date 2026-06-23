import { useState } from 'react';
import { PetProfile, PetInsurance, UserSavedPolicy } from '../types';
import { KoreanPetInsurances } from '../data/insuranceData';
import { Download, FileSpreadsheet, Trash2, Calendar, Edit3, Save, EggOff, Plus, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface CabinetTabProps {
  profile: PetProfile | null;
  savedPolicies: UserSavedPolicy[];
  onRemovePolicy: (policyId: string) => void;
  onUpdatePolicyNote: (policyId: string, notes: string) => void;
  onResetAll: () => void;
  onNavigateToForm: () => void;
}

export default function CabinetTab({
  profile,
  savedPolicies,
  onRemovePolicy,
  onUpdatePolicyNote,
  onResetAll,
  onNavigateToForm,
}: CabinetTabProps) {
  const [editingPolicyId, setEditingPolicyId] = useState<string | null>(null);
  const [editingNote, setEditingNote] = useState('');

  const getInsuranceDetails = (id: string): PetInsurance | undefined => {
    return KoreanPetInsurances.find(ins => ins.id === id);
  };

  const handleStartEdit = (policyId: string, currentNote: string) => {
    setEditingPolicyId(policyId);
    setEditingNote(currentNote);
  };

  const handleSaveNote = (policyId: string) => {
    onUpdatePolicyNote(policyId, editingNote);
    setEditingPolicyId(null);
  };

  // 📥 Function to generate and download Google Sheets Compatible CSV
  const handleDownloadCSV = () => {
    if (!profile) return;

    let csvContent = '\uFEFF'; // UTF-8 BOM for Korean Excel compatibility
    csvContent += '구분,데이터 정보,상세 내용\n';
    csvContent += `반려동물 이름,${profile.name},\n`;
    csvContent += `동물구분,${profile.type === 'dog' ? '강아지' : profile.type === 'cat' ? '고양이' : '기타'},\n`;
    csvContent += `품종,${profile.breed},\n`;
    csvContent += `나이,${profile.age}살,\n`;
    csvContent += `성별수술,${profile.gender},\n`;
    csvContent += `기존질환여부,${profile.hasPreExisting ? '있음' : '없음'},\n`;
    csvContent += `기존질환내용,${profile.hasPreExisting ? profile.preExistingDetail.replace(/,/g, ' ') : ''},\n`;
    csvContent += `선호보험종류,${profile.policyPreference},\n`;
    csvContent += '\n보관중인 펫보험 목록,,,\n';
    csvContent += '보험회사,상품명,보상비율(%),자기부담금(원),예상월화비(원),가입일자,메모사항\n';

    savedPolicies.forEach((p) => {
      const ins = getInsuranceDetails(p.insuranceId);
      if (ins) {
        csvContent += `${ins.company},${ins.name.replace(/,/g, ' ')},${ins.reimbursementRatio},${ins.deductible},${ins.averagePremium},${p.startDate},${(p.customNotes || '').replace(/,/g, ' ')}\n`;
      }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${profile.name}_우리집_펫보험고_리포트.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalMonthlyPremium = savedPolicies.reduce((acc, curr) => {
    const ins = getInsuranceDetails(curr.insuranceId);
    return acc + (ins ? ins.averagePremium : 0);
  }, 0);

  if (!profile) {
    return (
      <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-12 text-center max-w-xl mx-auto space-y-4">
        <div className="text-5xl">🥚</div>
        <h4 className="text-lg font-bold text-gray-800">아직 등록된 펫 정보가 없개!</h4>
        <p className="text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
          우리집 소중한 아이의 정보를 먼저 보관함에 등록해 주세요. 가장 알맞은 펫 보장과 보험 상품을 비교해 보여드립니다.
        </p>
        <button
          onClick={onNavigateToForm}
          className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all cursor-pointer shadow-sm shadow-orange-500/20"
        >
          아이 등록하러 가기 🐾
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in" id="cabinet-sec">
      {/* Upper Cards: Pet Cabinet Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card: Refrigerator Pet Card */}
        <div className="md:col-span-1 bg-gradient-to-br from-orange-400 to-amber-400 rounded-3xl p-6 text-white shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 font-bold tracking-wider">
                PET INSURANCE LIST 🟢
              </span>
              <span className="text-2xl">{profile.type === 'dog' ? '🐕' : profile.type === 'cat' ? '🐈' : '🐹'}</span>
            </div>
            <div>
              <p className="text-xs text-orange-100 font-medium">우리집 사랑둥이</p>
              <h4 className="text-3xl font-black tracking-tight">{profile.name}</h4>
              <p className="text-xs font-mono mt-1 opacity-90">{profile.breed} · {profile.age}살</p>
            </div>
          </div>

          <div className="bg-black/10 rounded-2xl p-3 text-xs space-y-1">
            <div className="flex justify-between text-[11px] opacity-90">
              <span>중성화 상태:</span>
              <span className="font-bold">{profile.gender}</span>
            </div>
            <div className="flex justify-between text-[11px] opacity-90">
              <span>기존 만성질환:</span>
              <span className="font-bold">{profile.hasPreExisting ? '있음' : '사고무'}</span>
            </div>
          </div>
        </div>

        {/* Right Card: Insurance Overview Stats */}
        <div className="md:col-span-2 bg-white rounded-3xl border border-orange-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h5 className="font-bold text-gray-800 text-sm">🏡 우리집 펫보험 안심보관 현황</h5>
              <button
                id="reset-cabinet-btn"
                onClick={onResetAll}
                className="text-[10px] text-gray-400 hover:text-red-500 font-medium cursor-pointer"
              >
                초기화하고 다시 입력
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-orange-50/50 rounded-2xl p-4 text-center border border-orange-100/30">
                <span className="text-[10px] text-gray-400 font-bold block">보관 보장수</span>
                <span className="text-3xl font-black text-orange-600 mt-1 block">
                  {savedPolicies.length} <span className="text-xs font-normal text-gray-600">개</span>
                </span>
              </div>
              <div className="bg-gray-50/70 rounded-2xl p-4 text-center border border-gray-100">
                <span className="text-[10px] text-gray-400 font-bold block">총 예상 월납입금</span>
                <span className="text-2xl font-black text-gray-800 mt-1 block">
                  {new Intl.NumberFormat('ko-KR').format(totalMonthlyPremium)}{' '}
                  <span className="text-xs font-normal text-gray-500">원</span>
                </span>
              </div>
            </div>
          </div>

          {savedPolicies.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-[10px] text-gray-400">
                아래 버튼을 누르면 이 자산 목록을 구글 스프레드시트용 CSV로 내려받습니다!
              </div>
              <button
                id="download-csv-btn"
                onClick={handleDownloadCSV}
                className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all cursor-pointer shadow-sm shadow-emerald-600/10 shrink-0"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Google Sheets 백업 다운로드 📥
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stored Insurance List */}
      <div className="space-y-4">
        <h4 className="text-[15px] font-bold text-gray-800 select-none">
          📦 보관 서랍에 안심 저장된 보험 상품 ({savedPolicies.length})
        </h4>

        {savedPolicies.length === 0 ? (
          <div className="bg-gray-50/40 rounded-3xl border border-gray-100 p-10 text-center text-gray-500 text-xs">
            보관함이 비어있개! <br />
            [추천 펫보험] 탭에서 원하는 핵심 보장팩의 <b>'우리집 보험고에 보관하기'</b> 버튼을 콕 누르면 이 서랍에 차곡차곡 쌓입니다.
          </div>
        ) : (
          <div className="space-y-3">
            {savedPolicies.map((p) => {
              const ins = getInsuranceDetails(p.insuranceId);
              if (!ins) return null;

              const isEditing = editingPolicyId === p.id;

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-3xl bg-gray-50 p-2 rounded-xl">{ins.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-500">{ins.company}</span>
                        <span className="py-0.5 px-1.5 rounded-full bg-slate-100 text-[9px] text-slate-500 font-semibold font-mono">
                          ACTIVE 🟢
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-gray-900 mt-0.5">{ins.name}</h5>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        월 보험비: <b>{new Intl.NumberFormat('ko-KR').format(ins.averagePremium)}원</b> · 보상률 {ins.reimbursementRatio}% · 자부담 일{ins.deductible / 10000}만원
                      </span>
                    </div>
                  </div>

                  {/* Date and Custom Memo Section */}
                  <div className="flex-1 md:max-w-md bg-gray-50/50 rounded-xl p-3 text-xs text-gray-700 flex flex-col gap-1.5 border border-gray-100">
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      <span className="flex items-center gap-1 font-semibold text-[10px]">
                        <Calendar className="w-3 h-3 text-gray-400" /> 보관 시작일자: {p.startDate}
                      </span>
                      {!isEditing && (
                        <button
                          id={`edit-notes-btn-${p.id}`}
                          onClick={() => handleStartEdit(p.id, p.customNotes || '')}
                          className="text-orange-600 font-bold hover:underline flex items-center gap-0.5 cursor-pointer text-[10px]"
                        >
                          <Edit3 className="w-2.5 h-2.5" /> 메모 수정
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="flex gap-1.5 mt-1">
                        <input
                          id={`note-input-${p.id}`}
                          type="text"
                          value={editingNote}
                          placeholder="특약 가입 내용, 갱신 주기 등을 기록해 보세요."
                          onChange={(e) => setEditingNote(e.target.value)}
                          className="flex-1 px-2 py-1 borders border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none bg-white text-gray-800"
                        />
                        <button
                          id={`save-note-btn-${p.id}`}
                          onClick={() => handleSaveNote(p.id)}
                          className="px-2.5 py-1 bg-gray-900 text-white rounded-lg font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                        >
                          <Check className="w-3 h-3" /> 저장
                        </button>
                      </div>
                    ) : (
                      <p className="text-[11px] text-gray-600 font-sans italic mt-1 bg-white p-1.5 rounded border border-gray-100/30">
                        {p.customNotes ? `📝 ${p.customNotes}` : '작성된 관리 메모가 없개. 메모로 특이 사항을 기록해보개!'}
                      </p>
                    )}
                  </div>

                  {/* Remove Button */}
                  <div className="flex justify-end shrink-0">
                    <button
                      id={`remove-policy-btn-${p.id}`}
                      onClick={() => onRemovePolicy(p.id)}
                      className="p-2.5 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                      title="보관함에서 비우기"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Spreadsheet Integration Guide */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 text-xs text-slate-600 space-y-2">
        <h6 className="font-bold text-slate-800 flex items-center gap-1">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> 구글 스프레드시트(Google Sheets) 200% 활용하는 법
        </h6>
        <p className="leading-relaxed">
          내려받으신 <b>CSV 파일</b>은 구글 스프레드시트의 <b>파일 &gt; 가져오기</b> 메뉴를 통해 한 번에 시트에 등록 후 관리하실 수 있습니다.
          시트로 연동하여 온가족이 펫 보험 갱신 시기와 비용 목록을 함께 공유하고, 지출 가계부 대시보드를 직접 설계해 보세요!
        </p>
      </div>
    </div>
  );
}
