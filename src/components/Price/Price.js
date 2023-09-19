import React,{useState} from 'react';
import "./Price.css"
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'; 

const Price = ({priceRange,onPriceChange}) => {

  // States for managing the dropdown
  const [icon,setIcon]=useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to handle the click on the dropdown div
  const handleDivClick = () => {
      setIcon(!icon);
      setIsDropdownOpen(!isDropdownOpen);
    };


  // Function to clear the price range
  const handleClearPrice = () => {
    const defaultPriceRange = { min: 568, max: 16948 }; 
    onPriceChange(defaultPriceRange); 
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <div 
        className='price-div'
        onClick={handleDivClick}>
        Price {icon? <AiFillCaretUp className='down-icon' /> :<AiFillCaretDown className='down-icon' />}
      </div>
      {isDropdownOpen && 
        <div className='price-dropdown'>
            <div className='price-section-dropdown'>
                <p>Price</p>
                <div className='price-range-para-pop'>
                    <p className='clear-para' onClick={handleClearPrice}>Clear</p>
                    <AiOutlineClose className='pop-cancel-icon' onClick={handleDivClick}/>
                
                </div>
            </div>
            <div className='price-range'>
                <InputRange
                    draggableTrack
                    formatLabel={(value) => `₹${value}`}
                    // Max price
                    maxValue={16948} 
                    // Min price
                    minValue={568} 
                    // Price step
                    step={10} 
                    value={priceRange}
                    onChange={onPriceChange}
                />
            </div>
      
        </div>}
    </div>
  )
}

export default Price
