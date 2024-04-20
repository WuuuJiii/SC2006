import React, { useEffect, useState } from "react";
import { Layout, Button, List, Select, ConfigProvider, message } from 'antd';
import { FilterOutlined, ArrowUpOutlined, ArrowDownOutlined, LeftOutlined, RightOutlined, HeartOutlined } from '@ant-design/icons';

const { Sider } = Layout;

/**
 * Collapsable window on the left side of Explore Page showing property listings filtered by Search bar parameters selected by the user
 * 
 * @param {*} setSortOption - how the property listings should be sorted, selected by the user
 * @param {*} sortedData - the sorted property listings based on sort option
 * @param {*} handleDivClick - handler for clicking a property listing
 * @param {*} userId - ID of the user who is currently logged in
 * @param {*} selectedResale - the resale unit selected by the user
 * @param {*} bookmarked - to save a selected property into user's saved properties
 * @returns 
 */
function SearchResultsBar({ setSortOption, sortedData, handleDivClick, userId, selectedResale, setBookmarked, bookmarked }) {
    const [collapsed, setCollapsed] = useState(false);
    // const [bookmarked, setBookmarked] = useState({}); 

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    
    // Heart icon to bookmark ------------
    const handleBookmarkClick = async (propertyId) => {
        const token = localStorage.getItem('token');
        const isCurrentlyBookmarked = bookmarked[propertyId];  
    
        setBookmarked({
            ...bookmarked,
            [propertyId]: !isCurrentlyBookmarked,
        });
    
        try {
            const method = isCurrentlyBookmarked ? 'DELETE' : 'POST';
    
            const url = `http://localhost:3000/bookmark/${userId}/${propertyId}`;
            
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                ...(method === 'POST' && { body: JSON.stringify({ propertyId: propertyId }) }),
            });
    
            if (!response.ok) {
                setBookmarked({
                    ...bookmarked,
                    [propertyId]: isCurrentlyBookmarked,
                });
                throw new Error(`HTTP error: ${response.status}`);
            }
    
            const action = isCurrentlyBookmarked ? 'removed' : 'added';
            message.success(`Bookmark ${action}.`);
        } catch (error) {
            console.error('Error updating bookmark:', error);
            setBookmarked({
                ...bookmarked,
                [propertyId]: isCurrentlyBookmarked,
            });
            message.error('Failed to update the bookmark.');
        }
    };
    
   // ---------------- keeping heart red after bookmarked--------
    useEffect(() => {
        const fetchBookmarkedItems = async () => {
          const token = localStorage.getItem('token');
          if (token && userId) {
            try {
              const response = await fetch(`http://localhost:3000/bookmark/${userId}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
      
              if (!response.ok) {
                throw new Error('Failed to fetch bookmarked items');
              }
      
              const bookmarkedItems = await response.json();
              const bookmarkedState = {};
      
              bookmarkedItems.forEach(item => {
                bookmarkedState[item] = true;
              });
      
              setBookmarked(bookmarkedState);
            } catch (error) {
              console.error('Error fetching bookmarked items:', error);
            }
          }
        };
      
        fetchBookmarkedItems();
      }, [userId]);

    return (
        <>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                collapsedWidth={0}
                width={'34vw'}
                trigger={null}
                style={{
                    position: 'absolute',
                    left: 0,
                    zIndex: 100,
                    height: '87vh',
                    backgroundColor: 'white',
                }}
            >
                <div className="justify-between flex mt-5 mb-5">
                    <span className="font-bold text-3xl ml-10">Search Results</span>
                    <Select
                        suffixIcon={<FilterOutlined />}
                        defaultValue="Sort By"
                        className="bg-white border-none text-black shadow-md mr-10"
                        onChange={setSortOption}
                    >
                        <Select.Option value="bookmark"><HeartOutlined /> Saved</Select.Option>
                        <Select.Option value="price up"><ArrowUpOutlined /> Price</Select.Option>
                        <Select.Option value="price down"><ArrowDownOutlined /> Price</Select.Option>
                        <Select.Option value="size up"><ArrowUpOutlined /> Size</Select.Option>
                        <Select.Option value="size down"><ArrowDownOutlined /> Size</Select.Option>
                        
                    </Select>
                </div>

                <div className='h-[77vh] overflow-auto justify-center flex'>
                    <List
                        className='ml-5'
                        grid={{ column: 2 }}
                        dataSource={sortedData}
                        renderItem={property => {
                            return (     
                                <List.Item>
                                    <Button
                                        className={`h-[20vh] w-[15vw] shadow-md 
                                        ${property.id === selectedResale?.id ? 'border-blue-500' : ''}`}
                                        key={property.id}
                                        onClick={() => handleDivClick(property)}
                                    >
                                        <div className={`${property.id === selectedResale?.id ? 'text-blue-500' : ''}`}>
                                            <div className="residence-name">{property.town}</div>
                                            <div className="price-range">${property.resale_price.toLocaleString()}</div>
                                        </div>
                                        <ul className={`${property.id === selectedResale?.id ? 'text-blue-500' : ''}`}>
                                            <li>Type: {property.flat_type}</li>
                                            <li>Street: {property.street_name}</li>
                                            <li>Block Number: {property.block_no}</li>
                                            <li>Floor Area: {property.floor_area_sqm} sqm</li>
                                        </ul>
                                        {userId && (<HeartOutlined
                                            style={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                color: bookmarked[property.id] ? 'red' : 'gray',
                                                fontSize: '16px',
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleBookmarkClick(property.id);}}   // if i use .id it works but _.id stores undefined
                                        />)}
                                    </Button>
                                </List.Item>
                            )
                        }}
                    />
                </div>
            </Sider>

            <ConfigProvider wave={{ disabled: true }}>
                <Button
                    type="primary"
                    icon={collapsed ? <RightOutlined className='text-black'/> : <LeftOutlined className='text-black'/>}
                    onClick={toggleSidebar}
                    style={{
                        position: 'absolute',
                        left: collapsed ? 0 : '34vw',
                        transition: 'left 0.2s ease',
                        zIndex: 10,
                        top: '50vh',
                        backgroundColor: 'white',
                        borderRadius: '0%',
                        height: '50px',
                        border: 'none',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                    }}
                />
            </ConfigProvider>
        </>
    );
}

export default SearchResultsBar;