import {API_KEY, API_ROOT} from '../const';

export const search = async (term: string) => {
  // TODO: get location from RN API. Currenly use some mock location.
  const latitude = 52.377956;
  const longitude = 4.89707;
  const res = await fetch(
    `${API_ROOT}/search?term=${term}&latitude=${latitude}&longitude=${longitude}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );
  if (res.ok) {
    const response = await res.json();
    return response.businesses;
  }
  throw new Error(`${res.status}: ${res.statusText}`);
};
