import {API_KEY, API_ROOT} from '../const';
import NetInfo from '@react-native-community/netinfo';
import {
  getDetailsFromCache,
  getSearchFromCache,
  saveDetailsToCache,
  saveSearchToCache,
} from './cache';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

// Searches business by term. Coordinates will be automatically requested inside function.
export const search = async (term: string): Promise<Array<Business>> => {
  const netStatus = await NetInfo.fetch();
  if (!netStatus.isConnected) {
    return getSearchFromCache(term);
  }
  // TODO: get location from RN API. Currenly use some mock location.
  const latitude = 52.377956;
  const longitude = 4.89707;
  const res = await fetch(
    `${API_ROOT}/search?term=${term}&latitude=${latitude}&longitude=${longitude}`,
    {
      headers,
    },
  );
  if (res.ok) {
    const response = await res.json();
    const items = (response as BusinessSearch).businesses;
    saveSearchToCache(term, items);
    return items;
  }
  throw new Error(`${res.status}: ${res.statusText}`);
};

// Searches business by term. Coordinates will be automatically requested inside function.
export const fetchDetails = async (id: string): Promise<BusinessDetails> => {
  const netStatus = await NetInfo.fetch();
  if (!netStatus.isConnected) {
    return getDetailsFromCache(id);
  }
  // TODO: get location from RN API. Currenly use some mock location.
  const res = await fetch(`${API_ROOT}/${id}`, {
    headers,
  });
  if (res.ok) {
    const response = await res.json();
    saveDetailsToCache(response);
    return response as BusinessDetails;
  }
  throw new Error(`${res.status}: ${res.statusText}`);
};
