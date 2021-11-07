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
      let imageURIs = []
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      let maxSupply = await store
        .getState()
        .blockchain.smartContract.methods.maxSupply()
        .call();

      for (let i = 1; i <= totalSupply; i++) {
        let tokenURI = await store
          .getState()
          .blockchain.smartContract.methods.tokenURI(`${i}`)
          .call();

        let trimmedTokenURI = tokenURI.replace("://", "/");
        let res = await fetch('https://millionlion.mypinata.cloud/' + trimmedTokenURI);
        let metadata = await res.json();
        let trimmedImagedURI = metadata.image.replace("://", "/");

        imageURIs[i] = 'https://millionlion.mypinata.cloud/' + trimmedImagedURI;
      }

      dispatch(
        fetchDataSuccess({
          totalSupply,
          imageURIs,
          maxSupply
          // cost,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
