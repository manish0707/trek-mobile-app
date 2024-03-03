export const formatDate = (input: string) => {
  // Remove non-numeric characters
  const numericOnly = input.replace(/[^\d]/g, '');

  // Format as DD/MM/YYYY
  let formatted = '';
  for (let i = 0; i < numericOnly.length; i++) {
    if (i === 2 || i === 4) {
      formatted += '/';
    }
    formatted += numericOnly[i];
  }

  return formatted;
};
