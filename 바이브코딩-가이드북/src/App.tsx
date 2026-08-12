import React, { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2,
  Lock,
  Unlock,
  Copy,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  MessageSquare,
  Moon,
  Sun,
  ChevronRight,
  ChevronLeft,
  X,
  Award,
  Sparkles,
  Notebook,
  Undo
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CHAPTERS, INTRO_CONTENT } from './data';
import { Step, Chapter, StudyProgress } from './types';

const GUIDE_ACCESS_CODE = 'VIBE2026';
const GUIDE_ACCESS_STORAGE_KEY = 'vibe_guide_access_granted';
const PROGRESS_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfHO0SmTVPD-lS-EG7TBj8b8Ouxa77xgDeqbF9Zwb0tv5c0mw/viewform?usp=sharing&ouid=117591430533551523497';

export default function App() {
  // --- 1. State Setup ---
  
  // Progress tracker loaded from localStorage
  const [progress, setProgress] = useState<StudyProgress>(() => {
    const saved = localStorage.getItem('vibe_guide_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Fallback for fields
        if (!parsed.completedSteps) parsed.completedSteps = {};
        if (!parsed.currentStepIndex) parsed.currentStepIndex = {};
        if (!parsed.completedChapters) parsed.completedChapters = [];
        if (!parsed.currentChapterId) parsed.currentChapterId = 'Intro';
        if (parsed.stampsCount === undefined) parsed.stampsCount = 0;
        return parsed;
      } catch (e) {
        console.error('Error parsing progress', e);
      }
    }
    
    // Initial state
    const initialCompleted: { [key: string]: number[] } = {};
    const initialStepIdx: { [key: string]: number } = {};
    CHAPTERS.forEach(ch => {
      initialCompleted[ch.id] = [];
      initialStepIdx[ch.id] = 0;
    });

    return {
      completedSteps: initialCompleted,
      currentStepIndex: initialStepIdx,
      completedChapters: [],
      currentChapterId: 'Intro',
      stampsCount: 0
    };
  });

  // Dark Mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('vibe_guide_dark');
    return saved === 'true';
  });

  const [isAccessGranted, setIsAccessGranted] = useState<boolean>(() => {
    return localStorage.getItem(GUIDE_ACCESS_STORAGE_KEY) === 'true';
  });
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [accessError, setAccessError] = useState('');

  // Derive currentChapterId from the single source of truth (progress state)
  const currentChapterId = progress.currentChapterId ?? 'Intro';

  const setCurrentChapterId = (chId: string) => {
    setProgress(prev => {
      if (prev.currentChapterId === chId) return prev;
      return {
        ...prev,
        currentChapterId: chId
      };
    });
  };

  // UI state variables
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeHintStepId, setActiveHintStepId] = useState<string | null>(null);
  const [expandedPastStepId, setExpandedPastStepId] = useState<string | null>(null);

  // Chapter Stamp Modal celebration
  const [showStampCelebration, setShowStampCelebration] = useState<string | null>(null);

  const contentTopRef = useRef<HTMLElement | null>(null);
  const activeStepRef = useRef<HTMLDivElement | null>(null);

  const scrollToContentTop = () => {
    setTimeout(() => {
      contentTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const scrollToActiveStep = () => {
    setTimeout(() => {
      activeStepRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  // --- 2. Saving Preferences in effect ---
  useEffect(() => {
    localStorage.setItem('vibe_guide_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('vibe_guide_dark', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // --- 3. Progress helpers ---
  const activeChapter = CHAPTERS.find(ch => ch.id === currentChapterId);
  const activeStepIdx = activeChapter ? (progress.currentStepIndex[activeChapter.id] ?? 0) : 0;
  
  // Calculate total steps completed globally
  const totalStepsInBook = CHAPTERS.reduce((acc, ch) => acc + ch.steps.length, 0);
  const totalCompletedStepsCount = CHAPTERS.reduce((acc, ch) => {
    return acc + (progress.completedSteps[ch.id]?.length || 0);
  }, 0);
  const globalPercentage = Math.round((totalCompletedStepsCount / totalStepsInBook) * 100);

  // Calculate chapter level percentage
  const getChapterProgressPercent = (chId: string) => {
    const ch = CHAPTERS.find(c => c.id === chId);
    if (!ch) return 0;
    const completed = progress.completedSteps[chId]?.length || 0;
    return Math.round((completed / ch.steps.length) * 100);
  };

  const isChapterFullyCompleted = (chId: string) => {
    const ch = CHAPTERS.find(c => c.id === chId);
    if (!ch) return false;
    const completed = progress.completedSteps[chId] || [];
    return completed.length === ch.steps.length;
  };

  const isFinalChapter = (chId: string) => {
    return CHAPTERS.findIndex(c => c.id === chId) === CHAPTERS.length - 1;
  };

  // --- 4. Interactive UX handlers ---

  // Copy command to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  // Complete a step
  const handleStepComplete = (chapterId: string, stepNumber: number) => {
    const ch = CHAPTERS.find(c => c.id === chapterId);
    if (!ch) return;

    setProgress(prev => {
      const currentCompleted = prev.completedSteps[chapterId] || [];
      const updatedCompleted = currentCompleted.includes(stepNumber)
        ? currentCompleted
        : [...currentCompleted, stepNumber].sort((a, b) => a - b);

      // Advance step cursor
      const nextStepIdx = Math.min(updatedCompleted.length, ch.steps.length - 1);
      const updatedStepIndex = {
        ...prev.currentStepIndex,
        [chapterId]: nextStepIdx
      };

      // Check if this action completes the entire chapter
      let updatedCompletedChapters = [...prev.completedChapters];
      let triggeredCelebration = false;
      let stampCountIncrement = prev.stampsCount;

      if (updatedCompleted.length === ch.steps.length && !prev.completedChapters.includes(chapterId)) {
        updatedCompletedChapters.push(chapterId);
        triggeredCelebration = true;
        stampCountIncrement += 1;
      }

      const nextState = {
        ...prev,
        completedSteps: {
          ...prev.completedSteps,
          [chapterId]: updatedCompleted
        },
        currentStepIndex: updatedStepIndex,
        completedChapters: updatedCompletedChapters,
        stampsCount: stampCountIncrement
      };

      // Fire a state micro celebration
      if (triggeredCelebration) {
        setTimeout(() => {
          setShowStampCelebration(chapterId);
        }, 120);
      }

      return nextState;
    });

    // Reset temporary overlays
    setActiveHintStepId(null);
    setExpandedPastStepId(null);
    scrollToActiveStep();
  };

  // Move back to a previous step inside chapter
  const handlePrevStep = (chapterId: string) => {
    setProgress(prev => {
      const currentIdx = prev.currentStepIndex[chapterId] ?? 0;
      if (currentIdx === 0) return prev;
      return {
        ...prev,
        currentStepIndex: {
          ...prev.currentStepIndex,
          [chapterId]: currentIdx - 1
        }
      };
    });
    setExpandedPastStepId(null);
    scrollToActiveStep();
  };

  // Direct chapter bookmarks select
  const selectChapter = (chId: string) => {
    setCurrentChapterId(chId);
    setExpandedPastStepId(null);
    setActiveHintStepId(null);
    scrollToContentTop();
  };

  // Next Chapter Action
  const handleGoToNextChapter = (currentChId: string) => {
    const currentIdx = CHAPTERS.findIndex(c => c.id === currentChId);
    if (currentIdx !== -1 && currentIdx < CHAPTERS.length - 1) {
      const nextCh = CHAPTERS[currentIdx + 1];
      setCurrentChapterId(nextCh.id);
      scrollToContentTop();
    } else if (currentChId === 'Intro') {
      setCurrentChapterId('Ch1');
      scrollToContentTop();
    }
    setShowStampCelebration(null);
  };

  // Restart Entire Guide Storage
  const handleResetProgress = () => {
    if (confirm('바이브코딩 공부 기록을 비우고 가이드북 첫 장부터 다시 시작할까요?')) {
      const initialCompleted: { [key: string]: number[] } = {};
      const initialStepIdx: { [key: string]: number } = {};
      CHAPTERS.forEach(ch => {
        initialCompleted[ch.id] = [];
        initialStepIdx[ch.id] = 0;
      });

      setProgress({
        completedSteps: initialCompleted,
        currentStepIndex: initialStepIdx,
        completedChapters: [],
        currentChapterId: 'Intro',
        stampsCount: 0
      });
      setCurrentChapterId('Intro');
    }
  };

  const handleAccessSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (accessCodeInput.trim().toUpperCase() === GUIDE_ACCESS_CODE) {
      localStorage.setItem(GUIDE_ACCESS_STORAGE_KEY, 'true');
      setIsAccessGranted(true);
      setAccessError('');
      return;
    }

    setAccessError('입장 코드가 맞지 않습니다. 안내받은 코드를 다시 확인해주세요.');
  };

  if (!isAccessGranted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 font-sans flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-zinc-900 border border-[#D9D1C0] dark:border-zinc-800 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 sm:p-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <img
              src="vibe-guide-avatar.png"
              alt=""
              className="w-14 h-14 shrink-0 object-contain"
              aria-hidden="true"
            />
            <div>
              <p className="text-[10px] font-bold text-[#3B82F6] dark:text-blue-400 uppercase tracking-widest">VIBE BOOK</p>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">바이브코딩 가이드북</h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">안내받은 입장 코드를 입력하세요.</p>
            </div>
          </div>

          <form onSubmit={handleAccessSubmit} className="space-y-3">
            <label htmlFor="guide-access-code" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300">
              입장 코드
            </label>
            <input
              id="guide-access-code"
              value={accessCodeInput}
              onChange={(event) => {
                setAccessCodeInput(event.target.value);
                setAccessError('');
              }}
              className="w-full h-12 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 text-sm font-mono tracking-wide outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-blue-500/20"
              placeholder="입장 코드를 입력하세요"
              autoComplete="off"
            />
            {accessError && (
              <p className="text-xs text-rose-600 dark:text-rose-400 leading-relaxed">{accessError}</p>
            )}
            <button
              type="submit"
              className="w-full h-12 bg-[#3B82F6] hover:bg-blue-600 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Unlock className="w-4 h-4" />
              가이드북 입장하기
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200 font-sans antialiased pb-24 md:pb-8 flex flex-col">
      
      {/* --- UPPER DECORATIVE BINDER GRAPHIC HEADER --- */}
      <div className="bg-white/85 dark:bg-zinc-800/85 backdrop-blur border-b border-zinc-200 dark:border-zinc-700 sticky top-0 z-30 px-4 py-3 shadow-none">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => selectChapter('Intro')}
            className="flex items-center gap-2.5 text-left rounded-lg hover:bg-zinc-100/70 dark:hover:bg-zinc-700/60 px-1.5 py-1 -ml-1.5 transition-colors cursor-pointer"
            title="가이드 대문 열기"
          >
            <img
              src="vibe-guide-avatar.png"
              alt="바이브코딩 가이드북"
              className="w-10 h-10 shrink-0 object-contain"
            />
            <div>
              <h1 className="text-sm font-bold font-sans tracking-tight text-zinc-800 dark:text-blue-200 flex items-center gap-1.5">
                바이브코딩 가이드북
                <span className="text-[10px] bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 rounded font-sans font-bold leading-none">Windows 실습 가이드</span>
              </h1>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">데이터과학과 초보 전용 AI 프로젝트 가이드</p>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {/* Global progress tag */}
            <div className="hidden sm:flex items-center gap-2 bg-white/90 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1 rounded text-[11px]">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">전체 진행률</span>
              <div className="w-16 bg-zinc-200 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#3B82F6] h-full transition-all duration-300" style={{ width: `${globalPercentage}%` }} />
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-300 font-mono">{globalPercentage}%</span>
            </div>

            {/* Dark mode select */}
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 px-2.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer flex items-center gap-1 text-[11px] font-sans"
              title="화면 테마 변경"
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-zinc-400 whitespace-nowrap">라이트</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-zinc-500 whitespace-nowrap">다크</span>
                </>
              )}
            </button>

            {/* Reset storage button */}
            <button
              onClick={handleResetProgress}
              className="p-1 px-2 rounded border border-rose-200 dark:border-rose-900/30 bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 cursor-pointer flex items-center gap-1 text-[11px] font-sans"
              title="처음부터 다시 학습기록 비우기"
            >
              <Undo className="w-3 h-3" />
              <span className="hidden xs:inline">초기화</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- SPACER OFFSET --- */}
      <div className="h-6" />

      {/* --- MAIN DOUBLE OPEN PAGE WORKBOOK LAYOUT --- */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2 sm:px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* LEFT COLUMN: CHAPTER TAB INDEXES (The side bookmark stickers) */}
        <aside className="hidden lg:col-span-3 lg:flex lg:flex-col gap-2 lg:overflow-x-visible lg:pb-0 z-10 sticky top-[70px] bg-zinc-50/50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 backdrop-blur shadow-sm p-3.5 rounded-xl">
          
          <div className="hidden lg:block mb-3 px-2">
            <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-sans mb-1">가이드 목차</h3>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">원하는 장을 펼쳐보세요</p>
          </div>

          {CHAPTERS.map((ch, index) => {
            const isActive = currentChapterId === ch.id;
            const isCompleted = isChapterFullyCompleted(ch.id);
            const progressPct = getChapterProgressPercent(ch.id);

            return (
              <button
                key={ch.id}
                onClick={() => selectChapter(ch.id)}
                className={`flex flex-col gap-1 p-3 text-left rounded-lg border transition-all cursor-pointer w-full relative overflow-hidden ${
                  isActive
                    ? 'bg-[#3B82F6] border-[#3B82F6] text-white shadow-md transform -translate-y-0.5 font-bold'
                    : 'bg-white/60 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-[#3B82F6] dark:hover:border-zinc-600'
                }`}
              >
                {/* Visual completion check indicator on bookmarks */}
                {isCompleted && (
                  <div className="absolute top-1.5 right-1.5">
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 border border-[#10B981]/30 text-[#10B981] dark:text-emerald-300 px-1 rounded-sm tracking-tight font-sans font-extrabold leading-tight">완료</span>
                  </div>
                )}

                <span className="text-[10px] uppercase font-mono tracking-wider" style={{ color: isActive ? '#BFDBFE' : '#71717A' }}>
                  CHAPTER 0{index + 1}
                </span>

                <span className="font-sans font-bold text-xs leading-snug">
                  {ch.title.split('. ')[1]}
                </span>

                {/* Progress dot ribbon */}
                <div className="mt-2 flex items-center justify-between text-[9px] font-sans">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-12 h-1 rounded-full overflow-hidden ${isActive ? 'bg-white/30' : 'bg-zinc-200 dark:bg-zinc-700'}`}>
                      <div className={`h-full transition-all duration-350 ${isActive ? 'bg-white' : 'bg-[#3B82F6]'}`} style={{ width: `${progressPct}%` }} />
                    </div>
                    <span className={isActive ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}>{progressPct}%</span>
                  </div>
                  <span className={isActive ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'}>소요 {ch.duration}</span>
                </div>
              </button>
            );
          })}

          <a
            href={PROGRESS_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-3 rounded-lg border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/35 transition-colors text-xs font-sans font-bold"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              진행사항 기록하기
            </span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
          </a>

          <div className="hidden lg:block mt-6 p-3 bg-white/50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <h4 className="text-[11px] font-bold text-zinc-800 dark:text-blue-400 flex items-center gap-1 mb-1 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              막힐 때 확인할 것
            </h4>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
              오류가 나면 메시지를 그대로 복사해서 오픈채팅에 문의하세요. 어떤 단계에서 막혔는지 함께 적으면 더 정확한 도움을 받을 수 있습니다.
            </p>
          </div>
        </aside>

        {/* RIGHT COLUMN: REWRITABLE PAPER WORKSHEET SCREEN */}
        <section ref={contentTopRef} className="lg:col-span-9 scroll-mt-24">
          
          <AnimatePresence mode="wait">
            {currentChapterId === 'Intro' ? (
              
              /* --- INTRO SCREEN VIEW (Cover Book Vibe) --- */
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-zinc-800 border border-[#D9D1C0] dark:border-zinc-700 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 sm:p-8 md:p-10 relative overflow-hidden"
              >
                {/* Realistic Ruled Line Paper Graphic decoration */}
                <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-rose-500/10 dark:bg-rose-500/5 pointer-events-none" />
                
                {/* Decorative bookmark ribbon hanging down from top right */}
                <div className="absolute top-0 right-10 w-12 h-24 bg-[#3B82F6] text-white flex flex-col items-center justify-end pb-3 text-[10px] font-sans font-bold shadow-md rounded-b-md select-none transform transition-transform hover:-translate-y-1">
                  <span>VIBE</span>
                  <span>BOOK</span>
                </div>

                <div className="max-w-2xl">
                  {/* Human-centered textbook branding headers */}
                  <span className="text-xs font-semibold text-[#3B82F6] dark:text-blue-300 font-sans tracking-normal">데이터과학과 학생을 위한 실습 가이드</span>
                  
                  <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#2D4A52] dark:text-zinc-100 mt-1.5 mb-2 leading-tight">
                    {INTRO_CONTENT.title}
                  </h2>
                  
                  <p className="text-base text-[#6B655B] dark:text-zinc-300 italic font-serif border-b border-zinc-200 dark:border-zinc-700 pb-4 mb-6">
                    "{INTRO_CONTENT.subtitle}"
                  </p>

                  <div className="space-y-4 mb-8">
                    <p className="text-sm dark:text-zinc-200 leading-relaxed font-serif text-[#1A1A1A]">
                      {INTRO_CONTENT.description}
                    </p>
                    <div className="bg-[#F1EDE4] dark:bg-zinc-700/70 border-l-4 border-[#3B82F6] p-4 rounded-r-lg">
                      <h4 className="text-xs font-bold text-[#2D4A52] dark:text-blue-200 mb-1 flex items-center gap-1 font-sans">
                        <Notebook className="w-3.5 h-3.5 text-[#3B82F6]" />
                        바이브코딩(Vibe Coding)이란?
                      </h4>
                      <p className="text-xs text-[#6B655B] dark:text-zinc-200 leading-relaxed font-serif">
                        {INTRO_CONTENT.howMessage}
                      </p>
                    </div>
                  </div>

                  {/* Requirements grid styled as workbook tables */}
                  <div className="mb-8 bg-[#F1EDE4]/50 dark:bg-zinc-700/40 rounded-lg p-5 border border-[#D9D1C0] dark:border-zinc-600/60">
                    <h3 className="text-xs font-bold text-[#6B655B] dark:text-zinc-300 uppercase tracking-wider mb-3 font-sans">실습 준비 정보 및 제약사항</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-serif">
                      <div className="flex items-start gap-2.5">
                        <div className="text-blue-600 dark:text-blue-400 mt-0.5">•</div>
                        <div>
                          <p className="font-sans font-bold text-zinc-700 dark:text-zinc-300 text-[11px]">가이드 구성</p>
                          <p className="text-zinc-500 dark:text-zinc-400">{INTRO_CONTENT.metaInfo.totalChapters} 챕터</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="text-blue-600 dark:text-blue-400 mt-0.5">•</div>
                        <div>
                          <p className="font-sans font-bold text-zinc-700 dark:text-zinc-300 text-[11px]">예상 시간</p>
                          <p className="text-zinc-500 dark:text-zinc-400">{INTRO_CONTENT.metaInfo.estimatedTime}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="text-blue-600 dark:text-blue-400 mt-0.5">•</div>
                        <div>
                          <p className="font-sans font-bold text-zinc-700 dark:text-zinc-300 text-[11px]">완성 결과물</p>
                          <p className="text-zinc-500 dark:text-zinc-400">{INTRO_CONTENT.metaInfo.workspaceProject}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="text-blue-600 dark:text-blue-400 mt-0.5">•</div>
                        <div>
                          <p className="font-sans font-bold text-zinc-700 dark:text-zinc-300 text-[11px]">필수 구독</p>
                          <p className="text-zinc-500 dark:text-zinc-400">{INTRO_CONTENT.metaInfo.costRequire}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="text-blue-600 dark:text-blue-400 mt-0.5">•</div>
                        <div>
                          <p className="font-sans font-bold text-zinc-700 dark:text-zinc-300 text-[11px]">컴퓨터 사양</p>
                          <p className="text-zinc-500 dark:text-zinc-400">{INTRO_CONTENT.metaInfo.pcRecommend}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5">
                        <div className="text-blue-600 dark:text-blue-400 mt-0.5">•</div>
                        <div>
                          <p className="font-sans font-bold text-zinc-700 dark:text-zinc-300 text-[11px]">네트워크 조건</p>
                          <p className="text-zinc-500 dark:text-zinc-400">{INTRO_CONTENT.metaInfo.internetCheck}</p>
                        </div>
                      </div>
                    </div>

                    {/* Highly descriptive distinction explanation box */}
                    <div className="mt-5 border-t border-zinc-200 dark:border-zinc-700 pt-3 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                      <p className="font-bold text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1 leading-none">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        실습 저장소 구분하기
                      </p>
                      <p className="font-serif">
                        {INTRO_CONTENT.metaInfo.warningRepoCheck}
                      </p>
                      <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                        <span className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded leading-none text-[10px] select-all font-mono">
                          {INTRO_CONTENT.metaInfo.workspaceRepoUrl}
                        </span>
                        <a
                          href={INTRO_CONTENT.metaInfo.workspaceRepoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 dark:text-blue-400 flex items-center gap-0.5 hover:underline"
                        >
                          새 탭으로 확인 <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Outline List of Chapters */}
                  <div className="mb-8">
                    <h3 className="text-md font-bold font-serif text-blue-800 dark:text-blue-300 border-b border-zinc-100 dark:border-zinc-700 pb-2 mb-4">챕터 개요</h3>
                    <div className="space-y-3">
                      {INTRO_CONTENT.overview.map((item) => (
                        <div key={item.num} className="flex gap-4 items-start p-2.5 border-b border-zinc-100/40 dark:border-zinc-800/40 last:border-b-0">
                          <span className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800/30 flex items-center justify-center text-xs shrink-0">
                            {item.num}
                          </span>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold leading-none">{item.title}</h4>
                              <span className="text-[10px] text-zinc-400 font-sans leading-none">소요 {item.time}</span>
                            </div>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-300 leading-relaxed mt-1 font-serif">{item.summary}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gigantic Call to Action Action to open first chapter */}
                  <div className="pt-4 text-center">
                    <button
                      onClick={() => handleGoToNextChapter('Intro')}
                      className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 font-serif text-base text-white font-bold rounded-lg shadow-md cursor-pointer inline-flex items-center justify-center gap-2 transform transition-transform active:scale-[0.98]"
                    >
                      첫 챕터 시작하기 <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

            ) : (

              /* --- CHAPTER PROCESSOR CONTAINER --- */
              <motion.div
                key={currentChapterId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm p-6 sm:p-8 relative min-h-[500px] overflow-hidden"
              >
                {activeChapter && (
                  <div>
                    {/* Chapter Header Card style */}
                    <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-5">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-[#3B82F6] dark:text-blue-300 uppercase tracking-widest font-mono">단계별 실습</span>
                          <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-zinc-100 mt-1">
                            {activeChapter.title}
                          </h2>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans italic mt-0.5">{activeChapter.subtitle}</p>
                        </div>
                        
                        {/* Interactive score card progress inside Chapter */}
                        <div className="bg-zinc-50 dark:bg-zinc-700/70 border border-zinc-200 dark:border-zinc-600/60 p-2 rounded flex items-center gap-3 self-start sm:self-auto shrink-0 select-none">
                          <div className="text-right">
                            <span className="text-[9px] text-zinc-500 dark:text-zinc-500 block tracking-tight font-sans leading-none">챕터 진행률</span>
                            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-300 font-mono leading-none">
                              {progress.completedSteps[activeChapter.id]?.length || 0} / {activeChapter.steps.length} 단계
                            </span>
                          </div>
                          
                          {/* Circle progress mini */}
                          <div className="w-8 h-8 rounded-full border-2 border-zinc-200 dark:border-zinc-600 flex items-center justify-center relative bg-white dark:bg-zinc-800">
                            <div className="text-[10px] font-bold text-[#3B82F6] dark:text-blue-300 font-mono">
                              {getChapterProgressPercent(activeChapter.id)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CORE UX SEGMENT: Sequenced Steps Accordion List */}
                    <div className="space-y-4">
                      {activeChapter.steps.map((step, idx) => {
                        const stepNum = step.number;
                        const isCompleted = progress.completedSteps[activeChapter.id]?.includes(stepNum);
                        const isActive = activeStepIdx === idx;
                        const isLocked = idx > activeStepIdx && !isCompleted;

                        // COLLAPSED PAST SECTIONS (That are re-expandable!)
                        if (isCompleted && !isActive) {
                          const isExpanded = expandedPastStepId === step.id;

                          return (
                            <div
                              key={step.id}
                              className="border border-[#10B981]/30 dark:border-[#10B981]/20 bg-emerald-50/15 dark:bg-emerald-950/5 rounded-lg overflow-hidden transition-all"
                            >
                              <div className="p-3 py-2.5 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                  <CheckCircle2 className="w-4 h-4 text-[#10B981] dark:text-emerald-400 shrink-0" />
                                  <div>
                                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-bold">0{step.number}단계 완료됨</span>
                                    <h4 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-snug font-serif">
                                      {step.title}
                                    </h4>
                                  </div>
                                </div>

                                <button
                                  onClick={() => setExpandedPastStepId(isExpanded ? null : step.id)}
                                  className="text-[10px] font-sans px-2.5 py-1 border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors"
                                >
                                  {isExpanded ? '접어두기' : '다시 읽기'}
                                </button>
                              </div>

                              {/* Expanded past step content block */}
                              {isExpanded && (
                                <div className="p-4 bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700 text-xs text-zinc-700 dark:text-zinc-300 font-sans space-y-3">
                                  <p className="font-sans text-zinc-500 dark:text-zinc-300"><strong>이유:</strong> {step.why}</p>
                                  <p className="font-sans text-blue-600 dark:text-blue-300"><strong>할 일:</strong> {step.action}</p>
                                  {step.commands && step.commands.length > 0 && (
                                    <div className="bg-zinc-800 p-2.5 rounded text-[11px] font-mono whitespace-pre-wrap select-all relative text-zinc-200">
                                      {step.commands.join('\n')}
                                    </div>
                                  )}
                                  <div className="text-[10px] bg-zinc-50 dark:bg-zinc-800 p-2 rounded text-zinc-400 border border-zinc-200 dark:border-zinc-700/50 flex gap-2 items-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                                    <span>완료한 단계입니다. 필요하면 다시 읽어보세요.</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }

                        // THE ACTIVE SINGLE ACTION STEP FOCUS (Aesthetic workbook layout!)
                        if (isActive) {
                          const isHintRevealed = activeHintStepId === step.id;

                          return (
                            <motion.div
                              key={step.id}
                              ref={activeStepRef}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="border-2 border-blue-500 rounded-xl bg-zinc-50/55 dark:bg-zinc-800/50 shadow-sm p-4 sm:p-6 transition-all relative overflow-hidden scroll-mt-24"
                            >
                              {/* Left margin visual tag */}
                              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#3B82F6] pointer-events-none" />

                              {/* Ribbon indicator */}
                              <div className="flex items-center justify-between mb-3 border-b border-zinc-200 dark:border-zinc-700 pb-3">
                                <span className="bg-[#3B82F6] text-white text-[10px] font-bold font-sans px-2 py-0.5 rounded uppercase tracking-wider">
                                  현재 단계
                                </span>
                                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                                  {step.number} / {activeChapter.steps.length} 단계
                                </span>
                              </div>

                              {/* 1. TITLE AND WHY STATEMENT */}
                              <h3 className="text-base sm:text-lg font-bold font-sans text-zinc-800 dark:text-zinc-100 leading-snug">
                                <span className="text-[#3B82F6] dark:text-blue-300 font-mono mr-1.5 font-bold">0{step.number}.</span>
                                {step.title}
                              </h3>

                              <div className="mt-2.5 p-3 rounded bg-zinc-100/50 dark:bg-zinc-700/40 border border-zinc-200 dark:border-zinc-600">
                                <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-300 font-sans mb-1 select-none leading-none">왜 이걸 먼저 하나요?</p>
                                <p className="text-xs flex text-zinc-600 dark:text-zinc-200 leading-relaxed font-sans">
                                  {step.why}
                                </p>
                              </div>

                              {/* 2. SPECIFIC INK ACTION INSTRUCTION */}
                              <div className="mt-4 border-l-4 border-[#3B82F6] pl-3.5 sm:pl-4">
                                <p className="text-[11px] font-extrabold text-[#3B82F6] dark:text-blue-300 select-none mb-0.5 font-sans">지금 할 일</p>
                                <p className="text-[13px] font-bold text-zinc-800 dark:text-zinc-100 leading-relaxed font-sans">
                                  {step.action}
                                </p>
                              </div>

                              {/* 3. COMMAND BLOCKS OR LINKS OR ASSETS */}
                              {step.commands && step.commands.length > 0 && (
                                <div className="mt-4 bg-zinc-900 text-zinc-200 rounded-lg p-3 relative font-mono text-[11px] shadow-sm border border-zinc-800">
                                  <div className="flex justify-between items-center text-[9px] text-zinc-400 mb-2 border-b border-zinc-800 pb-1.5 uppercase select-none font-sans">
                                    <span>입력 / 참고 예시</span>
                                    <span>복사 가능</span>
                                  </div>
                                  <div className="space-y-1 overflow-x-auto leading-relaxed">
                                    {step.commands.map((cmd, cIdx) => (
                                      <div key={cIdx} className="flex justify-between items-center group">
                                        <code className="text-rose-400 hover:text-rose-300 transition-colors select-all whitespace-pre font-mono">
                                          {cmd}
                                        </code>
                                        
                                        {/* Copy widget */}
                                        <button
                                          onClick={() => handleCopy(cmd)}
                                          className="p-1 px-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded hover:text-white shrink-0 cursor-pointer ml-2 transition-colors duration-150 flex items-center gap-0.5 text-[9px] font-sans"
                                          title="클립보드로 복사"
                                        >
                                          {copiedText === cmd ? (
                                            <span className="text-emerald-400 font-bold leading-none">복사됨!</span>
                                          ) : (
                                            <>
                                              <Copy className="w-2.5 h-2.5" />
                                              <span className="leading-none text-[9px]">복사</span>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Links inside step */}
                              {step.links && step.links.length > 0 && (
                                <div className="mt-3.5 flex flex-wrap gap-2">
                                  {step.links.map((link, lIdx) => (
                                    <a
                                      key={lIdx}
                                      href={link.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="inline-flex items-center gap-1.5 p-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded bg-zinc-100/40 dark:bg-zinc-700/40 text-xs text-blue-500 dark:text-blue-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                                    >
                                      <span>{link.label}</span>
                                      <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                                    </a>
                                  ))}
                                </div>
                              )}

                              {step.screenshots && step.screenshots.length > 0 && (
                                <div className="mt-4 space-y-3">
                                  <div className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-sans select-none leading-none">화면 예시</div>
                                  {step.screenshots.map((screenshot) => (
                                    <figure
                                      key={screenshot.src}
                                      className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm"
                                    >
                                      <img
                                        src={screenshot.src}
                                        alt={screenshot.alt}
                                        loading="lazy"
                                        className="w-full h-auto block"
                                      />
                                      <figcaption className="px-3 py-2 text-[11px] text-zinc-500 dark:text-zinc-400 font-sans border-t border-zinc-100 dark:border-zinc-800">
                                        {screenshot.alt}
                                      </figcaption>
                                    </figure>
                                  ))}
                                </div>
                              )}

                              {/* 4. WARN CARDS */}
                              {step.warning && (
                                <div className="mt-4 p-3 bg-rose-50/40 dark:bg-rose-950/10 border-l-4 border-rose-500 rounded text-xs text-rose-800 dark:text-rose-300 flex gap-2.5 items-start">
                                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                  <div className="font-sans leading-relaxed">
                                    <strong className="font-sans font-bold block mb-0.5 uppercase tracking-wide text-[10px]">⚠️ 주의 및 우려사항</strong>
                                    {step.warning}
                                  </div>
                                </div>
                              )}

                              {(step.example || step.hint) && (
                                <div className="mt-4 space-y-2.5">
                                  {step.example && (
                                    <div className="rounded-md border border-blue-200/80 dark:border-blue-900/60 bg-blue-50/60 dark:bg-blue-950/20 px-3 py-2 text-[11px] text-blue-900 dark:text-blue-200 font-sans leading-relaxed">
                                      <span className="font-bold text-[10px] uppercase tracking-normal mr-1.5 text-blue-700 dark:text-blue-300">확인 기준</span>
                                      {step.example}
                                    </div>
                                  )}

                                  {step.hint && (
                                    <div>
                                      <button
                                        type="button"
                                        onClick={() => setActiveHintStepId(isHintRevealed ? null : step.id)}
                                        className="w-full text-left p-2.5 border border-zinc-200 dark:border-zinc-700 bg-zinc-100/30 dark:bg-zinc-700/50 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer transition-colors flex items-center justify-between"
                                      >
                                        <span className="flex items-center gap-1">
                                          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                                          힌트 펼치기
                                        </span>
                                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isHintRevealed ? 'rotate-90' : ''}`} />
                                      </button>
                                      
                                      {isHintRevealed && (
                                        <motion.div
                                          initial={{ opacity: 0, height: 0 }}
                                          animate={{ opacity: 1, height: 'auto' }}
                                          className="mt-1.5 p-3 rounded bg-white dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700 text-[11px] text-amber-900/95 dark:text-amber-300 font-sans leading-relaxed"
                                        >
                                          {step.hint}
                                        </motion.div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* 6. BOTTOM FOOTER CONTROLS ROW */}
                              <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-700 flex flex-col xs:flex-row items-center justify-between gap-3 flex-wrap">
                                
                                {/* Prev / Hotline row */}
                                <div className="flex items-center gap-2 w-full xs:w-auto">
                                  {step.number > 1 && (
                                    <button
                                      onClick={() => handlePrevStep(activeChapter.id)}
                                      className="p-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-xs rounded font-sans cursor-pointer whitespace-nowrap flex items-center gap-0.5 justify-center"
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                      이전 단계
                                    </button>
                                  )}
                                </div>

                                {/* GIGANTIC GREEN MASTER GO BUTTON FOR PROGRESS */}
                                <button
                                  onClick={() => handleStepComplete(activeChapter.id, step.number)}
                                  className="w-full xs:w-auto px-5 py-3 bg-[#10B981] hover:bg-emerald-600 text-white font-sans font-bold text-[13px] rounded-lg shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all cursor-pointer flex items-center justify-center gap-1.5 transform active:scale-[0.98]"
                                >
                                  완료하고 다음 단계로 <ChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                            </motion.div>
                          );
                        }

                        // FUTURE STRICTLY LOCKED STEP BLUR PADS (To prevent overload)
                        if (isLocked) {
                          return (
                            <div
                              key={step.id}
                              className="border border-[#D9D1C0]/50 dark:border-zinc-700 bg-zinc-50/20 dark:bg-zinc-800/30 rounded-lg p-3 py-2.5 flex items-center justify-between gap-4 select-none filter opacity-40 animate-pulse"
                              title="앞선 단계를 먼저 마쳐야 열리는 학습 단계입니다."
                            >
                              <div className="flex items-center gap-3">
                                <Lock className="w-3.5 h-3.5 text-[#8C8374] shrink-0" strokeWidth={1.5} />
                                <div>
                                  <span className="text-[10px] text-[#8C8374] font-mono font-semibold">0{step.number}단계 잠겨있음</span>
                                  <h4 className="text-xs font-bold text-zinc-400 line-through leading-snug font-serif">
                                    {step.title}
                                  </h4>
                                </div>
                              </div>
                              <span className="text-[10px] text-[#8C8374] font-sans border border-[#D9D1C0] px-2 rounded-sm bg-white dark:bg-zinc-800">잠금</span>
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>

                    {/* SHOW STAMP AWARD ON EXP LEVEL PROGRESS DECK COMPLETION */}
                    {isChapterFullyCompleted(activeChapter.id) && (
                      <div className="mt-8 p-6 border-2 border-dashed border-emerald-500/40 rounded-xl bg-emerald-50/10 text-center relative overflow-hidden select-none">
                        
                        {/* Elegant modern completed tag */}
                        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 flex flex-col items-center justify-center font-sans tracking-wide mx-auto mb-4 scale-105">
                          <CheckCircle2 className="w-7 h-7" />
                          <span className="text-[9px] font-bold mt-1">완료</span>
                        </div>

                        <h3 className="text-md font-bold font-sans text-zinc-800 dark:text-emerald-300">
                          {isFinalChapter(activeChapter.id) ? '모든 챕터를 마쳤습니다.' : '이 챕터를 마쳤습니다.'}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed mt-1 max-w-lg mx-auto">
                          {isFinalChapter(activeChapter.id)
                            ? '처음으로 AI와 함께 실제로 작동하는 프로그램을 만들었습니다. 마지막으로 구글폼에 결과를 제출하면 포트폴리오 기록으로 남길 수 있습니다.'
                            : `${activeChapter.title} 과정을 마쳤습니다. 이어지는 챕터로 이동해 계속 진행하세요.`}
                        </p>

                        <div className="mt-5">
                          {isFinalChapter(activeChapter.id) ? (
                            <a
                              href={PROGRESS_FORM_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#10B981] hover:bg-emerald-600 text-white font-sans font-bold text-xs rounded-lg shadow-sm hover:translate-y-[-1px] transition-transform cursor-pointer"
                            >
                              구글폼 제출하기 <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <button
                              onClick={() => handleGoToNextChapter(activeChapter.id)}
                              className="inline-flex items-center gap-1.5 px-6 py-3 bg-[#3B82F6] hover:bg-blue-600 text-white font-sans font-bold text-xs rounded-lg shadow-sm hover:translate-y-[-1px] transition-transform cursor-pointer"
                            >
                              다음 챕터로 이동 <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ALL CHAPTERS MASTER CELEBRATION (Awarded once stampsCount is 5) */}
          {progress.stampsCount === CHAPTERS.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 bg-gradient-to-br from-zinc-50 to-slate-100 dark:from-zinc-800 dark:to-zinc-700 border-2 border-zinc-200 dark:border-zinc-700 p-6 sm:p-8 rounded-xl text-center relative overflow-hidden select-none"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Award className="w-32 h-32 text-amber-500" />
              </div>

              <div className="inline-flex p-3 rounded-full bg-[#3B82F6] text-white mb-4 animate-bounce">
                <Award className="w-8 h-8 stroke-[2]" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-amber-400">
                🎓 나만의 AI 코딩 워크스페이스 완성!
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans italic mt-1">
                "처음으로 AI와 함께 실제 작동하는 프로그램을 만들었습니다"
              </p>

              <div className="my-6 max-w-md mx-auto h-0.5 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-700 to-transparent" />

              <div className="text-left max-w-lg mx-auto space-y-3 p-4 bg-white/80 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 leading-relaxed">
                <h4 className="text-xs font-bold text-zinc-800 dark:text-blue-300 flex items-center gap-1.5 font-sans justify-center mb-2">
                  <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                  다음에 도전해볼 만한 자동화 아이디어
                </h4>
                
                <ul className="text-xs text-zinc-700 dark:text-zinc-300 font-sans space-y-3 ml-2">
                  <li className="flex gap-2 items-start leading-relaxed">
                    <span className="text-[#3B82F6] font-bold mt-1">✔</span>
                    <div>
                      <strong>CSV나 엑셀 파일 정리:</strong> 공모전 데이터나 수업 자료를 자동으로 정리하고 요약하는 도구를 Claude Code와 함께 만들어보세요.
                    </div>
                  </li>
                  <li className="flex gap-2 items-start leading-relaxed">
                    <span className="text-[#3B82F6] font-bold mt-1">✔</span>
                    <div>
                      <strong>공지사항 요약 봇:</strong> 학과 공지나 공모전 정보를 모아 핵심만 정리하는 작은 자동화 프로젝트도 좋은 다음 단계입니다.
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </section>
      </main>

      {/* STAMP CELEBRATION DIALOG MODAL */}
          <AnimatePresence>
            {showStampCelebration && (
              <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className={`bg-white dark:bg-zinc-800 w-full text-center shadow-2xl relative overflow-hidden ${
                isFinalChapter(showStampCelebration)
                  ? 'max-w-2xl rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-700 p-8 sm:p-10'
                  : 'max-w-sm rounded-2xl border border-zinc-200 dark:border-zinc-700 p-6'
              }`}
            >
              {!isFinalChapter(showStampCelebration) && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />
              )}
              
              <button
                onClick={() => setShowStampCelebration(null)}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {isFinalChapter(showStampCelebration) ? (
                <div className="mx-auto max-w-xl">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 flex flex-col items-center justify-center font-sans tracking-wide mx-auto mb-6 scale-105">
                    <CheckCircle2 className="w-8 h-8" />
                    <span className="text-[10px] font-bold mt-1">완료</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 dark:text-zinc-100">
                    모든 챕터를 마쳤습니다.
                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed mt-4 mb-8">
                    처음으로 AI와 함께 실제로 작동하는 프로그램을 만들었습니다. 마지막으로 구글폼에 결과를 제출하면 포트폴리오 기록으로 남길 수 있습니다.
                  </p>

                  <a
                    href={PROGRESS_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-sm rounded-lg shadow-md hover:translate-y-[-1px] transition-transform cursor-pointer"
                  >
                    구글폼 제출하기 <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                    <Award className="w-8 h-8 stroke-[2]" />
                  </div>

                  <h3 className="text-lg font-bold font-sans text-emerald-800 dark:text-emerald-300">
                    챕터를 완료했습니다
                  </h3>
                  
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 flex flex-col items-center justify-center font-sans tracking-wide mx-auto my-5 scale-105">
                    <CheckCircle2 className="w-7 h-7" />
                    <span className="text-[9px] font-bold mt-1">완료</span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed mb-6">
                    {`Ch${showStampCelebration.replace('Ch', '')} 과정을 마쳤습니다. 잠깐 정리한 뒤 다음 단원으로 넘어가면 됩니다.`}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowStampCelebration(null)}
                      className="flex-1 p-2.5 border border-zinc-200 dark:border-zinc-700 rounded text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer font-sans"
                    >
                      닫기
                    </button>
                    <button
                      onClick={() => handleGoToNextChapter(showStampCelebration)}
                      className="flex-1 p-2.5 bg-blue-600 hover:bg-blue-700 text-white font-sans font-bold text-xs rounded shadow-md cursor-pointer flex items-center justify-center gap-1"
                    >
                      다음 챕터로 이동 <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <a
        href="https://open.kakao.com/o/sXCJk2ui"
        target="_blank"
        rel="noopener noreferrer"
        title="오픈카톡 문의"
        aria-label="오픈채팅 문의"
        className="fixed right-5 bottom-24 md:bottom-6 z-50 h-11 px-4 rounded-full bg-[#3B82F6] text-white shadow-lg hover:bg-blue-600 hover:scale-105 transition-all flex items-center justify-center gap-2 font-sans text-xs font-bold"
      >
        <MessageSquare className="w-4 h-4" />
        <span>질문 & 문의</span>
      </a>
      {/* --- MOBILE STICKY PORTABLE NAVIGATION BAR (At the bottom screen) --- */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur border-t border-zinc-200 dark:border-zinc-800 py-2.5 px-4 shadow-lg md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Notebook className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-tight font-sans block leading-none">활성 챕터</span>
              <span className="text-xs font-bold leading-none text-zinc-800 dark:text-zinc-200 font-serif">
                {activeChapter ? activeChapter.title.split('. ')[1] : '가이드 대문'}
              </span>
            </div>
          </div>

          <div className="flex gap-2.5">

            {currentChapterId !== 'Intro' && (
              <button
                onClick={() => selectChapter('Intro')}
                className="px-3 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 cursor-pointer"
              >
                대문으로
              </button>
            )}
            
            {currentChapterId === 'Intro' && (
              <button
                onClick={() => selectChapter('Ch1')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold font-serif cursor-pointer shadow-sm flex items-center gap-0.5"
              >
                <span>시작하기</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
