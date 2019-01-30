import {Map, OrderedMap} from 'immutable';

export function arrToMap(arr, DataRecord = Map) {
  return arr.reduce(
    (acc, item) => acc.set(item.id, new DataRecord(item)),
    new OrderedMap({})
  );
}