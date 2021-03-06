const initialState = {
  loading: false,
  totalSupply: 0,
  totalSupplyBasicLand: 0,
  totalSupplyDeluxeLand: 0,
  totalSupplySpecialLand: 0,
  totalSupplySupremeLand: 0,
  
  cost: 0,
  //basicCost: 0,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        totalSupplyBasicLand: action.payload.totalSupplyBasicLand,
        totalSupplyDeluxeLand: action.payload.totalSupplyDeluxeLand,
        totalSupplySpecialLand: action.payload.totalSupplySpecialLand,
        totalSupplySupremeLand: action.payload.totalSupplySupremeLand,
        // cost: action.payload.cost,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
