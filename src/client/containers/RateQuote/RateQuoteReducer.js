import RQActions from "./RateQuoteActions.js";

export default function(state = { hello: { obj: "world" } }, action) {
  switch (action.type) {
    case RQActions.FETCH_SUCCESS:
      let hello = action.payload;
      return { ...state, hello };
    case RQActions.FETCH_FAIL:
      return state;
  }
  return state;
}
