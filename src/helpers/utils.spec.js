import {arrToMap} from './utils';
import {OrderedMap, Record} from 'immutable';

describe('utils', () => {
  it('arrToMap', () => {
    const arr = [
      {id: 1, title: 'Title 1'},
      {id: 2, title: 'Title 2'},
    ];

    const TypeRecord = new Record({
      id: null,
      title: '',
      active: false,
    });

    const expected = (new OrderedMap())
      .set(arr[0].id, new TypeRecord(arr[0]))
      .set(arr[1].id, new TypeRecord(arr[1]));

    expect(arrToMap(arr, TypeRecord)).toEqual(expected);
  });
});