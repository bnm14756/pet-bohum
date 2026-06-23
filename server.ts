import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured. Please add it in Settings > Secrets.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 2. API: AI Advisor Chat Route
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, petProfile } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array is required' });
    }

    // Get active AI client
    const ai = getAiClient();

    // Context instructions with insurance products
    const petInfoString = petProfile 
      ? `[반려동물 정보] 이름: ${petProfile.name}, 분류: ${petProfile.type === 'dog' ? '강아지' : '고양이'}, 품종: ${petProfile.breed}, 나이: ${petProfile.age}살, 성별/성격: ${petProfile.gender}, 주요건강고민: ${petProfile.concerns.join(', ')}, 선호유형: ${petProfile.policyPreference}`
      : '반려동물 정보 없음 (새로운 반려동물 등록 대기 중)';

    const systemInstruction = `
너는 대한민국 최고의 반려동물 보험(펫보험) 전문 상담 서비스인 '우리아이 펫보험 전문 상담사 댕냥이'야.
보호자에게 반려동물 건강 상태나 예산에 최적인 펫보험 상품을 친절하게, 전문적으로 설명해주고 펫보험의 필요성을 짚어줘야 해.

아래는 대한민국 주요 펫보험 상품 데이터베이스야. 이 외의 임의의 상품을 거짓으로 설명하지 마:
1. 메리츠화재 펫퍼민트 Puppy&Dog: 강아지 전용, 높은 보상액, 제휴병원 원스톱 즉시 청구 장점 (월 평균 약 4.8만원)
2. 메리츠화재 펫퍼민트 Cat: 고양이 전용, 비뇨기계/복막염 특화, 제휴병원 자동 청구 장점 (월 평균 약 3.9만원)
3. DB손해보험 프로미 반려동물보험: 치과치료/스케일링 보장, 뛰어난 가성비 (월 평균 약 3.5만원)
4. 삼성화재 위풍댕댕: 최고 보상 한도(90%), 고액 병원비 보장, 대형견 및 슬개골 수리비용 보장 우수 (월 평균 약 6.2만원)
5. KB손해보험 KB 금쪽같은 펫보험: 행동 교정 치료비 기본 포함, 실속 장례비 지원, 다둥이 할인 (월 평균 약 4.5만원)
6. 현대해상 하이펫 반려동물 안심보험: 소형견 슬개골 및 관절 집중 강화, 유기견 입양 전용 10% 추가 할인 (월 평균 약 5.5만원)
7. 한화손해보험 다이렉트 펫안심플러스: 월 2만원대 초실속형 골절 및 중대수술 핵심 보장 (월 평균 약 2.9만원)

[현재 상담중인 보호자의 애완동물 정보]:
${petInfoString}

[상담 가이드라인]:
- 말투는 친근하고 따뜻한 어투를 쓰되 전문가다운 단단함과 품위를 가질 것. 한국어 경어가 정중해야 해. 귀여운 '멍!' 이나 '야옹~' 같은 접미사를 적당히 섞으면 더 매력적이야(과도하지 않게 한 답변당 2~3회만 적절히 활용).
- 보호자의 반려동물 정보가 입력되어 있다면, 그 아이의 품종 특성(예: 포메라니안은 슬개골 탈구 취약, 골든 리트리버는 대형견 배상책임 및 관절 취약, 메인쿤은 비뇨기 취약 등)에 부합하는 위험 질환을 먼저 짚어주며 그에 맞는 보험을 능동적으로 짚어줘.
- '과거에는 일부 보호자만 이용하던 상품이었지만, 최근에는 보장 범위와 상품 종류가 다양해지면서 시장 규모도 함께 커지는 흐름을 보이고 있다.' 는 한국 시장 트렌드를 자연스럽게 인용하여 가입을 망설이는 보호자를 격려해줘.
- 불필요하고 근거 없는 요율 제안은 삼가고, 평균 월 부담금과 보장 범위 한도를 명확히 말해줘.
    `;

    // Process messages into Content objects style for Gemini SDK
    // Gemini SDK expects { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedContents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Use current recommended high-performance Gemini 3.5 Flash style text generation
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: formattedContents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const replyText = response.text || "죄송합니다. 답변을 생성하는 도중 오류가 발생했습니다. 다시 시도해 주세요.";
    res.json({ content: replyText });

  } catch (error: any) {
    console.error('Gemini API Error in backend chatbot:', error);
    res.status(500).json({ 
      error: '상담사 연결에 일시적인 장애가 발생했개! 비밀키나 설정을 다시 확인해 보개.',
      details: error.message 
    });
  }
});

// 3. Serve Frontend Assets & Apply Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Serve static files
    app.use(express.static(distPath));
    // Serve SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Fullstack App] Pet Insurance Hub server running on port ${PORT}`);
  });
}

startServer();
