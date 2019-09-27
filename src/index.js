const Page = require('./page');
const Output = require('./output');
const { UOA_COURSE_CATALOGUE, QUERY, ALPHABETS, FILEPATH } = require('./constants');

(async () => {
    const output = Output.build(FILEPATH);
    const page = await Page.build();
    await page.goto(UOA_COURSE_CATALOGUE);

    for (char of ALPHABETS) {
        console.log(((ALPHABETS.indexOf(char) / 26) * 100).toFixed(2) + '%...');

        await page.PressButtonAmongList(QUERY, char);
        await page.waitFor(500);
        const text = await page.getAllContentsOf(QUERY);

        output.append(
            text
                .filter(t => t.length > 1 && t !== 'Skip to Main Content')
                .map(t => t.split('-')[0].trim())
                .join('\n') + '\n'
        );
    }

    output.close();
    await page.close();

    console.log('[ End ]');
})();
