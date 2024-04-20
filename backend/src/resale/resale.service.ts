import { Injectable, NotFoundException } from '@nestjs/common';
import { Resale } from './resale.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {v1 as uuid} from  'uuid';


/**
 * Service responsible for handling operations related to resale properties.
 */
@Injectable()
export class ResaleService {
    constructor(@InjectModel('Resale') private readonly resaleModel: Model<Resale>){}

    private resales = [];

     /**
     * Retrieve all resale data stored in memory.
     * @returns An array of resale data.
     */
    getAllResaleData(): Resale[]{
        return this.resales;
    }
    
    /**
     * Retrieve resale data by town name.
     * @param town The town name to search for.
     * @returns The resale data matching the provided town name.
     * @throws NotFoundException if no resale data is found for the given town.
     */
    getResaleDataById(town: string): Resale{
        const found = this.resales.find(resale => resale.town === town);

        if(!found){
            throw new NotFoundException("Resale HDB not found");
        }

        return found;
    }

    /**
     * Delete resale data by town name.
     * @param town The town name of the resale data to delete.
     * @throws NotFoundException if no resale data is found for the given town.
     */
    deleteResaleDataById(town:string){
        const found = this.getResaleDataById(town);
        this.resales = this.resales.filter(resale => resale.town !== found.town);
    }

    /**
     * Update resale data.
     * @param month Month of the resale
     * @param town Town where the resale property is located
     * @param flat_type Type of flat
     * @param block_no Block number of the resale property
     * @param street_name Street name of the resale property
     * @param storey_range Storey range of the resale property
     * @param floor_area_sqm Floor area in square meters
     * @param flat_model Model of the flat
     * @param lease_commense_date Lease commencement date
     * @param remaining_lease Remaining lease duration
     * @param resale_price Price of the resale property
     * @returns The updated resale data.
     */
    updateResaleData(
        month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number): Resale{

        const resale = this.getResaleDataById(town);
        
        if(month){
            resale.month = month;
        }

        if(town){
            resale.town = town;
        }

        if(flat_type){
            resale.flat_type = flat_type;
        }

        if(block_no){
            resale.block_no = block_no;
        }

        if(street_name){
            resale.street_name = street_name;
        }

        if(storey_range){
            resale.storey_range = storey_range;
        }

        if(floor_area_sqm){
            resale.floor_area_sqm = floor_area_sqm;
        }

        if(flat_model){
            resale.flat_model = flat_model;
        }

        if(lease_commense_date){
            resale.lease_commense_date = lease_commense_date;
        }

        if(remaining_lease){
            resale.remaining_lease = remaining_lease;
        }

        if(resale_price){
            resale.resale_price = resale_price;
        }

        return resale;
    }



    //-------------------------------------------------------------------------------------------------------------------------//

    //for databse use

    /**
     * Create resale data in the database.
     * @param month Month of the resale
     * @param town Town where the resale property is located
     * @param flat_type Type of flat
     * @param block_no Block number of the resale property
     * @param street_name Street name of the resale property
     * @param storey_range Storey range of the resale property
     * @param floor_area_sqm Floor area in square meters
     * @param flat_model Model of the flat
     * @param lease_commense_date Lease commencement date
     * @param remaining_lease Remaining lease duration
     * @param resale_price Price of the resale property
     */
    async dbcreateResaleData(month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number,){

        const dbresale = new this.resaleModel ({
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
        });

        const result = await dbresale.save();
        
    }
    /**
     * Retrieve all resale data from the database.
     * @returns An array of resale data.
     */
    async dbgetAllResaleData(){
        const result = await this.resaleModel.find().exec()
        return result.map((resale) => ({id:resale.id, month: resale.month,town: resale.town,
            flat_type: resale.flat_type, block_no: resale.block_no,
            street_name: resale.street_name, storey_range: resale.storey_range,
            floor_area_sqm: resale.floor_area_sqm, flat_model: resale.flat_model,
            lease_commense_date: resale.lease_commense_date, remaining_lease: resale.remaining_lease,
            resale_price: resale.resale_price}));
    }

    /**
     * Retrieve resale data by ID from the database.
     * @param id The ID of the resale data to retrieve.
     * @returns The resale data matching the provided ID.
     * @throws NotFoundException if no resale data is found for the given ID.
     */
    async dbgetResaleDataById(id: string){
        let found;
        
        try{
            found =  await this.resaleModel.findById(id);
        }catch(error){
            throw new NotFoundException('Resale HDB not found');
        }
        
        if(!found){
            throw new NotFoundException("Resale HDB not found");
        }

        return found;
    }

    /**
     * Update resale data in the database.
     * @param id The ID of the resale data to update.
     * @param month Month of the resale
     * @param town Town where the resale property is located
     * @param flat_type Type of flat
     * @param block_no Block number of the resale property
     * @param street_name Street name of the resale property
     * @param storey_range Storey range of the resale property
     * @param floor_area_sqm Floor area in square meters
     * @param flat_model Model of the flat
     * @param lease_commense_date Lease commencement date
     * @param remaining_lease Remaining lease duration
     * @param resale_price Price of the resale property
     * @returns The updated resale data.
     */
    async dbupdateResaleData(
        id: string, month: string,town: string,
        flat_type: string, block_no: number,
        street_name: string, storey_range: string,
        floor_area_sqm: number, flat_model: string,
        lease_commense_date: number, remaining_lease: string,
        resale_price: number){

        const resale = await this.dbgetResaleDataById(id);
        
        if(month){
            resale.month = month;
        }

        if(town){
            resale.town = town;
        }

        if(flat_type){
            resale.flat_type = flat_type;
        }

        if(block_no){
            resale.block_no = block_no;
        }

        if(street_name){
            resale.street_name = street_name;
        }

        if(storey_range){
            resale.storey_range = storey_range;
        }

        if(floor_area_sqm){
            resale.floor_area_sqm = floor_area_sqm;
        }

        if(flat_model){
            resale.flat_model = flat_model;
        }

        if(lease_commense_date){
            resale.lease_commense_date = lease_commense_date;
        }

        if(remaining_lease){
            resale.remaining_lease = remaining_lease;
        }

        if(resale_price){
            resale.resale_price = resale_price;
        }

        resale.save();
        return resale;
    }
    
    /**
     * Delete resale data by ID from the database.
     * @param id The ID of the resale data to delete.
     * @throws NotFoundException if no resale data is found for the given ID.
     */
    async dbdeleteResaleDataById(id:string){
        const result = await this.resaleModel.deleteOne({_id: id}).exec();

        if(result.deletedCount === 0){
            throw new NotFoundException('Resale HDB not found');
        }
        
    }

}
// createResaleData(month: string,town: string,
    //     flat_type: string, block_no: number,
    //     street_name: string, storey_range: string,
    //     floor_area_sqm: number, flat_model: string,
    //     lease_commense_date: number, remaining_lease: string,
    //     resale_price: number,) : Resale{

    //     const resale: Resale = {
    //         id: null,
    //         month: month,
    //         town: town,
    //         flat_type: flat_type,
    //         block_no: block_no,
    //         street_name: street_name,
    //         storey_range: storey_range,
    //         floor_area_sqm: floor_area_sqm,
    //         flat_model: flat_model,
    //         lease_commense_date: lease_commense_date,
    //         remaining_lease: remaining_lease,
    //         resale_price: resale_price,
    //     };

    //     this.resales.push(resale);
    //     return resale;
    // }