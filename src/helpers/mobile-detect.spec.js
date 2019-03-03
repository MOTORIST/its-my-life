import {isMobileOrTablet} from '../helpers/mobile-detect';

describe('isMobileOrTablet', () => {
  it('should be mobile or table', () => {
    Object.defineProperty(navigator, 'userAgent', {
      get: function () { return 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';},
      configurable: true,
    });

    expect(isMobileOrTablet()).toBe(true);
  });

  it('should be desktop', () => {
    Object.defineProperty(navigator, 'userAgent', {
      get: function () { return 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36';},
      configurable: true,
    });

    expect(isMobileOrTablet()).toBe(false);
  });
});