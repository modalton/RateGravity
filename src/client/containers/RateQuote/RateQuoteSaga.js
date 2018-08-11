import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import RQActions from "./RateQuoteActions.js";

//Mock, haven't looked at api doc yet
function fetchApi() {
  return new Promise((resolve, reject) => {
    window
      .fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function* fetchRateQuote(action) {
  try {
    const todos = yield call(fetchApi, action.payload);
    yield put.resolve({ type: RQActions.FETCH_SUCCESS, payload: todos });
  } catch (e) {
    yield put({ type: RQActions.FETCH_FAIL, message: e.message });
  }
}

export default function* mySaga() {
  yield takeEvery(RQActions.FETCH_REQUEST, fetchRateQuote);
}
