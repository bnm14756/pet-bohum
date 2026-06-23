import React, { useState, useRef, useEffect } from 'react';
import { PetProfile } from '../types';
import { Send, Sparkles, MessageSquare, Bot, ArrowRight, Dog, ShieldAlert, BadgeAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatConsultantTabProps {
  profile: PetProfile | null;
}

export default function ChatConsultantTab({ profile }: ChatConsultantTabProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: profile 
        ? `반갑개! 🐾 우리집 펫보험 서비스의 전문 상담사 '댕냥이'다멍! 우리 사랑하는 **${profile.name}**(${profile.breed}, ${profile.age}살)를 만나서 너무 기쁘다옹! 혹시 아이의 평생 건강 보관 계획이나 가성비 슬개골/피부 보장 관련해 무엇이든 궁금한 것이 있으면 편하게 물어보개!`
        : "반갑개! 🐾 우리집 펫보험 전문 인공지능 상담사 '댕냥이'다멍! 아이의 맞춤형 건강관련 특약이나 국내 모든 펫보험 브랜드 가격에 대해 무엇이든 친절하게 가이드해줄개! 아래에서 아이의 정보를 등록하고 시작하면 더 든든하고 명확한 맞춤 보장을 답변할 수 있다옹!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Quick Question Clicks
  const handleQuickQuestion = (qn: string) => {
    if (isLoading) return;
    sendMessage(qn);
  };

  const getQuickPrompts = () => {
    if (profile) {
      return [
        `우리 ${profile.name}이 품종인 [${profile.breed}]에 특화되어 조심해야 할 질병과 설계 팁을 알려줘! 🦴`,
        `치과치료랑 아토피 스케일링까지 알짜배기로 보장해주는 회사 알려달라옹! 🦷`,
        `노령에 접어드는 펫인데 갱신 조건이랑 만기 나이를 가이드해줄개! ⏱️`,
        `의료비 실손보험이 정말 가치가 있는지 팩트체크 해줘! 💡`
      ];
    }
    return [
      "초보 집사를 위한 입문용 가성비 펫보험은 무엇이 있나옹? 🐈",
      "슬개골 탈구 수술비는 보통 어느 정도 발생하나요? 🐾",
      "미국/유럽 펫보험 보급이 꾸준히 급증하는 진짜 이유가 궁금해! 🌍",
      "가장 신뢰할 수 있는 1순위 대표 보험사를 짚어줘! 🏆"
    ];
  };

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    setErrorMessage(null);
    const updatedMessages = [...messages, { role: 'user', content: trimmed } as ChatMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages,
          petProfile: profile,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server returned an error');
      }

      setMessages([...updatedMessages, { role: 'assistant', content: data.content }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      setErrorMessage(error.message || '상담사 서버 오프라인으로 상담에 지장이 생겼개. 잠시 후 재시도해보개!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="bg-white rounded-3xl border border-orange-100 shadow-xl shadow-orange-50/50 flex flex-col h-[650px] overflow-hidden" id="chat-consultant-sec">
      {/* Tab Header inside Card */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-400 p-4.5 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 bg-white/20 rounded-2xl flex items-center justify-center font-bold text-xl relative">
            🐾
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-orange-400" />
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-tight">우리아이 펫보험고 상담사 댕냥이 💬</h4>
            <span className="text-[10px] text-orange-50 block font-mono">ONLINE ACTIVE · REALTIME BROKER</span>
          </div>
        </div>

        <span className="text-[11px] bg-white/20 px-2.5 py-1 rounded-full font-bold">
          {profile ? `🏡 ${profile.name}이 정보 연동됨` : '🐾 비회원 임시상담'}
        </span>
      </div>

      {/* 실시간 전문 상담원 전화번호 연결 Bar */}
      <div className="bg-orange-50 border-b border-orange-100 px-5 py-2.5 flex items-center justify-between text-xs text-orange-950 select-none">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="font-medium">실시간 전문 상담원 무료 가이드</span>
        </div>
        <div className="flex items-center gap-1.5 font-bold">
          <span>📞 상담원 연결:</span>
          <a href="tel:010-1234-5678" className="bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1 rounded-xl text-[11px] font-mono shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all">
            010-1234-5678
          </a>
        </div>
      </div>

      {/* Messages Scrolling Panel */}
      <div className="flex-1 p-5 overflow-y-auto bg-slate-50/50 space-y-4">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            {m.role !== 'user' && (
              <div className="h-8 w-8 rounded-xl bg-orange-100/80 text-orange-850 flex items-center justify-center font-bold text-sm shrink-0 border border-orange-200/55 select-none text-center">
                🦁
              </div>
            )}
            <div
              className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-orange-500 text-white font-medium rounded-tr-none shadow-sm'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
              }`}
            >
              {m.content.split('\n').map((line, lidx) => (
                <p key={lidx} className={lidx > 0 ? 'mt-1' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2.5 max-w-[80%]">
            <div className="h-8 w-8 rounded-xl bg-orange-100 text-orange-850 flex items-center justify-center font-bold text-sm shrink-0 border border-orange-200 select-none text-center animate-bounce">
              🐾
            </div>
            <div className="bg-white border border-gray-100 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">잠시만 기다려주세요..</span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 flex gap-2.5 items-start max-w-lg mx-auto text-rose-950 shadow-sm animate-shake">
            <BadgeAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold">⚠️ 상담 도우미 가동 대기</span>
              <p className="leading-relaxed opacity-90">
                {errorMessage}
              </p>
              <div className="text-[10px] text-rose-800 mt-2 p-1.5 bg-rose-100/50 rounded-lg">
                정상적인 인공지능 상담챗을 위해서는 화면 오른쪽 위의 <b>Settings(환경설정) &gt; Secrets</b> 메뉴를 열고, 
                <b>GEMINI_API_KEY</b> 항목에 유효한 구글 API 비밀키를 입력해주셔야 실시간 대화 및 상담이 활성화되개!
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Area */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-left">
        <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider block mb-2 select-none">
          ⚡ 댕냥이 추천 쾌속 질의 질문지
        </span>
        <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 max-h-[85px]">
          {getQuickPrompts().map((qn, index) => (
            <button
              id={`quick-question-${index}`}
              key={index}
              disabled={isLoading}
              onClick={() => handleQuickQuestion(qn)}
              className="text-[10px] font-medium bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-full px-3 py-1.5 text-gray-700 hover:text-orange-950 transition-all text-left whitespace-nowrap cursor-pointer hover:scale-[1.01]"
            >
              {qn}
            </button>
          ))}
        </div>
      </div>

      {/* Input Message Area */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          id="chat-user-input"
          type="text"
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder="아이의 연령대나, 평생 병원비 등 궁금한 것을 입력하개..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-orange-500/10 focus:border-orange-500 focus:outline-none transition-all text-gray-800"
        />
        <button
          id="chat-send-btn"
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-3 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 active:scale-95 disabled:from-gray-300 disabled:to-gray-300 disabled:scale-100 text-white rounded-xl font-bold cursor-pointer transition-all shadow-md shadow-orange-500/10 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
