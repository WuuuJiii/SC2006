import { Injectable, NotFoundException } from '@nestjs/common';
import { TestData } from './testData.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';



/**
 * Service responsible for interacting with test data in the database.
 */
@Injectable()
export class TestDataService {
    constructor(@InjectModel('TestData') private readonly testDataModel: Model<TestData>){}

    /**
     * Creates test data in the database.
     * @param month - Month.
     * @param town - Town.
     * @param flat_type - Flat type.
     * @param block_no - Block number.
     * @param street_name - Street name.
     * @param storey_range - Storey range.
     * @param floor_area_sqm - Floor area in square meters.
     * @param flat_model - Flat model.
     * @param lease_commense_date - Lease commencement date.
     * @param remaining_lease - Remaining lease.
     * @param resale_price - Resale price.
     * @param latitude - Latitude.
     * @param longitude - Longitude.
     */
    async dbcreateTestData(month: string,town: string,
        flat_type: string, block_no: string,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number,latitude:number, longitude:number){

        const dbtestData = new this.testDataModel ({
            month: month,
            town: town,
            flat_type: flat_type,
            block_no: block_no,
            street_name: street_name,
            storey_range: storey_range,
            floor_area_sqm: floor_area_sqm,
            flat_model: flat_model,
            lease_commense_date: lease_commense_date,
            remaining_lease: remaining_lease,
            resale_price: resale_price,
            latitude: latitude,
            longitude: longitude
        });

        const result = await dbtestData.save();
        
    }

    /**
     * Retrieves all test data from the database.
     * @returns All test data.
     */
    async dbgetAllTestData(){
        const result = await this.testDataModel.find().exec();
        return result.map((testData) => ({id:testData.id, month: testData.month,town: testData.town,
            flat_type: testData.flat_type, block_no: testData.block,
            street_name: testData.street_name, storey_range: testData.storey_range,
            floor_area_sqm: testData.floor_area_sqm, flat_model: testData.flat_model,
            lease_commense_date: testData.lease_commense_date, remaining_lease: testData.remaining_lease,
            resale_price: testData.resale_price, latitude: testData.Latitude, longitude: testData.Longitude}));
    }

    /**
     * Retrieves test data by ID from the database.
     * @param id - Test data ID.
     * @returns Test data with the specified ID.
     * @throws NotFoundException if test data with the specified ID is not found.
     */
    async dbgetTestDataById(id: string){
        let found;
        
        try{
            found =  await this.testDataModel.findById(id);
        }catch(error){
            throw new NotFoundException('Resale HDB not found');
        }
        
        if(!found){
            throw new NotFoundException("Resale HDB not found");
        }

        return found;
    }

    /**
     * Updates test data in the database.
     * @param id - Test data ID.
     * @param month - Month.
     * @param town - Town.
     * @param flat_type - Flat type.
     * @param block_no - Block number.
     * @param street_name - Street name.
     * @param storey_range - Storey range.
     * @param floor_area_sqm - Floor area in square meters.
     * @param flat_model - Flat model.
     * @param lease_commense_date - Lease commencement date.
     * @param remaining_lease - Remaining lease.
     * @param resale_price - Resale price.
     * @param latitude - Latitude.
     * @param longitude - Longitude.
     * @returns Updated test data.
     */
    async dbupdateTestData(
        id: string, month: string,town: string,
        flat_type: string, block_no: string,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number, latitude:number, longitude:number){

        const testData = await this.dbgetTestDataById(id);
        
        if(month){
            testData.month = month;
        }

        if(town){
            testData.town = town;
        }

        if(flat_type){
            testData.flat_type = flat_type;
        }

        if(block_no){
            testData.block_no = block_no;
        }

        if(street_name){
            testData.street_name = street_name;
        }

        if(storey_range){
            testData.storey_range = storey_range;
        }

        if(floor_area_sqm){
            testData.floor_area_sqm = floor_area_sqm;
        }

        if(flat_model){
            testData.flat_model = flat_model;
        }

        if(lease_commense_date){
            testData.lease_commense_date = lease_commense_date;
        }

        if(remaining_lease){
            testData.remaining_lease = remaining_lease;
        }

        if(resale_price){
            testData.resale_price = resale_price;
        }

        if(latitude){
            testData.latitude = latitude;
        }

        if(longitude){
            testData.longitude = longitude;
        }

        testData.save();
        return testData;
    }

