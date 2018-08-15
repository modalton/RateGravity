// Not using action creators. Seemed like overkill.
// Also easier to understand Sagas w/o in case whoever is reading isn't familiar
export default {
  RQ_REQUEST: "RATEQUOTE_REQUEST_FETCH",
  RQ_REQUEST_FULLY_LOADED: "RATEQUOTE_REQUEST_FULLY_LOADED",
  RQ_REQUEST_ERROR: "RATEQUOTE_REQUEST_ERROR",
  RQ_UPDATE_QUOTES: "RATEQUOTE_UPDATE_QUOTES"
};
