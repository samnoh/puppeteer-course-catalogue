const Page = require('./page');
const Output = require('./output');

const UOA_COURSE_CATALOGUE =
    'http://www.student.guest.auckland.ac.nz/psc/ps/EMPLOYEE/SA/c/UOA_COMMUNITY_ACCESS_FL.UOA_BRWSE_CTLG_FL.GBL?languageCd=ENG';
const QUERY = '.ps-link';
const ALPHABETS = Array.from(Array(26), (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)); // A-Z
const FILEPATH = 'output.txt';

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
                .filter(t => t.length > 1)
                .filter(t => t !== 'Skip to Main Content')
                .map(t => t.split('-')[0].trim())
                .join('\n') + '\n'
        );
    }

    output.close();
    await page.close();

    console.log('[ End ]');
})();
