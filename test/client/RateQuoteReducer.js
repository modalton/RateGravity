import RQReducer from "../../src/client/containers/RateQuote/RateQuoteReducer.js";
import RQActions from "../../src/client/containers/RateQuote/RateQuoteActions.js";
import { assert } from "chai";

describe("RateQuote Reducer", () => {
  const initial_state = {
    quotes: [],
    done: true,
    error: false
  };

  it("default state is quotes:[], error: false, done: true", () => {
    const reducer_state = RQReducer(initial_state, { type: null });
    assert.deepEqual(reducer_state, initial_state);
  });

  it("clears any error flag (sets false) and indicates not done (done = false) on new RQ request", () => {
    const reducer_state = RQReducer(
      { ...initial_state, error: true },
      { type: RQActions.RQ_REQUEST }
    );
    assert.deepEqual(reducer_state, { ...initial_state, done: false });
  });

  it("clears old quotes on new RQ request", () => {
    const reducer_state = RQReducer(
      { ...initial_state, quotes: [1, 2, 3] },
      { type: RQActions.RQ_REQUEST }
    );
    assert.deepEqual(reducer_state, { ...initial_state, done: false });
  });

  it("once RQs are fully loaded set done to true", () => {
    const reducer_state = RQReducer(
      { ...initial_state, done: false },
      { type: RQActions.RQ_REQUEST_FULLY_LOADED }
    );
    assert.deepEqual(reducer_state, initial_state);
  });

  it("sets error and done to true when the RQ encouters an error", () => {
    const reducer_state = RQReducer(
      { ...initial_state, done: false, error: false },
      { type: RQActions.RQ_REQUEST_ERROR }
    );
    assert.deepEqual(reducer_state, { ...initial_state, error: true });
  });

  it("updates quotes array when it has new quotes", () => {
    const reducer_state = RQReducer(initial_state, {
      type: RQActions.RQ_UPDATE_QUOTES,
      payload: [1, 2, 3]
    });
    assert.deepEqual(reducer_state.quotes, [1, 2, 3]);
  });
});
