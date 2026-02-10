import { useRef, useState, useEffect, useCallback } from 'react';

type Options = {
  maxLines?: number;
  deps?: unknown[];
};

export function useIsContentLong({ maxLines = 3, deps = [] }: Options = {}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isContentLong, setIsContentLong] = useState(false);

  const checkContentLines = useCallback(() => {
    if (!contentRef.current) return;

    const style = window.getComputedStyle(contentRef.current);
    const lineHeight = parseFloat(style.lineHeight);
    if (!lineHeight) return;

    const lines = Math.round(contentRef.current.scrollHeight / lineHeight);

    setIsContentLong(lines > maxLines);
  }, [maxLines]);

  useEffect(() => {
    checkContentLines();
  }, [checkContentLines, ...deps]);

  useEffect(() => {
    window.addEventListener('resize', checkContentLines);
    return () => window.removeEventListener('resize', checkContentLines);
  }, [checkContentLines]);

  return { contentRef, isContentLong };
}

export default useIsContentLong;
