const puppeteer = require('puppeteer');

class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--diable-dev-shm-usage']
        });
        const page = await browser.newPage();
        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function(target, property) {
                return target[property] || page[property] || browser[property];
            }
        });
    }

    constructor(page) {
        this.page = page;
    }

    getContentsOf(selector) {
        return this.page.$eval(selector, el => el.innerHTML);
    }

    getAllContentsOf(selector) {
        return this.page.evaluate(_selector => {
            const elements = [...document.querySelectorAll(_selector)];
            return elements.map(e => e.innerHTML);
        }, selector);
    }

    PressButtonAmongList(selector, char) {
        return this.page.evaluate(
            (_selector, _char) => {
                const elements = [...document.querySelectorAll(_selector)];
                const targetElement = elements.find(e => e.innerText === _char);
                targetElement && targetElement.click();
            },
            selector,
            char
        );
    }

    get(path) {
        return this.page.evaluate(
            _path =>
                fetch(_path, {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()),
            path
        );
    }

    post(path, data) {
        return this.page.evaluate(
            (_path, _data) =>
                fetch(_path, {
                    method: 'POST',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(_data)
                }).then(res => res.json()),
            path,
            data
        );
    }

    execRequests(actions) {
        return Promise.all(
            actions.map(({ method, path, data }) => {
                return this[method](path, data); // this.get(path) or this.post(path, data);
            })
        );
    }
}

module.exports = CustomPage;
