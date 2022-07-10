// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
        let totalStandardSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalStandardSupply()
        .call();
        let totalDeluxeSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalDeluxeSupply()
        .call();

        let totalSpecialSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSpecialSupply()
        .call();
        let totalSupremeSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupremeSupply()
        .call();

      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          totalStandardSupply,
          totalDeluxeSupply,
          totalSpecialSupply,
          totalSupremeSupply,
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
