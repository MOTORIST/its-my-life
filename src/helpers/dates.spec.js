import {formatDate, getToday} from './dates';

describe('helpers dates', () => {
  describe('formatDate()', () => {
    it('should return date in format "d mm YYYY"', () => {
      expect(formatDate('2017-06-08')).toEqual('8 June 2017')
    });
  });

  describe('getToday()', () => {
    it('should return date in format YYYY-mm-dd', () => {
      const reg = new RegExp('(\\d{4})-(\\d{2})-(\\d{2})');
      expect(reg.test(getToday())).toBe(true);
    });
  });
});