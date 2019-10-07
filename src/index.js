import Page from './page';
import Output from './output';
import constants from './constants';
import { chunkHelper } from './utils';

const { UOA_COURSE_CATALOGUE, QUERY, ALPHABETS, FILEPATH } = constants;

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
