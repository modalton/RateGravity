import RQActions from "./RateQuoteActions.js";

export default function(
  state = { quotes: [], done: true, error: false },
  action
) {
  switch (action.type) {
    case RQActions.RQ_REQUEST: {
      return { ...state, quotes: [], done: false, error: false };
    }
    case RQActions.RQ_REQUEST_FULLY_LOADED: {
      return { ...state, done: true };
    }
    case RQActions.RQ_REQUEST_ERROR: {
      const error_message = action.payload; //Choosing not to show to client
      return { ...state, done: true, error: true };
    }
    case RQActions.RQ_UPDATE_QUOTES: {
      const quotes = action.payload;
      return { ...state, quotes };
    }
    default:
      return state;
  }
}
