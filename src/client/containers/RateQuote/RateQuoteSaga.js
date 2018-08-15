import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import RQActions from "./RateQuoteActions.js";

let delay = ms => new Promise(res => setTimeout(res, ms));

function requestRateQuote(body) {
  return new Promise((resolve, reject) => {
    window
      .fetch(
        "https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/ratequotes",
        {
          method: "POST",
          headers: new Headers({
            Accept: "application/json",
            Authorization: "RG-AUTH " + API_KEY,
            "Content-Type": "application/json"
          }),
          body: JSON.stringify(body)
        }
      )
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function checkRateQuote(request_id) {
  return new Promise((resolve, reject) => {
    window
      .fetch(
        `https://ss6b2ke2ca.execute-api.us-east-1.amazonaws.com/Prod/ratequotes?requestId=${request_id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: "RG-AUTH " + API_KEY
          }
        }
      )
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function* rateQuoteSaga(action) {
  try {
    const res_obj = yield call(requestRateQuote, action.payload);
    let quote_obj;
    do {
      quote_obj = yield call(checkRateQuote, res_obj.requestId);
      yield put.resolve({
        type: RQActions.RQ_UPDATE_QUOTES,
        payload: quote_obj.rateQuotes
      });

      yield call(delay, 2500);
    } while (!quote_obj.done);
    yield put({ type: RQActions.RQ_REQUEST_FULLY_LOADED });
  } catch (e) {
    yield put({ type: RQActions.RQ_REQUEST_ERROR, message: e.message });
  }
}

export default function* mySaga() {
  yield takeLatest(RQActions.RQ_REQUEST, rateQuoteSaga);
}

const _reassignDelay = fn => (delay = fn);
export {
  rateQuoteSaga,
  checkRateQuote,
  requestRateQuote,
  _reassignDelay,
  delay
};
