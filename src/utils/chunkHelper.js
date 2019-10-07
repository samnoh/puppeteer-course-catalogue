export const chunkHelper = text =>
    text
        .filter(t => t.length > 1 && t !== 'Skip to Main Content')
        .map(
            t =>
                `{subject: '${t.split('-')[0].trim()}', title: '${t
                    .split('-')[1]
                    .trim()
                    .replace('&amp;', '&')}'},`
        )
        .join('');
