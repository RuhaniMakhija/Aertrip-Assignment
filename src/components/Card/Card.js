import React from 'react'
import "./Card.css";
import { BiMessageRounded } from "react-icons/bi";
import { SlBag } from "react-icons/sl";
import logo from "../../images/indigo.png"


const Card = ({img,al,dt,ft,at,fr,to,price}) => {
    // var {at,fr,to}=card;

    // console.log(card);
  return (
    <div className='main-container-card'>
      <div className='card-left-container'>
        <div className='logo-name-box'>
            <img src={img} className='logo' alt={al}/>
            <p>{al}</p>
        </div>
        <div className='icon-info'>
            <BiMessageRounded className='icon'/><span className='num'>10.0</span>
            <SlBag/>
        </div>

      </div>
      <div className='card-center-container'>
            <div className='time-deatils'>
                <h3>{dt}</h3>
                <p className='ft'>{ft}</p>
                <h3>{at}</h3>
            </div>
            <div className='route-details'>
                <p>{fr}</p>
                <p>-----------------------------------------------------------------------------</p>
                <p>{to}</p>
            </div>
      </div>
      <div className='card-right-container'>
        <h3>Rs.{price}</h3>
        <button className='fares-btn'>View Fares</button>
      </div>
    </div>
  )
}

export default Card



