import {API_KEY, API_ROOT} from '../const';
import {mockDetails, mockResponseBusiness} from '../_mocks';

const headers = {
  Authorization: `Bearer ${API_KEY}`,
};

// Searches business by term. Coordinates will be automatically requested inside function.
export const search = async (term: string): Promise<Array<Business>> => {
  // TODO: remove after testing: API has limit of requests
  if (__DEV__) {
    return new Promise((res) => {
      setTimeout(() => {
        res(mockResponseBusiness.businesses);
      }, 1000);
    });
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
    return (response as BusinessSearch).businesses;
  }
  throw new Error(`${res.status}: ${res.statusText}`);
};

// Searches business by term. Coordinates will be automatically requested inside function.
export const fetchDetails = async (id: string): Promise<BusinessDetails> => {
  // TODO: remove after testing: API has limit of requests
  if (__DEV__) {
    return new Promise((res) => {
      setTimeout(() => {
        res(mockDetails);
      }, 1000);
    });
  }
  // TODO: get location from RN API. Currenly use some mock location.
  const res = await fetch(`${API_ROOT}/${id}`, {
    headers,
  });
  if (res.ok) {
    const response = await res.json();
    return response as BusinessDetails;
  }
  throw new Error(`${res.status}: ${res.statusText}`);
};
