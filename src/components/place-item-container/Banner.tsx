import React, {
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { type TextTypeProps } from './model/type';

const TextType: React.FC<TextTypeProps> = ({
  text,
  as: Component = 'div',
  typingSpeed = 80,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 50,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.6,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const textArray = useMemo(
    () => (Array.isArray(text) ? text : [text]),
    [text],
  );
  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);
  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'currentColor';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;
    let timeout: NodeJS.Timeout;
    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split('').reverse().join('')
      : currentText;
    const executeTypingAnimation = () => {
      if (isDeleting) {
        if (displayedText === '') {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) {
            return;
          }
          if (onSentenceComplete) {
            onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
          }
          setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else {
        if (currentCharIndex < processedText.length) {
          timeout = setTimeout(
            () => {
              setDisplayedText(
                (prev) => prev + processedText[currentCharIndex],
              );
              setCurrentCharIndex((prev) => prev + 1);
            },
            variableSpeed ? getRandomSpeed() : typingSpeed,
          );
        } else if (textArray.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        }
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      timeout = setTimeout(executeTypingAnimation, initialDelay);
    } else {
      executeTypingAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    isVisible,
    reverseMode,
    variableSpeed,
    onSentenceComplete,
  ]);
  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < textArray[currentTextIndex].length || isDeleting);
  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props,
    },
    <span
      className="text-type__content"
      style={{ color: getCurrentTextColor() }}
    >
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
      >
        {cursorCharacter}
      </span>
    ),
  );
};

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex h-[300px] w-full items-center justify-center bg-gray-100 text-center text-gray-800">
      <div className="relative z-20 flex flex-col items-center justify-center">
        <div className="mb-4 h-16">
          <img
            src="/asset/header/Logo.svg"
            alt="로고 이미지"
            className="h-full"
          />
        </div>
        <p className="mb-6 text-2xl">
          세종대생의 하루를 더 편하게 <br />
          <span className="font-bold text-red-500">
            <TextType text={['맛집, 카페, 공부', '']} loop={true} />
          </span>
          <span className="font-bold text-gray-800"> 공간을 한 번에.</span>
        </p>
        <button
          onClick={() => navigate('/discover')}
          className="rounded-md bg-red-600 px-6 py-2 font-bold text-white transition-colors duration-300 hover:bg-red-700"
        >
          지금 골라보기
        </button>
      </div>
    </section>
  );
};

export default Banner;
