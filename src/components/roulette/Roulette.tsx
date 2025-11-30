import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Place, RouletteProps } from './model/types';
import { drawRoulette } from './utils/draw';

const Roulette: React.FC<RouletteProps> = ({ items, colors }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [result, setResult] = useState<Place | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const size = Math.min(width, 500);
      canvas.width = size;
      canvas.height = size;
      drawRoulette(ctx, items, colors);
    });
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [items, colors]);

  const handleSpin = () => {
    if (isSpinning || items.length < 2) return;
    setIsSpinning(true);
    setResult(null);

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transition = 'none';
    canvas.style.transform = 'rotate(0deg)';
    canvas.getBoundingClientRect();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * items.length);
      const arc = 360 / items.length;
      const rotateDeg = 1800 + 360 - arc * randomIndex - arc / 2;
      canvas.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
      canvas.style.transform = `rotate(${rotateDeg}deg)`;

      setTimeout(() => {
        setResult(items[randomIndex]);
        setIsSpinning(false);
      }, 4000);
    }, 10);
  };

  const handleGoToReview = () => {
    if (result && result.id) {
      navigate(`/detail/${result.id}`);
    }
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center"
    >
      <div className="relative aspect-square w-full">
        <div className="absolute top-[-5px] left-1/2 z-10 -translate-x-1/2">
          <img
            src="/asset/roulette/arrow.svg"
            alt="roulette arrow"
            className="h-[50px] w-10 rotate-180"
          />
        </div>
        <canvas ref={canvasRef} className="h-full w-full" />
        <button
          onClick={handleSpin}
          disabled={isSpinning || items.length < 2}
          className="absolute top-1/2 left-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-gray-200 bg-white text-xl font-bold text-gray-800 shadow-lg transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          SPIN
        </button>
      </div>
      {result && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
          <div className="animate-pop-in w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
            <p className="mb-2 text-lg text-gray-600">오늘의 장소는?!</p>
            <h2 className="mb-6 text-4xl font-bold text-black">
              {result.name}
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setResult(null)}
                className="rounded-full bg-gray-300 px-6 py-3 font-semibold text-gray-800 shadow-md transition-colors duration-300 hover:bg-red-400"
              >
                닫기
              </button>
              {result.id && (
                <button
                  onClick={handleGoToReview}
                  className="rounded-full bg-[#8BE34A] px-6 py-3 font-semibold text-black shadow-md transition-colors duration-300 hover:bg-[#7bcc42]"
                >
                  장소 보러가기
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roulette;
