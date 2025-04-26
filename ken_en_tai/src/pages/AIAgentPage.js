import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIAgentPage() {
  const [textIndex, setTextIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const text =
    'こんにちは、私はお仕事マッチングアシスタントです。お仕事のお探しですか？人材のお探しですか？';
  const fullTextRef = useRef('');
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  const animateText = (sentence) => {
    fullTextRef.current = sentence;
    setTextIndex(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < sentence.length) {
          return prev + 1;
        } else {
          clearInterval(intervalRef.current);
          return prev;
        }
      });
    }, 100);
  };

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (hasSeenIntro === 'true') {
      // ✅ 已看过动画，直接跳结果
      setHasStarted(true);
      setTextIndex(text.length);
      fullTextRef.current = text;
      setShowButtons(true);
    } else {
      // ✅ 第一次访问，等点击后播放动画
      const handleClick = () => {
        setHasStarted(true);
        sessionStorage.setItem('hasSeenIntro', 'true'); // ✅ 标记为已播放
        animateText(text);
        setTimeout(() => setShowButtons(true), text.length * 100 + 500);
        window.removeEventListener('click', handleClick);
      };

      window.addEventListener('click', handleClick);
      return () => window.removeEventListener('click', handleClick);
    }
  }, []);


  useEffect(() => {
    if (hasStarted && isAudioEnabled) {
      const audio = document.getElementById('welcomeAudio');
      if (audio && audio.paused) {
        audio.play();
        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
        };
      }
    }
  }, [isAudioEnabled, hasStarted]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-center px-4 font-sans text-white transition-all duration-500 relative">
      {/* 顶部导航 */}
      <div className="absolute top-4 right-6 flex gap-6 text-sm text-white z-20">
        <button
          className="hover:underline hover:text-blue-300 transition"
          onClick={() => navigate('/login')}
        >
          ログイン
        </button>
        <button
          className="hover:underline hover:text-blue-300 transition"
          onClick={() => navigate('/register')}
        >
          登録
        </button>
      </div>

      {/* 圆环 + 静止头像 + 喇叭按钮 */}
      <div className="relative w-40 h-40 mb-8">
        <div
          className={`absolute top-0 left-0 w-full h-full rounded-full border-4 transition-all ${isSpeaking ? 'border-blue-400 animate-pulse-fast' : 'border-gray-500'
            }`}
        >
          {isSpeaking && (
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-300 animate-ripple z-0"></div>
          )}
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src="/images/assistant.png"
            alt="AI头像"
            className="w-28 h-27 rounded-full object-contain"
          />
        </div>

        <button
          className="absolute bottom-[-10px] right-[-10px] z-20"
          onClick={() => {
            setIsAudioEnabled((prev) => {
              const next = !prev;
              const audio = document.getElementById('welcomeAudio');
              if (audio) {
                audio.muted = !next;
              }
              return next;
            });
          }}
          title={isAudioEnabled ? '音声ON' : '音声OFF'}
        >
          <img
            src={
              isAudioEnabled
                ? '/icons/icon_unmute.png'
                : '/icons/icon_mute.png'
            }
            alt="音量切换"
            className="w-6 h-6 opacity-60 hover:opacity-100 transition duration-300"
          />
        </button>
      </div>

      <audio id="welcomeAudio" src="/voices/welcome.mp3" preload="auto" />

      <p className="text-lg font-medium h-10">
        {fullTextRef.current.slice(0, textIndex)}
        {hasStarted && textIndex < text.length && (
          <span className="inline-block w-2 h-5 bg-blue-400 animate-pulse align-middle ml-1"></span>
        )}
      </p>

      {!hasStarted && (
        <p className="text-sm text-blue-300 mt-4 animate-pulse">
          👋 ページをクリックして始めましょう
        </p>
      )}

      <div
        className={`mt-10 flex gap-6 transition-opacity duration-1000 ${showButtons ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <button
          className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg shadow text-blue-200 font-semibold backdrop-blur transition"
          onClick={() => navigate('/job-seeker')}
        >
          仕事探し
        </button>
        <button
          className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg shadow text-green-200 font-semibold backdrop-blur transition"
          onClick={() => navigate('/recruiter')}
        >
          人材探し
        </button>
      </div>


      <style>
        {`
          @keyframes pulse-fast {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.3); opacity: 0.5; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-pulse-fast {
            animation: pulse-fast 0.5s infinite;
          }
          @keyframes ripple {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(2.5); opacity: 0; }
          }
          .animate-ripple {
            animation: ripple 1s infinite;
          }
        `}
      </style>
    </div>
  );
}
