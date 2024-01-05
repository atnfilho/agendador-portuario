import { TVehicle } from "./TVehicle"

export type TOwner = {
    id: number,
    plate_front: string,
    plate_trailer: string,
    plate_semi_trailer: string,
    type_vehicle: string,
    vehicle_typeId: number,
    create_at: string,
    update_at: string,
    vehicle_type: TVehicle
}