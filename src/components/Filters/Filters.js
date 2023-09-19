import React,{useState,useEffect} from 'react';
import "./Filters.css"
import { CgOptions } from "react-icons/cg";
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowDownShort } from "react-icons/bs";
import { AiOutlineCheck } from "react-icons/ai";
import Price from '../Price/Price';



const Filters = ({filteredFlights,onSortChange,priceRange,onPriceChange, dyanaticLength,totalLength}) => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   
    const handleDivClick = () => {
        setIcon(!icon);
        setIsDropdownOpen(!isDropdownOpen);
     };
   

    const [selectedOption, setSelectedOption] = useState('');
    const [icon,setIcon]=useState(false);
    const [isLowtoHigh, setIsLowtoHigh] = useState(true);
    const [isDepartureEarly, setIsDepartureEarly] = useState(true);
    const [isArrivalEarly, setIsArrivalEarly] = useState(true);
    const [isDurationShortest, setIsDurationShortest] = useState(true);




      
    const handleOptionClick = (option) => {
        if (option === 'Price') {
            setIsLowtoHigh(!isLowtoHigh);
            
        }
       
        if (option === 'Departure'){
            setIsDepartureEarly(!isDepartureEarly);
        }
        if (option === 'Arrival'){
            setIsArrivalEarly(!isArrivalEarly);
        }
        if (option === 'Duration'){
            setIsDurationShortest(!isDurationShortest);
        }

        setSelectedOption(option);
    };

    

      
    const handleClearClick = () => {
    
        setSelectedOption('Price');
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        // Sort the data based on the sorting order
        const sortedFlightsCopy = [...filteredFlights];
    
        if (selectedOption === 'Price') {
          sortedFlightsCopy.sort((a, b) => {
            if (isLowtoHigh) {
              return a.price - b.price; // Sort low to high
            } else {
              return b.price - a.price; // Sort high to low
            }
          });
        }else if (selectedOption === 'Departure') {
            sortedFlightsCopy.sort((a, b) => {
                if(isDepartureEarly){
                    const timeA = new Date(`1970-01-01T${a.dt}`);
                    const timeB = new Date(`1970-01-01T${b.dt}`);
                    return timeA - timeB;
                }
                else{
                    const timeA = new Date(`1970-01-01T${a.dt}`);
                    const timeB = new Date(`1970-01-01T${b.dt}`);
                    
                    return timeB - timeA;
                }
                
                
              });
         }else if (selectedOption === 'Arrival') {
          sortedFlightsCopy.sort((a, b) => {
            if (isArrivalEarly) {
              const timeA = new Date(`1970-01-01T${a.at}`);
              const timeB = new Date(`1970-01-01T${b.at}`);
              return timeA - timeB; // Sort by arrival time (earliest first)
            } else {
              const timeA = new Date(`1970-01-01T${a.at}`);
              const timeB = new Date(`1970-01-01T${b.at}`);
              return timeB - timeA; // Sort by arrival time (latest first)
            }
          });
         } else if (selectedOption === 'Duration') {
            sortedFlightsCopy.sort((a, b) => {
              if (isDurationShortest) {
                return a.ft - b.ft; // Sort by duration (shortest first)
              } else {
                return b.ft - a.ft; // Sort by duration (longest first)
              }
            });
          } 
        
    
        // Update the parent component with the sorted data
        onSortChange(selectedOption, isLowtoHigh,isDepartureEarly,isArrivalEarly, isDurationShortest) 
    
        
      }, [selectedOption,isLowtoHigh,isDepartureEarly,isArrivalEarly,isDurationShortest]);

  return (
    <div>
    <div className='filter-main-container'>
      <div className='filter-icon'>
        <CgOptions/>
      </div>
      <div className={(selectedOption==='Departure' || selectedOption==='Arrival' || selectedOption==='Duration')?'selected-sort-fliters': 'sort-fliters'} onClick={handleDivClick}>
        <p className='sort-main'>Sort: {
            (selectedOption==='Departure' || selectedOption==='Arrival' || selectedOption==='Duration') ?
            <> <span>{selectedOption} </span><AiOutlineClose onClick={handleClearClick}/></>
            :<>
                Price {icon? <AiFillCaretUp className='down-icon' /> :<AiFillCaretDown className='down-icon' />}
            </>} 
        </p>
        
        
      </div>
      {isDropdownOpen && 
            <div className='dropdown'>
                <div className='sort-close'>
                    <p className='pop-title'>Sort</p>
                    <div className='clear-close'>
                    {(selectedOption==='Departure' || selectedOption==='Arrival' || selectedOption==='Duration') ?
                    <><p className='clear-para' onClick={handleClearClick}>Clear</p></>
                    :
                    <></>} 
                    <AiOutlineClose className='pop-cancel-icon' onClick={handleDivClick}/>
                    </div>
                </div>
                
                <div 
                    className={`${selectedOption=== 'Price' ? 'selected': 'option'}`}
                    onClick={()=>handleOptionClick('Price')}
                >
                    
                    <p>Price   <small className='small-text'>{isLowtoHigh? 'Low to high':'High to low'}</small></p>
                    {selectedOption==='Price' ? 
                    <>
                    <span className='span-arrow'>
                        <BsArrowUpShort /> 
                        <BsArrowDownShort className='arrow-down'/>
                    </span>
                    <div className='check-mark'>
                    <span><AiOutlineCheck/></span>
                    </div>
                    
                    </>
                    : <></>}
                </div>



                <div 
                    className={`${selectedOption=== 'Departure' ? 'selected': 'option'}`}
                    onClick={()=>handleOptionClick('Departure')}
                >
                    <p>Departure <small className='small-text'>{isDepartureEarly? 'Earliest first':'Latest first'}</small></p>
                    {selectedOption==='Departure' ? 
                    <>
                    <span className='span-arrow'><BsArrowUpShort/> <BsArrowDownShort className='arrow-down'/></span>
                    <div className='check-mark'>
                    <span><AiOutlineCheck/></span>
                    </div>
                    </>: <></>}
                    
                </div>
                <div 
                    className={`${selectedOption=== 'Arrival' ? 'selected': 'option'}`}
                    onClick={()=>handleOptionClick('Arrival')}
                >
                    <p>Arrival<small className='small-text'>{isArrivalEarly? 'Earliest first':'Latest first'}</small></p>
                    {selectedOption==='Arrival' ? 
                    <>
                    <span className='span-arrow'><BsArrowUpShort/> <BsArrowDownShort className='arrow-down'/></span>
                    <div className='check-mark'>
                    <span><AiOutlineCheck/></span>
                    </div>
                    </>
                    : <></>}
                </div>
                <div
                    className={`${selectedOption=== 'Duration' ? 'selected': 'option'}`}
                    onClick={()=>handleOptionClick('Duration')}
                >
                    <p>Duration<small className='small-text'>{isDurationShortest? 'Shortest first':'Longest first'}</small> </p>
                    {selectedOption==='Duration' ?
                        <>
                     <span className='span-arrow'><BsArrowUpShort/> <BsArrowDownShort className='arrow-down'/></span>
                     <div className='check-mark'>
                    <span><AiOutlineCheck/></span>
                    </div>
                     </>
                     : <></>}
                </div>
            </div>}
            <Price priceRange={priceRange} onPriceChange={onPriceChange}/>
         
    </div>
    <div className='flights-count-container'>
      {dyanaticLength} <span className='of'>of </span><span className='total-flights'>{totalLength} flights</span>
    </div>
    
    </div>
  )
}

export default Filters