    /**
     * Deletes test data from the database by ID.
     * @param id - Test data ID.
     * @throws NotFoundException if test data with the specified ID is not found.
     */
    async dbdeleteTestDataById(id:string){
        const result = await this.testDataModel.deleteOne({_id: id}).exec();

        if(result.deletedCount === 0){
            throw new NotFoundException('Resale HDB not found');
        }
        
    }

    /**
     * Filters test data based on specified parameters.
     * @param location - Location.
     * @param property_type - Property type.
     * @param amenities - Amenities.
     * @param budget - Budget.
     * @param rooms - Rooms.
     * @returns Filtered test data.
     */
    async filterTestData(location: string[], property_type: string[],
                        amenities: string[], budget: string[],
                        rooms: string[]) {
        try {
        
            // Implement your filtering logic here
          const priceRanges = [];
          const selectedLocations = [];
          const selectedRooms = [];
        

        

        // // Filter location
        if (location && location.length > 0) {
            location.forEach(selectedLoc => {
                switch (selectedLoc) {
                    case 'sembawang':
                        selectedLocations.push('SEMBAWANG');
                        break;
                    case 'woodlands':
                        selectedLocations.push('WOODLANDS');
                        break;
                    case 'yishun':
                        selectedLocations.push('YISHUN');
                        break;
                    case 'angmokio':
                        selectedLocations.push('ANG MO KIO');
                        break;
                    case 'hougang':
                        selectedLocations.push('HOUGANG');
                        break;
                    case 'punggol':
                        selectedLocations.push('PUNGGOL');
                        break;
                    case 'sengkang':
                        selectedLocations.push('SENG KANG');
                        break;
                    case 'serangoon':
                        selectedLocations.push('SERANGOON');
                        break;
                    case 'bedok':
                        selectedLocations.push('BEDOK');
                        break;
                    case 'pasirris':
                        selectedLocations.push('PASIR RIS');
                        break;
                    case 'tampines':
                        selectedLocations.push('TAMPINES');
                        break;
                    case 'bukitbatok':
                        selectedLocations.push('BUKIT BATOK');
                        break;
                    case 'bukitpanjang':
                        selectedLocations.push('BUKIT PANJANG');
                        break;
                    case 'choachukang':
                        selectedLocations.push('CHOA CHU KANG');
                        break;
                    case 'clementi':
                        selectedLocations.push('CLEMENTI');
                        break;
                    case 'jurongeast':
                        selectedLocations.push('JURONG EAST');
                        break;
                    case 'jurongwest':
                        selectedLocations.push('JURONG WEST');
                        break;
                    case 'tengah':
                        selectedLocations.push('TENGAH');
                        break;
                    case 'bishan':
                        selectedLocations.push('BISHAN');
                        break;
                    case 'bukitmerah':
                        selectedLocations.push('BUKIT MERAH');
                        break;
                    case 'bukittimah':
                        selectedLocations.push('BUKIT TIMAH');
                        break;
                    case 'centralarea':
                        selectedLocations.push('CENTRAL AREA');
                        break;
                    case 'geylang':
                        selectedLocations.push('GEYLANG');
                        break;
                    case 'kallangwhampoa':
                        selectedLocations.push('KALLANG/WHAMPOA');
                        break;
                    case 'marineparade':
                        selectedLocations.push('MARINE PARADE');
                        break;
                    case 'queenstown':
                        selectedLocations.push('QUEENSTOWN');
                        break;
                    case 'toapayoh':
                        selectedLocations.push('TOA PAYOH');
                        break;
                    default:
                        break;
                }
            });
        }

        //Filter property_type
        //currently only HDB

        //Filter amenities
        //currently not in testdata object

        // Define the budget ranges based on selected values
         if (budget && budget.length > 0) {
            budget.forEach(selectedBudget => {
                switch (selectedBudget) {
                    case '1':
                        priceRanges.push({ $gte: 100000, $lte: 200000 });
                        break;
                    case '2':
                        priceRanges.push({ $gte: 200000, $lte: 300000 });
                        break;
                    case '3':
                        priceRanges.push({ $gte: 300000, $lte: 400000 });
                        break;
                    case '4':
                        priceRanges.push({ $gte: 400000, $lte: 500000 });
                        break;
                    case '5':
                        priceRanges.push({ $gte: 500000, $lte: 600000 });
                        break;
                    case '6':
                        priceRanges.push({ $gte: 600000, $lte: 700000 });
                        break;
                    case '7':
                        priceRanges.push({ $gte: 700000, $lte: 800000 });
                        break;
                    case '8':
                        priceRanges.push({ $gte: 800000, $lte: 900000 });
                        break;
                    case '9':
                        priceRanges.push({ $gte: 900000, $lte: 1000000 });
                        break;
                    case '10':
                        priceRanges.push({ $gte: 1000000, $lte: 1100000 });
                        break;
                    case '11':
                        priceRanges.push({ $gte: 1100000, $lte: 1200000 });
                        break;
                    case '12':
                        priceRanges.push({ $gte: 1200000, $lte: 1300000 });
                        break;
                    case '13':
                        priceRanges.push({ $gte: 1300000, $lte: 1400000 });
                        break;
                    case '14':
                        priceRanges.push({ $gte: 1400000, $lte: 1500000 });
                        break;
                    // Add more cases for additional budget ranges as needed
                    default:
                        break;
                }
            });
        }
        
        // // //Filter rooms
        if (rooms && rooms.length > 0) {
            rooms.forEach(selectedRoom => {
                switch (selectedRoom) {
                    case '1':
                        selectedRooms.push('1 ROOM');
                        break;
                    case '2':
                        selectedRooms.push('2 ROOM');
                        break;
                    case '3':
                        selectedRooms.push('3 ROOM');
                        break;
                    case '4':
                        selectedRooms.push('4 ROOM');
                        break;
                    case '5':
                        selectedRooms.push('5 ROOM');
                        break;
                    case 'executive':
                        selectedRooms.push('EXECUTIVE');
                        break;
                    case 'multi':
                        selectedRooms.push('MULTI-GENERATION');
                        break;
                    // Add more cases for other room types as needed
                    default:
                        break;
                }
            });
        }  

          
          
        // // Define the filter object for the find query
        const filter = {};

        // // Include location filter only if the location array is not empty
        if (selectedLocations.length > 0) {
            filter['town'] = { $in: selectedLocations };
        }
        
        if (priceRanges.length > 0) {
            // Construct an array of price range objects
            const priceRangeQueries = priceRanges.map(range => ({
                resale_price: range
            }));
            // Use $or to match any of the price range conditions
            filter['$or'] = priceRangeQueries;
        }
        
        if (selectedRooms.length > 0) {
            filter['flat_type'] = { $in: selectedRooms };
        }
        
        // Apply filters to find data
        const result = await this.testDataModel.find(filter);
          
          
        return result.map((testData) => ({id:testData.id, month: testData.month,town: testData.town,
            flat_type: testData.flat_type, block_no: testData.block,
            street_name: testData.street_name, storey_range: testData.storey_range,
            floor_area_sqm: testData.floor_area_sqm, flat_model: testData.flat_model,
            lease_commense_date: testData.lease_commense_date, remaining_lease: testData.remaining_lease,
            resale_price: testData.resale_price, latitude: testData.Latitude, longitude: testData.Longitude}));

        } catch (error) {
          // Handle errors appropriately
          throw new Error('Error filtering data');
        }
      }
}
