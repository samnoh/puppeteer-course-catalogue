const Page = require('./page');
const Output = require('./output');
const { UOA_COURSE_CATALOGUE, QUERY, ALPHABETS, FILEPATH } = require('./constants');

const chunkHelper = text =>
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

(async () => {
    const output = new Output(FILEPATH, 'export default [', ']');

    const page = await Page.build();
    await page.goto(UOA_COURSE_CATALOGUE);

    for (const char of ALPHABETS) {
        console.log(((ALPHABETS.indexOf(char) / 26) * 100).toFixed(2) + '%...');

        await page.PressButtonAmongList(QUERY, char);
        await page.waitFor(500);
        const text = await page.getAllContentsOf(QUERY);

        output.append(chunkHelper(text));
    }

    output.rename('course.js');
    output.close();

    await page.close();

    console.log('[ End ]');
})();
