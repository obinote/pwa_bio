import matchCurrentHost from '@helpers/matchesCurrentHost';

const currentHost = window.location.host;

describe('matchesCurrentHost helper', () => {
    it('should match current host', () => {
        expect(matchCurrentHost(`http://${currentHost}`)).toBe(true);
        expect(matchCurrentHost(`http://${currentHost}/`)).toBe(true);
        expect(matchCurrentHost(`https://${currentHost}/`)).toBe(true);
        expect(matchCurrentHost(`https://${currentHost}/index`)).toBe(true);
        expect(matchCurrentHost('/')).toBe(true);
        expect(matchCurrentHost('/index')).toBe(true);
        expect(matchCurrentHost('google.com')).toBe(true);
        expect(matchCurrentHost(`${currentHost}/index`)).toBe(true);
    });

    it('should not match current host', () => {
        expect(matchCurrentHost('http://google.com')).toBe(false);
        expect(matchCurrentHost('http://google.com/')).toBe(false);
        expect(matchCurrentHost('https://google.com/')).toBe(false);
        expect(matchCurrentHost('https://google.com/index')).toBe(false);
    });
});
