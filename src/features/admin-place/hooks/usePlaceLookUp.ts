import { useState } from 'react';
import type { PlaceLookUpItemResponseProps } from '../../../types/type';
import { getPlaceLookup } from '../api/placeLookUp';

export function usePlaceLookUp() {
  const [results, setResults] = useState<PlaceLookUpItemResponseProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const runLookUp = async (query: string) => {
    const q = query.trim();
    if (!q) return;

    setIsLoading(true);
    try {
      const data = await getPlaceLookup(q);

      setResults(data);
      setIsOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const close = () => setIsOpen(false);

  return {
    results,
    isOpen,
    isLoading,
    runLookUp,
    close,
    setResults,
    setIsOpen,
  };
}
