export function renumberLists(text: string): string {
  if (!text) return '';
  const lines = text.split('\n');
  let currentNumber = 0;
  let inList = false;
  let consecutiveEmptyLines = 0;

  return lines
    .map(line => {
      const trimmed = line.trim();

      if (trimmed.length === 0) {
        consecutiveEmptyLines++;
        if (consecutiveEmptyLines >= 2) {
          inList = false;
          currentNumber = 0;
        }
        return line;
      }

      consecutiveEmptyLines = 0;

      const listMatch = line.match(/^(\s*)(\d+)[.)]\s*(.*)$/);

      if (listMatch) {
        if (!inList) {
          inList = true;
          currentNumber = 1;
        } else {
          currentNumber++;
        }
        const indent = listMatch[1];
        const content = listMatch[3];
        return `${indent}${currentNumber}. ${content}`;
      } else {
        inList = false;
        currentNumber = 0;
        return line;
      }
    })
    .join('\n');
}

export function formatText(raw: string | undefined | null): string {
  if (!raw) return '';
  const cleaned = raw
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|tr|h[1-6])>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map(line => line.trimEnd())
    .join('\n')
    .trim();

  return renumberLists(cleaned);
}
