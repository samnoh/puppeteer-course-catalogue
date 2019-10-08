export default (text) => text
    .filter((t) => t.length > 1 && t !== 'Skip to Main Content')
    .map(
        (t) => `'${t.split('-')[0].trim()}': '${t
            .split('-')[1]
            .trim()
            .replace('&amp;', '&')}',`,
    )
    .join('');
