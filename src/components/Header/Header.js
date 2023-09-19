import React,{useEffect, useState} from 'react';
import "./Header.css";
import logo from "../../images/logo.jpeg";
import profile from "../../images/profile.jpeg"
import { BsSun } from "react-icons/bs";
import { AiFillCaretDown } from "react-icons/ai";
import Aertrip from "../../api-data.json"
import Card from '../Card/Card';
import airindia from "../../images/airindia.png"
import vistara from "../../images/vistara.png"
import indigo from "../../images/indigo.png"
import Filters from '../Filters/Filters';



const Header = () => {
  // States for input values
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');


  const [filteredFlights, setFilteredFlights] = useState([]);
  const [tempFlights,setTempFlights]=useState([]);

  let arr=[];
  let flight=Aertrip.data.flights;
    
    // Mapping of airline codes to their names and logos
  const airlineMapping = {
      '6E': {
          name: 'IndiGo Airlines',
          logo: indigo,
      },
      'AI': {
          name: 'Air India',
          logo: airindia, 
      },
      'UK': {
          name: 'Vistara',
          logo: vistara,
      },
  };

   

    const [sortBy, setSortBy] = useState('Price'); 
    const [isLowToHigh, setIsLowToHigh] = useState(true); 


    // Function to fetch flight data based on from and to cities
    const getFlight=(from,to)=>{
        flight.map((e)=>{
            let j=e.results.j;
            j.map((e)=>{
                let price=e.farepr;
                let leg=e.leg;
                leg.map((e)=>{
                    let flights=e.flights;
                    flights.map((e)=>{
                        if(from==e.fr && to==e.to){
                            const flightWithPrice = {
                                ...e,
                                price: price,
                                airlineName: airlineMapping[e.al].name,
                                airlineLogo: airlineMapping[e.al].logo,
                            };
                            arr.push(flightWithPrice);
                        }
                    })
                })
               
            })
        })
        
        setFilteredFlights(arr);
        setTempFlights(arr);
        
    }

    
  useEffect(() => {
      getFlight(fromCity, toCity); // Call getFlight with the initial values of fromCity and toCity
    }, []); 

   
   


  useEffect(()=>{
      console.log(filteredFlights);
  },[filteredFlights])


  const selectDate = (date) => {
      setSelectedDate(date);
  };

  let apdet=flight[0].results.apdet;

     // Function to handle flight search
  const handleSearch=()=>{
      
      let from ="";
      let to="";
      for(let item in apdet){
          if(apdet[item].c==fromCity){
              from=item;
          }
          if(apdet[item].c==toCity){
              to=item;
          }
      }
      getFlight(from,to);
      arr.sort((a, b) => a.price - b.price);


    setFilteredFlights(arr);
    
    }

     

    const [sortedFlights, setSortedFlights] = useState([]);
    const [isDepartureEarly, setIsDepartureEarly] = useState(true);
const [isArrivalEarly, setIsArrivalEarly] = useState(true);
const [isDurationShortest, setIsDurationShortest] = useState(true);

    
    const handleSortChange = (option, isLowToHigh, isDepartureEarly, isArrivalEarly, isDurationShortest) => {
        const sortedFlightsCopy = [...filteredFlights];
      
        switch (option) {
          case 'Price':
            sortedFlightsCopy.sort((a, b) => {
              if (isLowToHigh) {
                return a.price - b.price; // Sort low to high
              } else {
                return b.price - a.price; // Sort high to low
              }
            });
            break;
      
          case 'Departure':
            sortedFlightsCopy.sort((a, b) => {
              if (isDepartureEarly) {
                return a.dt.localeCompare(b.dt); // Sort by departure time (earliest first)
              } else {
                return b.dt.localeCompare(a.dt); // Sort by departure time (latest first)
              }
            });
            setIsDepartureEarly(!isDepartureEarly); // Toggle the state
            break;
      
          case 'Arrival':
            sortedFlightsCopy.sort((a, b) => {
              if (isArrivalEarly) {
                return a.at.localeCompare(b.at); // Sort by arrival time (earliest first)
              } else {
                return b.at.localeCompare(a.at); // Sort by arrival time (latest first)
              }
            });
            setIsArrivalEarly(!isArrivalEarly); // Toggle the state
            break;
      
          case 'Duration':
            sortedFlightsCopy.sort((a, b) => {
              const durationA = a.ft;
              const durationB = b.ft;
              if (isDurationShortest) {
                return durationA - durationB; // Sort by duration (shortest first)
              } else {
                return durationB - durationA; // Sort by duration (longest first)
              }
            });
            setIsDurationShortest(!isDurationShortest); // Toggle the state
            break;
      
          default:
            break;
        }
      
        // Update the filteredFlights state with the sorted data
        setFilteredFlights(sortedFlightsCopy);
      };


      const [priceRange, setPriceRange] = useState({ min: 568, max: 16948 });

      const handlePriceChange = (newPriceRange) => {
        setPriceRange(newPriceRange);
        };
     
          
        const [flightsFetched, setFlightsFetched] = useState(true);
        useEffect(() => {
            console.log('priceRange changed:', priceRange);
            // Rest of your code
          }, [priceRange, flightsFetched]);


          const [totalFlights, setTotalFlights] = useState(0);
        useEffect(() => {
            if (flightsFetched) {
              const filteredFlightsUpdated = tempFlights.filter((flightData) => {
                const price = flightData.price;
                const meetsPriceCondition = price >= priceRange.min && price <= priceRange.max;
                return meetsPriceCondition;
              });
          
              // Update the filteredFlights state with the filtered data
            console.log(filteredFlightsUpdated);
            const totalFlights=filteredFlightsUpdated.length;
            console.log("count",totalFlights);
            setTotalFlights(totalFlights);
            setFilteredFlights(filteredFlightsUpdated);
            }
          }, [priceRange, flightsFetched]);
        
         
       
        
        
        
        
        
        
          
        
  return (
    <div className='main-container'>
    <div className='shodow'>
        {/* Navbar */}
        <div className='header-container sticky'>
        <div>
            <img src={logo} className='logo' alt="logo"/>
        </div>
        <div>
            <button className='nav-center-flight margin'>FLIGHT</button>
            <button className='nav-center-btn margin'>HOTEL</button>
            <button className='nav-center-btn margin'>VISA</button>
            <button className='nav-center-btn margin'>HOLIDAYS</button>
        </div>
        <div className='nav-right-section'>
            <p className='nav-right'><BsSun/></p>
            <p className='nav-right'>TRIPS</p>
            <img src={profile} className='nav-right-img nav-right' alt="nav-right-img"/>
        </div>
        </div>


        {/* Oneway,Passenger,Economy Details Section */}
        <div className='info-section'>
            <div className='info-section-left'>
                <div className='info'>
                    <p>Oneway</p>
                    <p className='down-arrow-icon'><AiFillCaretDown/></p>
                </div>
                <div className='info'>
                    <p>1 Passenger</p>
                    <p className='down-arrow-icon'><AiFillCaretDown/></p>
                </div>
                <div className='info'>
                    <p>Economy</p>
                    <p className='down-arrow-icon'><AiFillCaretDown/></p>
                </div>
            </div>
            <div className='info-section-right'>
                <p className='recent'>Recent Searches</p>
                <p className='down-arrow-icon'><AiFillCaretDown/></p>
            </div>
        </div>



        {/* Flight Details Section */}
        <div className='flight-details-container'>
            <div className='input-info'>
                <small>From</small>
                <input 
                    type='text' 
                    placeholder="Enter a city..." 
                    className='city-input'
                    onChange={(e) => {
                        setFromCity(e.target.value)
                        }
                    }
                />
                
            </div>
            <div className='input-info'>
                <small>To</small>
                <input 
                    type='text'
                    placeholder="Enter a city..." 
                    className='city-input'
                    onChange={(e) => setToCity(e.target.value)}
                />
                
            </div>
            <div className='input-info'>
                <small>Depart</small>
                <input
                    type="date"
                    value={selectedDate}
                    className='city-input'
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </div>
            <div>
                <button 
                    className='search-btn'
                    onClick={handleSearch}
                >Search</button>
            </div>
        </div>
        </div>
        {tempFlights.length>0?<Filters
            filteredFlights={filteredFlights}
            onSortChange={handleSortChange}
            priceRange={priceRange}
            onPriceChange={handlePriceChange}
            dyanaticLength={filteredFlights.length}
            totalLength={tempFlights.length}
        /> :<></>}
       

        {filteredFlights?.map((card, index) => {
          
            const totalSeconds = card.ft;
            const hours = Math.floor(totalSeconds / 3600); 
            const minutes = Math.floor((totalSeconds % 3600) / 60); 
            
            
            return (
                <Card 
                    img={card.airlineLogo}
                    al={card.airlineName}
                    dt={card.dt}
                    ft={`${hours} hr ${minutes} min`}
                    at={card.at}
                    fr={card.fr}
                    to={card.to}
                    price={card.price}
                />
            )
        
        })}

        


    </div>
  )
}

export default Header
