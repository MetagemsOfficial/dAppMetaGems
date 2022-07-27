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
  const [claimingNftSpecial, setClaimingNftSpecial] = useState(false);
  const [feedbackSpecial, setFeedbackSpecial] = useState(``);
  const [claimingNftSupreme, setClaimingNftSupreme] = useState(false);
  const [feedbackSupreme, setFeedbackSupreme] = useState(`Click buy to mint your NFT.`);
 
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
  
  const claimNFTsSpecial = () => {
    let cost = CONFIG.WEI_COSTSPECIAL;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost);
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedbackSpecial(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNftSpecial(true);
    blockchain.smartContract.methods
      .mintSpecialLandWhitelist()
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
    let totalCostWei = String(cost);
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedbackSupreme(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNftSupreme(true);
    blockchain.smartContract.methods
      .mintSupremeLandWhitelist()
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
             WL Supreme Land (500)
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
                    <s.SpacerXSmall />
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      5 $Dustz per day (erc20)
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      4 billboard
                    </s.TextDescription1>
                    <s.TextDescription1
                      style={{ textAlign: "center", color: "rgb(208, 138, 38)" }}
                    >
                      2 random resource per day
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
                          {feedbackSupreme}
                        </s.TextDescription>
                        <s.SpacerMedium />
                         <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                         
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
                            {claimingNftSupreme ? "BUSY" : "CLAIM"}
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
              WL Special Land (500)
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
                  {"AVAILABLE TOMORROW"}
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
                         
                        </s.FlexContainer> 
                        <s.SpacerSmall />
                        <s.FlexContainer ai={"center"} jc={"center"} fd={"row"}>
                        
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
          
          <s.SpacerSmall />

        </s.Container>

      </s.Container >

      <footer>
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

           World Of MetaGems by Creative Apes Lab 2022

          </s.TextDescription>



        </s.FlexContainer>


      </footer>

    </s.Screen >


  );
}

export default App;
