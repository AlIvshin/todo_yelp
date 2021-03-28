type Category = {
  alias: string;
  title: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};

type WorkingHours = {
  is_overnight: boolean;
  start: string; // Format HH:mm
  end: string; // Format HH:mm
  day: number; //From 0 to 6, representing day of the week from Monday to Sunday
};

type SpecialWorkingHours = WorkingHours & {
  date: string; // YYYY-MM-dd
};

type Business = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Array<Category>;
  rating: number;
  coordinates: Coordinates;
  price?: string;
  phone: string;
  display_phone: string;
};

type BusinessSearch = {
  businesses: Array<Business>;
};

type BusinessDetails = {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  phone: string;
  display_phone: string;
  review_count: number;
  categories: Array<Category>;
  rating: number;
  photos: Array<string>;
  price: string;
  hours: [
    {
      open: Array<WorkingHours>;
      is_open_now: boolean;
    },
  ];
  special_hours: Array<SpecialWorkingHours>;
};

type RootNavigatorParamList = {
  Home: undefined;
  Details: {id: string};
};

type Action<T> = {
  type: string;
  payload?: T;
  error?: any;
};
