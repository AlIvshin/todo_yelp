import AsyncStorage from '@react-native-community/async-storage';

const MAX_DETAILS_COUNT = 10;

let cache: Cache = {
  search: [],
  details: [],
};

const saveToCache = () => {
  AsyncStorage.setItem('cache', JSON.stringify(cache));
};

export const saveSearchToCache = (query: string, items: Array<Business>) => {
  cache.search.push({query, value: items});
  if (cache.search.length > MAX_DETAILS_COUNT) {
    cache.search.shift();
  }
  saveToCache();
};

export const getSearchFromCache = (query: string) => {
  const res = cache.search.find((item) => item.query === query);
  if (!res) {
    return [];
  }
  return res.value;
};

export const getDetailsFromCache = (id: string) => {
  const res = cache.details.find((item) => item.id === id);
  if (!res) {
    throw new Error(`No data in cache for id ${id}`);
  }
  return res;
};

export const saveDetailsToCache = (value: BusinessDetails) => {
  cache.details.push(value);
  if (cache.details.length > MAX_DETAILS_COUNT) {
    cache.details.shift();
  }
  saveToCache();
};

// Init cache on app loading. Get stored cache to memory.
export const initCache = () => {
  return new Promise((res) => {
    AsyncStorage.getItem('cache', (err, value) => {
      if (value) {
        cache = JSON.parse(value);
      }
      res(true);
    });
  });
};
