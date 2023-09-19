import React,{useState} from 'react';
import "./Price.css"
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'; // Import the CSS

const Price = ({priceRange,onPriceChange}) => {
    const [icon,setIcon]=useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDivClick = () => {
        setIcon(!icon);
        setIsDropdownOpen(!isDropdownOpen);
     };
    

     const handleClearPrice = () => {
        const defaultPriceRange = { min: 568, max: 16948 }; // Replace with your default price range values
        onPriceChange(defaultPriceRange); // Call the function to update the state
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
                    maxValue={16948} // Max price
                    minValue={568} // Min price
                    step={10} // Price step
                    value={priceRange}
                    onChange={onPriceChange}
                />
            </div>
      
        </div>}
    </div>
  )
}

export default Price
