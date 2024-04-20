import React, { useEffect, useState } from "react";

import TrainIcon from '@mui/icons-material/Train';
import BicycleIcon from '@mui/icons-material/DirectionsBike';
import CarIcon from '@mui/icons-material/DriveEta';
import WalkingIcon from '@mui/icons-material/DirectionsWalk';

import { Layout, Button, ConfigProvider } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Sider } = Layout;

/**
 * Formats the time given by Maps API into a more readable format
 * 
 * @param {*} time time given by Maps API
 * @returns Time expressed in hours and minutes
 */
function formatTravelTime(time) {
    if (time === "") {
        return "";
    }
    const parts = time.split(' ');
    let formattedTime = '';
    if (parts.length === 4) {
        // Time includes hours and minutes
        formattedTime = `${parts[0]}hr ${parts[2]}min`;
    } else if (parts[1] === 'hours' || parts[1] === 'hour') {
        // Time includes only hours
        formattedTime = `${parts[0]}hr`;
    } else {
        // Time includes only minutes
        formattedTime = `${parts[0]}min`;
    }
    return formattedTime;
}

/**
 * Collapsable window in the Explore Page
 * 
 * @param {*} isAuthenticated - checks whether user is logged in
 * @param {*} frequentAddresses - array of frequently visited addresses saved under the user
 * @param {*} selectedFrequentAddress - the frequently visited address selected by the user
 * @param {*} travelMode - the type of transportation for Map to determine a route
 * @param {*} travelTime - time taken for each route set by Map
 * @returns 
 */
function ExploreRightBar({ isAuthenticated, frequentAddresses, setSelectedFrequentAddress, selectedFrequentAddress, setTravelMode, travelMode, travelTime }) {
    
    const [collapsedRight, setCollapsedRight] = useState(false);

    const onCollapseRight = collapsedRight => {
        setCollapsedRight(collapsedRight);
    };

    const toggleSidebarRight = () => {
        setCollapsedRight(!collapsedRight);
    };
    const [frequentAddressesIsEmpty, setFrequentAddressesIsEmpty] = useState(true);
    useEffect(() => {
        setFrequentAddressesIsEmpty(!frequentAddresses || frequentAddresses.length === 0);
        console.log(frequentAddressesIsEmpty);

    }, [frequentAddresses]);

    return (
        <>
        {isAuthenticated && (
        <>
            <Sider
                collapsible
                collapsed={collapsedRight}
                onCollapse={onCollapseRight}
                collapsedWidth={0}
                width={400}
                trigger={null}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: '13vh',
                    zIndex: 100,
                    height: '40vh',
                    backgroundColor: 'white',
                }}
            >
                <div className="flex flex-col overflow-y-auto h-full w-full">
                    <span className="font-semibold text-2xl flex justify-center p-4">Routing to Frequent Locations</span>
                    {frequentAddressesIsEmpty ? (
                        <div>
                            <span className="font-semibold flex justify-center">No Frequent Locations Added</span>
                        </div>
                    ):(
                    <div className="flex flex-col">
                    
                        <div className="overflow-auto h-[25vh]">
                        {frequentAddresses.map((address, index) => (
                            <Button key={index} className="flex items-center p-4 border-gray-300 w-[100%] overflow-hidden"
                            onClick={() => setSelectedFrequentAddress(address)}>
                                <div className="flex-grow">
                                <p className={`text-lg font-medium text-black ${address === selectedFrequentAddress ? 'border-blue-500 text-blue-600' : ''}`}>

                                        {address}</p>
                                </div>
                            </Button>     
                        ))}
                        </div>
                        
                        {/* Travel modes that can be set: "TRANSIT", "DRIVING", "WALKING", "BICYCLING" */}
                        <div className="flex h-[7vh] w-full">
                        
                            <div className="w-[25%] ">
                                <Button 
                                    className={`flex flex-col h-full w-full items-center justify-center ${travelMode === "TRANSIT" ? 'text-blue-500' : ''}`}
                                    onClick={()=>setTravelMode("TRANSIT")}>
                                    <TrainIcon/>
                                    <span>{formatTravelTime(travelTime.TRANSIT)}</span>
                                </Button>
                            </div>

                            <div className="w-[25%]">
                                <Button 
                                    className={`flex flex-col h-full w-full items-center justify-center ${travelMode === "DRIVING" ? 'text-blue-500' : ''}`}
                                    onClick={()=>setTravelMode("DRIVING")}>
                                    <CarIcon/>
                                    <span>{formatTravelTime(travelTime.DRIVING)}</span>
                                </Button>
                            </div>
                            
                            <div className="w-[25%]">
                                <Button 
                                    className={`flex flex-col h-full w-full items-center justify-center ${travelMode === "BICYCLING" ? 'text-blue-500' : ''}`}
                                    onClick={()=>setTravelMode("BICYCLING")}>
                                    <BicycleIcon/>
                                    <span>{formatTravelTime(travelTime.BICYCLING)}</span>
                                </Button>
                            </div>

                            <div className="w-[25%]">
                                <Button 
                                    className={`flex flex-col h-full w-full items-center justify-center ${travelMode === "WALKING" ? 'text-blue-500' : ''}`}
                                    onClick={()=>setTravelMode("WALKING")}>
                                    <WalkingIcon/>
                                    <span>{formatTravelTime(travelTime.WALKING)}</span>
                                </Button>
                            </div>

                        </div>

                    </div>
                    )}
                    
                </div>
            </Sider>
                


            <ConfigProvider wave={{ disabled: true }}>
            <Button
                type="primary"
                icon={collapsedRight ? <LeftOutlined className='text-black'/> : <RightOutlined className='text-black'/>}
                loading={false} // Ensure loading state is off
                onClick={toggleSidebarRight}
                style={{
                    position: 'absolute',
                    right: collapsedRight ? 0 : '400px',
                    transition: 'right 0.2s ease',
                    zIndex: 10,
                    top: '30vh',
                    backgroundColor: 'white',
                    borderRadius: '0%',
                    height: '50px',
                    border: 'none',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                }}
            />
            </ConfigProvider>
        </>
        )}
        </>
    )
}
export default ExploreRightBar;