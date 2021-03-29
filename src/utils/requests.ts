import {API_KEY, API_ROOT} from '../const';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from '@react-native-community/geolocation';
import {
  getDetailsFromCache,
  getSearchFromCache,
  saveDetailsToCache,
  saveSearchToCache,
} from './cache';
import {PermissionsAndroid, Platform} from 'react-native';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

const getLocation = async (): Promise<{coords: Coordinates}> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Yelp Location Permission',
        message: 'our location is required for searching places',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('No permission granted');
    }
  }
  return new Promise((res, rej) => {
    Geolocation.getCurrentPosition(res, rej);
  });
};

// Searches business by term. Coordinates will be automatically requested inside function.
export const search = async (term: string): Promise<Array<Business>> => {
  let latitude = null;
  let longitude = null;
  try {
    const loc = await getLocation();
    latitude = loc.coords.latitude;
    longitude = loc.coords.longitude;
  } catch (err) {
    return [];
  }
  const netStatus = await NetInfo.fetch();
  if (!netStatus.isConnected) {
    return getSearchFromCache(term);
  }
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
