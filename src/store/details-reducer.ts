export const DETAILS_REQUEST = 'DETAILS_REQUEST';
export const DETAILS_SUCCESS = 'DETAILS_SUCCESS';
export const DETAILS_FAILURE = 'DETAILS_FAILURE';

type DetailsState = {
  isLoading: boolean;
  details?: BusinessDetails;
  error?: any;
};

export const detailsRequest = (): Action<undefined> => ({
  type: DETAILS_REQUEST,
});
export const detailsSuccess = (details: BusinessDetails) => ({
  type: DETAILS_SUCCESS,
  payload: details,
});
export const detailsFailure = (error: any) => ({type: DETAILS_FAILURE, error});

export const detailsInitialState: DetailsState = {
  isLoading: false,
};

export const detailsReducer = (
  state: DetailsState,
  action: Action<any>,
): DetailsState => {
  switch (action.type) {
    case DETAILS_REQUEST:
      return {
        isLoading: true,
      };
    case DETAILS_SUCCESS:
      return {
        isLoading: false,
        details: action.payload,
      };
    case DETAILS_FAILURE:
      return {
        isLoading: false,
        error: action.error,
      };
  }
  return state;
};
