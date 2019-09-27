const Page = require('./page');

const UOA_COURSE_CATALOGUE =
    'http://www.student.guest.auckland.ac.nz/psc/ps/EMPLOYEE/SA/c/UOA_COMMUNITY_ACCESS_FL.UOA_BRWSE_CTLG_FL.GBL?languageCd=ENG';
const query = '.ps-link';

const main = async () => {
    const page = await Page.build();
    await page.goto(UOA_COURSE_CATALOGUE);
    await page.screenshot({ path: 'test.png' });

    const innerText = 'C';
    await page.PressButtonAmongList(query, innerText);
    await page.waitFor(2000);
    await page.screenshot({ path: 'test.png' });

    await page.close();
    console.log('End...');
};

main();
