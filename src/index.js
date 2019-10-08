import Page from './Page';
import Output from './Output';
import constants from './constants';
import chunkHelper from './utils/chunkHelper';

(async () => {
    const { UOA_COURSE_CATALOGUE, QUERY, ALPHABETS, FILEPATH } = constants;

    const output = new Output(FILEPATH, 'export default {', '}');

    const page = await Page.build();
    await page.goto(UOA_COURSE_CATALOGUE);

    for (let i = 0; i < ALPHABETS.length; i += 1) {
        const char = ALPHABETS[i];
        console.log(`${((ALPHABETS.indexOf(char) / ALPHABETS.length) * 100).toFixed(2)}%...`);

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
