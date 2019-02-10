import {fileSize} from './files';

describe('helpers files', () => {
  const data = {
    '1.00 kB': 1024,
    '1.00 MB': 1024 * 1024,
    '1.00 GB': 1024 * 1024 * 1024,
    '1.00 TB': 1024 * 1024 * 1024 * 1024,
  };

  describe('fileSize()', () => {
      for(let key in data) {
        it('should return file size format ' + key, () => {
          expect(fileSize(data[key])).toEqual(key);
        });
      }
  });
});