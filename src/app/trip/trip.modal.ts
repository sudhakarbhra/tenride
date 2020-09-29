export interface TripList  {
    trip_id: number;
    trip_type: string;
    day: string;
    from: string;
    to: string;
    car_type: string;
    date: string;
    time: string;
    bid_exit: string;
    close_date: string;
    close_time: string;
}

export interface TripDetail {
    km_limit: number;
    ex_km_charge: number; 
    from_address: string;
    to_address: string;
    toll_tax: string;
    state_tax: string;
    driver_allowance: string;
    special_instructions : string;   
}

export interface BitUpdate {
    message: string;
}

export interface TripView {
    km_limit: number;
    ex_km_charge: number; 
    from_address: string;
    to_address: string;
    toll_tax: string;
    state_tax: string;
    driver_allowance: string;
    special_instruction : string;   
    trip_id: number;
    trip_type: string;
    day: string;
    from: string;
    to: string;
    car_type: string;
    date: string;
    time: string;
    bid_exit: string;
    close_date: string;
    close_time: string;   
    bit_amount: string;
}