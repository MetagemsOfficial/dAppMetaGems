import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 120px;
  @media (min-width: 156px) {
    width: 120px;
  }
  transition: width 0.1s;
  transition: height 0.1s;
`;
export const StyledLogo2 = styled.img`
  width: 56px;
  @media (min-width: 56px) {
    width: 56px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNftBasic, setClaimingNftBasic] = useState(false);
  const [feedbackBasic, setFeedbackBasic] = useState(`Click buy to mint your NFT.`);
  const [mintAmountBasic, setMintAmountBasic] = useState(1);
  const [tokenIdBasic, setTokenIdBasic] = useState(0); 
  const [claimingNftDeluxe, setClaimingNftDeluxe] = useState(false);
  const [feedbackDeluxe, setFeedbackDeluxe] = useState(`Click buy to mint your NFT.`);
  const [mintAmountDeluxe, setMintAmountDeluxe] = useState(1);
  const [tokenIdDeluxe, setTokenIdDeluxe] = useState(0); 
  const [claimingNftSpecial, setClaimingNftSpecial] = useState(false);
  const [feedbackSpecial, setFeedbackSpecial] = useState(`Click buy to mint your NFT.`);
  const [mintAmountSpecial, setMintAmountSpecial] = useState(1);
  const [tokenIdSpecial, setTokenIdSpecial] = useState(0); 
  const [claimingNftSupreme, setClaimingNftSupreme] = useState(false);
  const [feedbackSupreme, setFeedbackSupreme] = useState(`Click buy to mint your NFT.`);
  const [mintAmountSupreme, setMintAmountSupreme] = useState(0);
  const [tokenIdSupreme, setTokenIdSupreme] = useState(1); 
  
  
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLYBASIC: 1,
    WEI_COSTBASIC: 0,
    DISPLAY_COSTBASIC: 0,
    MAX_SUPPLYDELUXE: 1,
    WEI_COSTDELUXE: 0,
    DISPLAY_COSTDELUXE: 0,
    MAX_SUPPLYSPECIAL: 1,
    WEI_COSTSPECIAL: 0,
    DISPLAY_COSTSPECIAL: 0,
    MAX_SUPPLYSUPREME: 1,
    WEI_COSTSUPREME: 0,
    DISPLAY_COSTSUPREME: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });
  

  const claimNFTsBasic = () => {
    let cost = CONFIG.WEI_COSTBASIC;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmountBasic);
    let totalGasLimit = String(gasLimit * mintAmountBasic);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedbackBasic(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNftBasic(true);
    blockchain.smartContract.methods
      .mintBasicLand(mintAmountBasic)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedbackBasic("Sorry, something went wrong please try again later.");
        setClaimingNftBasic(false);  
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedbackBasic(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNftBasic(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  const claimNFTsDeluxe = () => {
    let cost = CONFIG.WEI_COSTDELUXE;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmountDeluxe);
    let totalGasLimit = String(gasLimit * mintAmountDeluxe);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedbackBasic(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNftBasic(true);
    blockchain.smartContract.methods
      .mintDeluxeLand(mintAmountDeluxe)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedbackDeluxe("Sorry, something went wrong please try again later.");
        setClaimingNftDeluxe(false);  
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedbackDeluxe(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNftDeluxe(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  const claimNFTsSpecial = () => {
    let cost = CONFIG.WEI_COSTSPECIAL;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmountSpecial);
    let totalGasLimit = String(gasLimit * mintAmountSpecial);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedbackSpecial(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNftSpecial(true);
    blockchain.smartContract.methods
      .mintSpecialLand(mintAmountSpecial)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedbackSpecial("Sorry, something went wrong please try again later.");
        setClaimingNftSpecial(false);  
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedbackSpecial(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNftSpecial(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  const claimNFTsSupreme = () => {
    let cost = CONFIG.WEI_COSTSUPREME;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmountSupreme);
    let totalGasLimit = String(gasLimit * mintAmountSupreme);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedbackSupreme(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNftSupreme(true);
    blockchain.smartContract.methods
      .mintSupremeLand(mintAmountSupreme)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedbackSupreme("Sorry, something went wrong please try again later.");
        setClaimingNftSupreme(false);  
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedbackSupreme(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNftSupreme(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  const decrementMintAmountBasic = () => {
    let newMintAmount = mintAmountBasic - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmountBasic(newMintAmount);
  };

  const incrementMintAmountBasic = () => {
    let newMintAmount = mintAmountBasic + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmountBasic(newMintAmount);
  };
  const decrementMintAmountDeluxe = () => {
    let newMintAmount = mintAmountDeluxe - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmountDeluxe(newMintAmount);
  };

  const incrementMintAmountDeluxe = () => {
    let newMintAmount = mintAmountDeluxe + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmountDeluxe(newMintAmount);
  };
  const decrementMintAmountSpecial = () => {
    let newMintAmount = mintAmountSpecial - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmountSpecial(newMintAmount);
  };

  const incrementMintAmountSpecial = () => {
    let newMintAmount = mintAmountSpecial + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmountSpecial(newMintAmount);
  };
  const decrementMintAmountSupreme = () => {
    let newMintAmount = mintAmountSupreme - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmountSupreme(newMintAmount);
  };

  const incrementMintAmountSupreme = () => {
    let newMintAmount = mintAmountSupreme + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmountSupreme(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  });

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container

        flex={1}
        ai={"center"}
        style={{ padding: 0, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <s.Con
          className="ContainerGridBox">
          {/* mainBox */}
          <s.smallCon
            className="mainBox">
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "rgb(208, 138, 38)",
                margin: "15px 0",
              }}
            >
              Categories
            </s.TextTitle>
            <mainContent className="main_content">
              <mainTitle className="main_title">
                <h1>Choosen One Lands (777) availables</h1>
                <p>You need a metagems genesis to mint</p>
              </mainTitle>
              <mainLeft className="main_left">
                <p>10 $Dustz per day (erc20)</p>
                <p>5 billboards</p>
                <p>1 random ressource (erc1150) per day</p>
                <p>1 rare ressource (erc1150) per day</p>
                <p>Best location on map</p>
                <p>Builder/Marketplace discount</p>
                <p>Twice of the normal size</p>
              </mainLeft>
              <mainRight className="main_right">
                <StyledLogo alt={"logo"} src={"/config/images/standard.gif"} />
              </mainRight>
              <mainCta className="main_cta">
                <StyledButton
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(connect());
                    getData();
                  }}
                >
                  Mint Land Now
                </StyledButton>
              </mainCta>

            </mainContent>
          </s.smallCon>
          {/* First box */}
          <s.smallCon
            className="LandBox box1">
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              Basic Land (2500)
            </s.TextTitle>
            <s.logoCon>
              <StyledLogo alt={"logo"} src={"/config/images/standard.gif"} />
            </s.logoCon>
            <s.SpacerSmall />
            <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
              {/*<s.Container flex={1} jc={"center"} ai={"center"}>

              </s.Container>*/}
              {/* <s.SpacerLarge /> */}
              <s.Container
                flex={2}
                jc={"center"}
                ai={"center"}

              >
                <s.TextTitle
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "var(--accent-text)",
                  }}
                >
                  {data.totalSupplyBasicLand} / {CONFIG.MAX_SUPPLYBASIC}
                </s.TextTitle>
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--primary-text)",
                  }}
                >
                  <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                    {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                  </StyledLink>
                </s.TextDescription>
                <s.SpacerSmall />
                {Number(data.totalSupplyBasicLand) >= CONFIG.MAX_SUPPLYBASIC ? (
                  <>
                    <s.TextTitle
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      The sale has ended.
                    </s.TextTitle>
                    <s.TextDescription
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      You can still find {CONFIG.NFT_NAME} on
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                      {CONFIG.MARKETPLACE}
                    </StyledLink>
                  </>
                ) : (
                  <>
                    <s.TextTitle
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COSTBASIC}{" "}
                      {CONFIG.NETWORK.SYMBOL}.
                    </s.TextTitle>
                    <s.SpacerXSmall />
                    <s.TextDescription
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      Excluding gas fees.
                    </s.TextDescription>
                    <s.SpacerXSmall />
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      1 $Dustz per day (erc20)
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      1  random resource per day
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      10 per transactions max.
                    </s.TextDescription1>
                    {/* <s.SpacerSmall /> */}
                    {blockchain.account === "" ||
                      blockchain.smartContract === null ? (
                      <s.FlexContainer ai={"center"} jc={"center"}>
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          Connect to the {CONFIG.NETWORK.NAME} network
                        </s.TextDescription>
                        <s.SpacerSmall />
                        <StyledButton
                          style={{ position: "absolute", bottom: 35 }}
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(connect());
                            getData();
                          }}
                        >
                          CONNECT
                        </StyledButton>
                        {blockchain.errorMsg !== "" ? (
                          <>
                            <s.SpacerSmall />
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                              }}
                            >
                              {blockchain.errorMsg}
                            </s.TextDescription>
                          </>
                        ) : null}
                      </s.FlexContainer>
                    ) : (
                      <>
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {feedbackBasic}
                        </s.TextDescription>
                        <s.SpacerMedium />
                        <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                          <StyledRoundButton
                            style={{ lineHeight: 0.4 }}
                            disabled={claimingNftBasic ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              decrementMintAmountBasic();
                            }}
                          >
                            -
                          </StyledRoundButton>
                          <s.SpacerMedium />
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                            }}
                          >
                            {mintAmountBasic}
                          </s.TextDescription>
                          <s.SpacerMedium />
                          <StyledRoundButton
                            disabled={claimingNftBasic ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              incrementMintAmountBasic();
                            }}
                          >
                            +
                          </StyledRoundButton>
                        </s.FlexContainer>
                        <s.SpacerSmall />
                        <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                          <StyledButton
                            style={{ position: "absolute", bottom: 35 }}
                            disabled={claimingNftBasic ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTsBasic();
                              getData();
                            }}
                          >
                            {claimingNftBasic ? "BUSY" : "BUY"}
                          </StyledButton>
                        </s.FlexContainer>
                      </>
                    )}
                  </>
                )}
                <s.SpacerMedium />
              </s.Container>
              <s.SpacerLarge />
              {/*<s.Container flex={1} jc={"center"} ai={"center"}>

              </s.Container>*/}
            </ResponsiveWrapper>
            <s.SpacerMedium />
          </s.smallCon>
          {/* Second Box */}
          <s.smallCon
            className="LandBox box2">
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              Deluxe Land (2000)
            </s.TextTitle>
            <s.logoCon>
              <StyledLogo alt={"logo"} src={"/config/images/standard2.gif"} />
            </s.logoCon>
            <s.SpacerSmall />
            <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
              {/*<s.Container flex={1} jc={"center"} ai={"center"}>

              </s.Container>*/}
              <s.SpacerLarge />
              <s.Container
                flex={2}
                jc={"center"}
                ai={"center"}

              >
                <s.TextTitle
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "var(--accent-text)",
                  }}
                >
                  {data.totalSupplyDeluxeLand} / {CONFIG.MAX_SUPPLYDELUXE}
                </s.TextTitle>
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--primary-text)",
                  }}
                >
                  <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                    {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                  </StyledLink>
                </s.TextDescription>
                <s.SpacerSmall />
                {Number(data.totalSupplyDeluxeLand) >= CONFIG.MAX_SUPPLYDELUXE ? (
                  <>
                    <s.TextTitle
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      The sale has ended.
                    </s.TextTitle>
                    <s.TextDescription
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      You can still find {CONFIG.NFT_NAME} on
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                      {CONFIG.MARKETPLACE}
                    </StyledLink>
                  </>
                ) : (
                  <>
                    <s.TextTitle
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COSTDELUXE}{" "}
                      {CONFIG.NETWORK.SYMBOL}.
                    </s.TextTitle>
                    <s.SpacerXSmall />
                    <s.TextDescription
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      Excluding gas fees.
                    </s.TextDescription>
                    <s.SpacerXSmall />
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      2 $Dustz per day (erc20)
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      1 billboard
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      1 random resource per day
                    </s.TextDescription1>
                    <s.SpacerSmall />
                    {blockchain.account === "" ||
                      blockchain.smartContract === null ? (
                      <s.FlexContainer ai={"center"} jc={"center"}>
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          Connect to the {CONFIG.NETWORK.NAME} network
                        </s.TextDescription>
                        <s.SpacerSmall />
                        <StyledButton
                          style={{ position: "absolute", bottom: 35 }}
                            onClick={(e) => {
                          e.preventDefault();
                           dispatch(connect());
                          getData();
                           }}
                        >
                          CONNECT
                        </StyledButton>
                        {blockchain.errorMsg !== "" ? (
                          <>
                            <s.SpacerSmall />
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                              }}
                            >
                              {blockchain.errorMsg}
                            </s.TextDescription>
                          </>
                        ) : null}
                      </s.FlexContainer>
                    ) : (
                      <>
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {feedbackDeluxe}
                        </s.TextDescription>
                        <s.SpacerMedium />
                         <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                          <StyledRoundButton
                            style={{ lineHeight: 0.4 }}
                            disabled={claimingNftDeluxe ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              decrementMintAmountDeluxe();
                            }}
                          >
                            -
                          </StyledRoundButton>
                          <s.SpacerMedium />
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                            }}
                          >
                            {mintAmountDeluxe}
                          </s.TextDescription>
                          <s.SpacerMedium />
                          <StyledRoundButton
                            disabled={claimingNftDeluxe ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              incrementMintAmountDeluxe();
                            }}
                          >
                            +
                          </StyledRoundButton>
                        </s.FlexContainer> 
                        <s.SpacerSmall />
                        <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                          <StyledButton
                            style={{ position: "absolute", bottom: 35 }}
                            disabled={claimingNftDeluxe ? 1 : 0}
                            onClick={(e) => {
                             e.preventDefault();
                             claimNFTsDeluxe();
                            getData();
                           }}
                          >
                            {claimingNftDeluxe ? "BUSY" : "BUY"}
                          </StyledButton>
                        </s.FlexContainer>
                      </>
                    )}
                  </>
                )}
                <s.SpacerMedium />
              </s.Container>
              <s.SpacerLarge />
              {/*<s.Container flex={1} jc={"center"} ai={"center"}>

              </s.Container>*/}
            </ResponsiveWrapper>
            <s.SpacerMedium />
          </s.smallCon>
          {/* Third Box */}
          <s.smallCon
            className="LandBox box3">
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              Special Land (1500)
            </s.TextTitle>
            <s.logoCon>
              <StyledLogo alt={"logo"} src={"/config/images/standard3.gif"} />
            </s.logoCon>
            <s.SpacerSmall />
            <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
              {/*<s.Container flex={1} jc={"center"} ai={"center"}>

              </s.Container>*/}
              <s.SpacerLarge />
              <s.Container
                flex={1}
                jc={"center"}
                ai={"center"}

              >
                <s.TextTitle
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "var(--accent-text)",
                  }}
                >
                  {data.totalSupplySpecialLand} / {CONFIG.MAX_SUPPLYSPECIAL}
                </s.TextTitle>
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--primary-text)",
                  }}
                >
                  <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                    {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                  </StyledLink>
                </s.TextDescription>
                <s.SpacerSmall />
                {Number(data.totalSupplySpecialLand) >= CONFIG.MAX_SUPPLYSPECIAL ? (
                  <>
                    <s.TextTitle
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      The sale has ended.
                    </s.TextTitle>
                    <s.TextDescription
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      You can still find {CONFIG.NFT_NAME} on
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                      {CONFIG.MARKETPLACE}
                    </StyledLink>
                  </>
                ) : (
                  <>
                    <s.TextTitle
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COSTSPECIAL}{" "}
                      {CONFIG.NETWORK.SYMBOL}.
                    </s.TextTitle>
                    <s.SpacerXSmall />
                    <s.TextDescription
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      Excluding gas fees.
                    </s.TextDescription>
                    <s.SpacerXSmall />
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      3 $Dustz per day (erc20)
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      2 billboards
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      2 randoms ressources per day
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      Builder/Marketplace Discount
                    </s.TextDescription1>

                    {/* <s.SpacerSmall /> */}
                    {blockchain.account === "" ||
                      blockchain.smartContract === null ? (
                      <s.FlexContainer ai={"center"} jc={"center"}>
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          Connect to the {CONFIG.NETWORK.NAME} network
                        </s.TextDescription>
                        <s.SpacerSmall />
                        <StyledButton
                          style={{ position: "absolute", bottom: 35 }}
                         onClick={(e) => {
                           e.preventDefault();
                            dispatch(connect());
                          getData();
                         }}
                        >
                          CONNECT
                        </StyledButton>
                        {blockchain.errorMsg !== "" ? (
                          <>
                            <s.SpacerSmall />
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                              }}
                            >
                              {blockchain.errorMsg}
                            </s.TextDescription>
                          </>
                        ) : null}
                      </s.FlexContainer>
                    ) : (
                      <>
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {feedbackSpecial}
                        </s.TextDescription>
                        <s.SpacerMedium />
                         <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                          <StyledRoundButton
                            style={{ lineHeight: 0.4 }}
                            disabled={claimingNftSpecial ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              decrementMintAmountSpecial();
                            }}
                          >
                            -
                          </StyledRoundButton>
                          <s.SpacerMedium />
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                            }}
                          >
                            {mintAmountSpecial}
                          </s.TextDescription>
                          <s.SpacerMedium />
                          <StyledRoundButton
                            disabled={claimingNftSpecial ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              incrementMintAmountSpecial();
                            }}
                          >
                            +
                          </StyledRoundButton>
                        </s.FlexContainer> 
                        <s.SpacerSmall />
                        <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                          <StyledButton
                            style={{ position: "absolute", bottom: 35 }}
                            disabled={claimingNftSpecial ? 1 : 0}
                            onClick={(e) => {
                             e.preventDefault();
                             claimNFTsSpecial();
                            getData();
                           }}
                          >
                            {claimingNftSpecial ? "BUSY" : "BUY"}
                          </StyledButton>
                        </s.FlexContainer>
                      </>
                    )}
                  </>
                )}
                <s.SpacerMedium />
              </s.Container>
              <s.SpacerLarge />
              {/*<s.Container flex={1} jc={"center"} ai={"center"}>

              </s.Container>*/}
            </ResponsiveWrapper>
            <s.SpacerMedium />
          </s.smallCon>
          {/* Fourth Box */}
          <s.smallCon
            className="LandBox box4">
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 30,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              Supreme Land (1000)
            </s.TextTitle>
            <s.logoCon>
              <StyledLogo alt={"logo"} src={"/config/images/standard4.gif"} />
            </s.logoCon>
            <s.SpacerSmall />
            <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
              {/*<s.Container flex={1} jc={"center"} ai={"center"}>

              </s.Container>*/}
              <s.SpacerLarge />
              <s.Container
                flex={2}
                jc={"center"}
                ai={"center"}

              >
                <s.TextTitle
                  style={{
                    textAlign: "center",
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "var(--accent-text)",
                  }}
                >
                  {data.totalSupplySupremeLand} / {CONFIG.MAX_SUPPLYSUPREME}
                </s.TextTitle>
                <s.TextDescription
                  style={{
                    textAlign: "center",
                    color: "var(--primary-text)",
                  }}
                >
                  <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                    {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
                  </StyledLink>
                </s.TextDescription>
                <s.SpacerSmall />
                {Number(data.totalSupplySupremeLand) >= CONFIG.MAX_SUPPLYSUPREME ? (
                  <>
                    <s.TextTitle
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      The sale has ended.
                    </s.TextTitle>
                    <s.TextDescription
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      You can still find {CONFIG.NFT_NAME} on
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                      {CONFIG.MARKETPLACE}
                    </StyledLink>
                  </>
                ) : (
                  <>
                    <s.TextTitle
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COSTSUPREME}{" "}
                      {CONFIG.NETWORK.SYMBOL}.
                    </s.TextTitle>
                    <s.SpacerXSmall />
                    <s.TextDescription
                      style={{ textAlign: "center", color: "var(--accent-text)" }}
                    >
                      Excluding gas fees.
                    </s.TextDescription>
                    {/* <s.SpacerSmall /> */}
                    <s.SpacerXSmall />
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      5 $Dustz per day (erc20)
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      4 billboards
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      2 randoms ressources per day
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      Good location on map
                    </s.TextDescription1>

                    {blockchain.account === "" ||
                      blockchain.smartContract === null ? (
                      <s.FlexContainer ai={"center"} jc={"center"}>
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          Connect to the {CONFIG.NETWORK.NAME} network
                        </s.TextDescription>
                        <s.SpacerSmall />
                        <StyledButton
                          style={{ position: "absolute", bottom: 35 }}
                         onClick={(e) => {
                         e.preventDefault();
                         dispatch(connect());
                         getData();
                         }}
                        >
                          CONNECT
                        </StyledButton>
                        {blockchain.errorMsg !== "" ? (
                          <>
                            <s.SpacerSmall />
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                              }}
                            >
                              {blockchain.errorMsg}
                            </s.TextDescription>
                          </>
                        ) : null}
                      </s.FlexContainer>
                    ) : (
                      <>
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {feedbackSupreme}
                        </s.TextDescription>
                        <s.SpacerMedium />
                        <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                          <StyledRoundButton
                            style={{ lineHeight: 0.4 }}
                            disabled={claimingNftSupreme ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              decrementMintAmountSupreme();
                            }}
                          >
                            -
                          </StyledRoundButton>
                          <s.SpacerMedium />
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                            }}
                          >
                            {mintAmountSupreme}
                          </s.TextDescription>
                          <s.SpacerMedium />
                          <StyledRoundButton
                            disabled={claimingNftSupreme ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              incrementMintAmountSupreme();
                            }}
                          >
                            +
                          </StyledRoundButton>
                        </s.FlexContainer> 
                        <s.SpacerSmall />
                        <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                          <StyledButton
                            style={{ position: "absolute", bottom: 35 }}
                           disabled={claimingNftSupreme ? 1 : 0}
                           onClick={(e) => {
                            e.preventDefault();
                            claimNFTsSupreme();
                            getData();
                            }}
                          >
                            {claimingNftSupreme ? "BUSY" : "BUY"}
                          </StyledButton>
                        </s.FlexContainer>
                      </>
                    )}
                  </>
                )}
                <s.SpacerMedium />
              </s.Container>
              <s.SpacerLarge />
              {/*<s.Container flex={1} jc={"center"} ai={"center"}>

              </s.Container>*/}
            </ResponsiveWrapper>
            <s.SpacerMedium />
          </s.smallCon>
          {/* End */}
        </s.Con>

        <s.Container jc={"center"} ai={"center"} style={{ width: "100%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address. IMPORTANT: Once you make the purchase, the transaction can’t be undone.
          </s.TextDescription>
          <s.SpacerSmall />

        </s.Container>

      </s.Container >

      <footer>

        <s.FlexContainer

          flex={1}
          ai={"center"}
          jc={"center"}
          style={{ padding: 0, backgroundColor: "var(--primary)" }}

        >

          <StyledLogo2 alt={"logo192"} src={"/config/images/logo192.png"} />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",

            }}
          >

            MetaGems Official 2022

          </s.TextDescription>



        </s.FlexContainer>


      </footer>

    </s.Screen >


  );
}

export default App;
