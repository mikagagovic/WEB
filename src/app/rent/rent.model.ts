import { Vehicle } from "../vehicle/vehicle.model";
import { Branch } from "../branch/branch.model";

export class Rent{

    Id:number;
    StartDate:Date;
    EndDate:Date;
    Approved:boolean;
    Vehicle:Vehicle;
    Vehicle_Id:number;
    BranchTook:Branch;
    BranchTook_Id:number;
    BranchReturn:Branch;
    BranchReturn_Id:number;
    Image:string;
}