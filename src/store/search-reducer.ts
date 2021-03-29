export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

type SearchState = {
  wasRequested: boolean;
  isLoading: boolean;
  items: Array<Business>;
  error?: any;
};

export const searchRequest = (): Action<undefined> => ({type: SEARCH_REQUEST});
export const searchSuccess = (items: Array<Business>) => ({
  type: SEARCH_SUCCESS,
  payload: items,
});
export const searchFailure = (error: any) => ({type: SEARCH_FAILURE, error});

export const searchInitialState: SearchState = {
  wasRequested: false,
  isLoading: false,
  items: [],
};

export const searchReducer = (
  state: SearchState,
  action: Action<any>,
): SearchState => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return {
        wasRequested: true,
        isLoading: true,
        items: [],
      };
    case SEARCH_SUCCESS:
      return {
        wasRequested: true,
        isLoading: false,
        items: action.payload || [],
      };
    case SEARCH_FAILURE:
      return {
        wasRequested: true,
        isLoading: false,
        items: [],
        error: action.error,
      };
  }
  return state;
};
