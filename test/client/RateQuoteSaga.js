import {
  rateQuoteSaga,
  checkRateQuote,
  requestRateQuote,
  delay,
  _reassignDelay
} from "../../src/client/containers/RateQuote/RateQuoteSaga.js";
import { all, call, put, take } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import RQActions from "../../src/client/containers/RateQuote/RateQuoteActions.js";
import { assert } from "chai";
import sinon from "sinon";

describe("RateQuoteSaga", () => {
  //This is a great workaround since there are known issues w/ sinon.setFakeTimers on JSDom
  const original_delay = delay;
  before(function() {
    _reassignDelay(ms => new Promise(res => setTimeout(res, 0)));
  });
  after(function() {
    _reassignDelay(original_delay);
  });

  it("first yields a call to requestRateQuote function with payload", () => {
    const saga = rateQuoteSaga({ payload: "body" });
    assert.deepEqual(call(requestRateQuote, "body"), saga.next().value);
  });

  it("then yields quotes based on inital yield's requestId", () => {
    return expectSaga(rateQuoteSaga, { payload: "body" })
      .provide([
        [call(requestRateQuote, "body"), { requestId: "5" }],
        [matchers.call.fn(checkRateQuote), { quotes: [], done: true }]
      ])
      .put.like({ action: { type: RQActions.RQ_UPDATE_QUOTES } })
      .put.like({ action: { type: RQActions.RQ_REQUEST_FULLY_LOADED } })
      .run();
  });

  it("continues to yield new quotes requests until done:true flag is encountered", () => {
    let count = 0;
    return expectSaga(rateQuoteSaga, { payload: "body" })
      .provide({
        call(effect, next) {
          if (effect.fn === checkRateQuote) {
            if (count >= 5) return { quotes: [], done: true };
            count++;
            return { quotes: [], done: false };
          } else if (effect.fn === requestRateQuote) {
            return { requestId: "5" };
          }
          count++;
          return next();
        }
      })
      .put.like({ action: { type: RQActions.RQ_UPDATE_QUOTES } })
      .put.like({ action: { type: RQActions.RQ_REQUEST_FULLY_LOADED } })
      .run();
  });

  it("yields errors on bad post requests", () => {
    return expectSaga(rateQuoteSaga, { payload: "body" })
      .provide([
        [call(requestRateQuote, "body"), throwError(new Error("post error"))],
        [matchers.call.fn(checkRateQuote), { quotes: [], done: true }]
      ])
      .put.like({ action: { type: RQActions.RQ_REQUEST_ERROR } })
      .run();
  });

  it("yields errors on bad get requests", () => {
    return expectSaga(rateQuoteSaga, { payload: "body" })
      .provide([
        [call(requestRateQuote, "body"), { requestId: "5" }],
        [matchers.call.fn(checkRateQuote), throwError(new Error("get error"))]
      ])
      .put.like({ action: { type: RQActions.RQ_REQUEST_ERROR } })
      .run();
  });
});
