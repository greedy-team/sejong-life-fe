export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | 'ellipsis')[] => {
  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }

  const pages: (number | 'ellipsis')[] = [];

  pages.push(0);

  if (currentPage <= 3) {
    for (let i = 1; i <= 4; i++) pages.push(i);
    pages.push('ellipsis');
  } else if (currentPage >= totalPages - 4) {
    pages.push('ellipsis');
    for (let i = totalPages - 5; i < totalPages - 1; i++) pages.push(i);
  } else {
    pages.push('ellipsis');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push('ellipsis');
  }

  pages.push(totalPages - 1);

  return pages;
};
