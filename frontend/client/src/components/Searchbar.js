import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import axios from 'axios';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';

/**
 * Search bar within the Navbar for users to select parameters to filter the property listings by
 * 
 * @param {*} initialValues - parameters for the filter (default as empty)
 * @returns 
 */
function Searchbar({ initialValues }) {
    const defaultInitialValues = {
        location: [],
        propertyType: [],
        amenities: [],
        budget: [],
        rooms: []
    };
    const mergedInitialValues = { ...defaultInitialValues, ...initialValues };
    
    const navigate = useNavigate();

    /**
     * Handler for the click of the search button
     * 
     * @param {*} values - parameters selected by the user to filter the property listings by
     */
    const handleSubmit = async (values) => {
        try {
            const response = await axios.get('http://localhost:3000/testData/testData/filter', { params: values });
            navigate('/explore', { state: { responseData: response.data, formValues: values } });
        } catch (error) {
            console.error(error);
        }
    };
  
    return (
        <Formik initialValues={mergedInitialValues} onSubmit={handleSubmit} >
            {({ values, setFieldValue }) => (
                <Form style={{ height: '100%', width: '100%' }}>
                    <div className="
                                    flex flex-row items-center
                                    justify-between
                                    border shadow-md
                                    rounded-[100px]
                                    "  style={{width:'100%', height: '100%' }}>
                        {/* Location */}
                        <div className="flex flex-col ml-10 w-[15%]">
                            <span className="font-semibold text-sm">Location</span>
                            <Select maxTagCount="responsive"
                                    showSearch
                                    variant='borderless'
                                    suffixIcon={null}    
                                    mode="multiple"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onChange={(selectedValues) => {
                                        setFieldValue('location', selectedValues);
                                    }}
                                    defaultValue={values.location}

                                    options={[
                                    {
                                        value: 'sembawang',
                                        label: 'Sembawang',
                                    },
                                    {
                                        value: 'woodlands',
                                        label: 'Woodlands',
                                    },
                                    {
                                        value: 'yishun',
                                        label: 'Yishun',
                                    },
                                    {
                                        value: 'angmokio',
                                        label: 'Ang Mo Kio',
                                    },
                                    {
                                        value: 'hougang',
                                        label: 'Hougang',
                                    },
                                    {
                                        value: 'punggol',
                                        label: 'Punggol',
                                    },
                                    {
                                        value: 'sengkang',
                                        label: 'Seng Kang',
                                    },
                                    {
                                        value: 'serangoon',
                                        label: 'Serangoon',
                                    },
                                    {
                                        value: 'bedok',
                                        label: 'Bedok',
                                    },
                                    {
                                        value: 'pasirris',
                                        label: 'Pasir Ris',
                                    },
                                    {
                                        value: 'tampines',
                                        label: 'Tampines',
                                    },
                                    {
                                        value: 'bukitbatok',
                                        label: 'Bukit Batok',
                                    },
                                    {
                                        value: 'bukitpanjang',
                                        label: 'Bukit Panjang',
                                    },
                                    {
                                        value: 'choachukang',
                                        label: 'Choa Chu Kang',
                                    },
                                    {
                                        value: 'clementi',
                                        label: 'Clementi',
                                    },
                                    {
                                        value: 'jurongeast',
                                        label: 'Jurong East',
                                    },
                                    {
                                        value: 'jurongwest',
                                        label: 'Jurong West',
                                    },
                                    {
                                        value: 'tengah',
                                        label: 'Tengah',
                                    },
                                    {
                                        value: 'bishan',
                                        label: 'Bishan',
                                    },
                                    {
                                        value: 'bukitmerah',
                                        label: 'Bukit Merah',
                                    },
                                    {
                                        value: 'bukittimah',
                                        label: 'Bukit Timah',
                                    },
                                    {
                                        value: 'centralarea',
                                        label: 'Central Area',
                                    },
                                    {
                                        value: 'geylang',
                                        label: 'Geylang',
                                    },
                                    {
                                        value: 'kallangwhampoa',
                                        label: 'Kallang/Whampoa',
                                    },
                                    {
                                        value: 'marineparade',
                                        label: 'Marine Parade',
                                    },
                                    {
                                        value: 'queenstown',
                                        label: 'Queenstown',
                                    },
                                    {
                                        value: 'toapayoh',
                                        label: 'Toa Payoh',
                                    },
                                    ]}
                            />
                        </div>
                                    
                        {/* Property Type */}
                        <div className="flex flex-col w-[15%]">
                            <span className="font-semibold text-sm">Property Type</span>
                            <Select maxTagCount="responsive"
                                mode="multiple"                                      
                                placeholder=""
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                variant='borderless'
                                suffixIcon={null}
                                onChange={(selectedValues) => {
                                    setFieldValue('propertyType', selectedValues);
                                }}
                                defaultValue={values.propertyType}

                                options={[
                                    {
                                        value: 'hdb',
                                        label: 'HDB',
                                    },
                                    // {
                                    //     value: 'condo',
                                    //     label: 'Condo',
                                    // },
                                    // {
                                    //     value: 'landed',
                                    //     label: 'Landed',
                                    // },
                                    // {
                                    //     value: 'strata_detached',
                                    //     label: 'Strata Detached',
                                    // },
                                    // {
                                    //     value: 'strata_semidetached',
                                    //     label: 'Strata Semidetached',
                                    // },
                                    // {
                                    //     value: 'strata_terrace',
                                    //     label: 'Strata Terrace',
                                    // },
                                    // {
                                    //     value: 'detached',
                                    //     label: 'Detached',
                                    // },
                                    // {
                                    //     value: 'semi_detached',
                                    //     label: 'Semi-detached',
                                    // },
                                    // {
                                    //     value: 'terrace',
                                    //     label: 'Terrace',
                                    // },
                                    // {
                                    //     value: 'apartment',
                                    //     label: 'Apartment',
                                    // },
                                    // {
                                    //     value: 'condominium',
                                    //     label: 'Condominium',
                                    // },
                                    // {
                                    //     value: 'executive_condominium',
                                    //     label: 'Executive Condominium',
                                    // }
                                ]}
                            />
                        </div>
                                    
                        {/* Amenities */}
                        <div className="flex flex-col w-[15%]">
                        <span className="font-semibold text-sm">Amenities</span>
                        <Select maxTagCount="responsive"                                
                                optionFilterProp="children"
                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                variant='borderless'
                                suffixIcon={null}
                                onChange={(selectedValues) => {
                                    setFieldValue('amenities', selectedValues);
                                }}
                                defaultValue={values.amenities}
                                allowClear
                                options={[
                                    {
                                        value: 'supermarket',
                                        label: 'Supermarket',
                                    },
                                    {
                                        value: 'shopping_mall',
                                        label: 'Mall',
                                    },
                                    {
                                        value: 'secondary_school',
                                        label: 'Secondary School',
                                    },
                                    {
                                        value: 'primary_school',
                                        label: 'Primary School',
                                    },
                                    {
                                        value: 'park',
                                        label: 'Park',
                                    },
                                    {
                                        value: 'restaurant',
                                        label: 'Food',
                                    },
                                ]}
                            />
                        </div>

                        {/* Budget */}
                        <div className="flex flex-col w-[15%]">
                            <span className="font-semibold text-sm">Budget</span>
                            <Select maxTagCount="responsive"
                                    mode="multiple"                                   
                                    placeholder=""
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    variant='borderless'
                                    suffixIcon={null}
                                    onChange={(selectedValues) => {
                                        setFieldValue('budget', selectedValues);
                                    }}
                                    defaultValue={values.budget}

                                    options={[
                                    {
                                        value: '1',
                                        label: '100K-200K',
                                    },
                                    {
                                        value: '2',
                                        label: '200K-300K',
                                    },
                                    {
                                        value: '3',
                                        label: '300K-400K',
                                    },
                                    {
                                        value: '4',
                                        label: '400K-500K',
                                    },
                                    {
                                        value: '5',
                                        label: '500K-600K',
                                    },
                                    {
                                        value: '6',
                                        label: '600K-700K',
                                    },
                                    {
                                        value: '7',
                                        label: '700K-800K',
                                    },
                                    {
                                        value: '8',
                                        label: '800K-900K',
                                    },
                                    {
                                        value: '9',
                                        label: '900K-1M',
                                    },
                                    {
                                        value: '10',
                                        label: '1M-1.1M',
                                    },
                                    {
                                        value: '11',
                                        label: '1.1M-1.2M',
                                    },
                                    {
                                        value: '12',
                                        label: '1.2M-1.3M',
                                    },
                                    {
                                        value: '13',
                                        label: '1.3M-1.4M',
                                    },
                                    {
                                        value: '14',
                                        label: '1.4M-1.5M',
                                    },
                                    ]}
                            />
                        </div>
                                    
                        {/* Rooms */}
                        <div className="flex flex-col w-[15%]">
                            <span className="font-semibold text-sm">Rooms</span>
                            <Select maxTagCount="responsive"
                                    mode="multiple"                                    
                                    placeholder=""
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    variant='borderless'
                                    suffixIcon={null}
                                    onChange={(selectedValues) => {
                                        setFieldValue('rooms', selectedValues);
                                    }}
                                    defaultValue={values.rooms}

                                    options={[
                                    {
                                        value: '1',
                                        label: '1 Room',
                                    },
                                    {
                                        value: '2',
                                        label: '2 Room',
                                    },
                                    {
                                        value: '3',
                                        label: '3 Room',
                                    },
                                    {
                                        value: '4',
                                        label: '4 Room',
                                    },
                                    {
                                        value: '5',
                                        label: '5 Room',
                                    },
                                    {
                                        value: 'executive',
                                        label: 'Executive',
                                    },
                                    {
                                        value: 'multi',
                                        label: 'Multi-generation',
                                    },
                                    ]}
                            />
                        </div>

                        <div className="mr-5">
                            <Button size="large" 
                                    shape="circle"
                                    className="border-none shadow-none"
                                    htmlType="submit"
                                    icon={<SearchOutlined style={{ fontSize: '25px' }}/>}/>     
                        </div>
                                    
                    </div>
                </Form>)}
        </Formik>
  );
};

export default Searchbar;