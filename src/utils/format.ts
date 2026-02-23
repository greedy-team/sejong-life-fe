export const formatDateDot = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  } catch {
    return '';
  }
};

export const renderStars = (rating: number, maxRating = 5) => {
  return {
    filled: '★'.repeat(rating),
    empty: '★'.repeat(maxRating - rating),
  };
};
