import hamburger from "./assets/hamburgerWhite.png"
import { useEffect, useState } from 'react';
import './App.css';
import RevealOnScroll from './components/RevealOnScroll/RevealOnScroll';
import PieChart from './components/PieChart/PieChart';
import PreSale from './components/PreSale/PreSale';
import logo from "./assets/Logo-03.png"
import home from "./assets/home.png"
import crocodileLeft from "./assets/crocodileLeft.png"

function App() {
  const [menuMobile, setMenuMobile] = useState("closed")

  function toggleMenuMobile() {
    console.log(menuMobile)
    if (menuMobile === "closed") {
      document.body.style.overflow = 'hidden';
      setMenuMobile("open")
    }
    else {
      document.body.style.overflow = '';
      setMenuMobile("closed")
    }
  }
  return (
    <div className="App">
      <div id="topBar">
        <div className="boxTopBar">
          <img id="logoTopBar" src={logo}></img></div>
        <div id='linksNavBar'>
          <a className='linkNavBar' href='#tokenomics2'>TOKENOMICS</a>
          <a className='linkNavBar' href='https://twitter.com/bettingcroc'>TWITTER</a>
          <a className='linkNavBar' href='https://t.me/bettingcroc'>TELEGRAM</a>
        </div>
        <div className="boxTopBar" id='boxTopBarAbout'>        <a id='aboutLink' href='https://bettingcroc.com'>ABOUT</a>
        </div>

        <button id='hamburger' onClick={toggleMenuMobile}><img id='hamburgerImg' src={hamburger}></img></button>
      </div>

      <div id="box1">
        <p id="text1" className='acetone'>BETTINGCROC</p>

        <div id="box2">
          <p id='until'>PRESALE IS LIVE</p>
        </div>


      </div>
      {
        /*<div id="presale">
        <p className="whiteP titleBox">PRESALE</p>
        <img src={cadenas} id='cadenas'></img>
        </div>*/
        <PreSale></PreSale>
      }
      <RevealOnScroll>

        <div id="box6">
          <p className='titleBox whiteP'>ROADMAP</p>
          <div className='lineHowToBuy'>
            <p className='numberHTB'>11/04</p>
            <p className='howToBuyP'>PRESALE AT 02:00 PM GMT (14:00 GMT) on bettingcroc.xyz : 4,400,000 tokens available for 72 hours. Get 660 $BCROC for 0.0003 BNB. Max 198,000 tokens per wallet. Unsold tokens will be burned.</p>
          </div>
          <div className='lineHowToBuy'>
            <p className='numberHTB'>16/04</p>
            <p className='howToBuyP'>PUBLIC SALE BEGINS AT 14:00 GMT! 100% of presale funds allocated to liquidity. The same amout of tokens that were bought during the presale will be available, the rest will be burnt.</p>
          </div>
          <div className='lineHowToBuy'>
            <p className='numberHTB'>01/05</p>
            <p className='howToBuyP' id="tokenomics">SPECIAL EVENT : Announcement of a BIG launch. Exclusives rewards for holders.</p>
          </div>
        </div>
      </RevealOnScroll>
      <RevealOnScroll  >

        <div id="tokenomics2">
          <p className='titleBox whiteP'>TOKENOMICS</p>
          <div id='tokenBox'>
           
            <img id='katVert' src={crocodileLeft}></img>
            <div id='tokenBox2'>
              <p className="whiteP" id="totalSupplyP">Total supply : 3,000,000,000</p>
              <div className="tokenomicsLine"><div className="legendChart" id="preSaleColor"></div><p className="whiteP">PreSale : 10 %</p></div>
              <div className="tokenomicsLine"><div className="legendChart" id="publicSaleColor"></div><p className="whiteP">Public Sale : 33.3 %</p></div>
              <div className="tokenomicsLine"><div className="legendChart" id="treasuryColor"></div><p className="whiteP">Treasury : 14 %</p></div>
              <div className="tokenomicsLine"><div className="legendChart" id="foundersColor"></div><p className="whiteP">Founders : 10 %</p></div>
              <div className="tokenomicsLine"><div className="legendChart" id="developmentColor"></div><p className="whiteP">Development : 10 %</p></div>
              <div className="tokenomicsLine"><div className="legendChart" id="marketingColor"></div><p className="whiteP">Marketing : 10 %</p></div>
              <div className="tokenomicsLine"><div className="legendChart" id="partnersColor"></div><p className="whiteP">KOLs and Partners : 4 %</p></div>
              <div className="tokenomicsLine"><div className="legendChart" id="airdropColor"></div><p className="whiteP">Airdrop : 3 %</p></div>
              <div className="tokenomicsLine"><div className="legendChart" id="liquidityColor"></div><p className="whiteP">Liquidity : 5.7 %</p></div>

            </div>
            <PieChart></PieChart>

          </div>

        </div>
      </RevealOnScroll>
      <div id='about'></div>

      <RevealOnScroll>

        <div id="box4">
          <p className='titleBox whiteP'>WHY BETTINGCROC ?</p>

          <div id="miniBox4">
            <p className='testMiniBox4'>

              It's a movement that adopts a different way of thinking about investing, building a strong
              community that expresses itself through digital currency. $BCROC represents a shift towards
              welcoming the unexpected and the wild side of crypto. It's not about the money – it's about
              sending a message.            </p>
            <img id="logoBox4" src={logo}></img>
            <p className='testMiniBox4'>

              The Base Chain's ecosystem is rapidly evolving, witnessing the development of numerous
              projects and applications. This dynamic expansion provides a solid foundation for Bettingcroc's
              success, enabling the builders to tap into the resources and expertise of other projects. As the
              Base Chain continues to grow, Bettingcroc's potential grows as well.            </p>
          </div>
        </div>
      </RevealOnScroll>


      <RevealOnScroll>

        <div id="box7">
          <p className='titleBox whiteP'>JOIN US NOW</p>
          <div id='joinUsDiv'>
            <a className='linkJoinUs' href='https://twitter.com/bettingcroc'>TWITTER</a>
            <a className='linkJoinUs' href='https://t.me/bettingcroc'>TELEGRAM</a>
          </div>
        </div>
      </RevealOnScroll>
      {<div id="wrapBG">     <img src={home} id="landingBackground"></img></div>
      }      <div id="overlay"></div>
      <div id='menuMobile' className={menuMobile}>
        <a className='linkNavBar whiteP' href='https://bettingcroc.com' onClick={toggleMenuMobile}>ABOUT</a>
        <a className='linkNavBar whiteP' href='#tokenomics' onClick={toggleMenuMobile}>TOKENOMICS</a>
        <a className='linkNavBar whiteP' href='https://twitter.com/bettingcroc'>TWITTER</a>
        <a className='linkNavBar whiteP' href='https://t.me/bettingcroc'>TELEGRAM</a>
      </div>
    </div>
  );
}

export default App;
