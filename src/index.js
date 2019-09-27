const Page = require('./page');
const Output = require('./output');

const UOA_COURSE_CATALOGUE =
    'http://www.student.guest.auckland.ac.nz/psc/ps/EMPLOYEE/SA/c/UOA_COMMUNITY_ACCESS_FL.UOA_BRWSE_CTLG_FL.GBL?languageCd=ENG';
const query = '.ps-link';

const alphabets = Array.from(Array(26), (_, i) => String.fromCharCode('A'.charCodeAt(0) + i));

(async () => {
    const output = Output.build('output.txt');
    const page = await Page.build();
    await page.goto(UOA_COURSE_CATALOGUE);

    for (c of alphabets) {
        console.log(((alphabets.indexOf(c) / 26) * 100).toFixed(2) + '%...');
        await page.PressButtonAmongList(query, c);
        await page.waitFor(500);

        const text = await page.getAllContentsOf(query);

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
