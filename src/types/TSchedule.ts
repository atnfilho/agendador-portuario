import { TDriver } from "./TDriver"
import { TMotivation } from "./TMotivation"
import { TTransporter } from "./TTransporter"
import { TVehicle } from "./TVehicle"
import { TYard } from "./TYard"


export type TSchedule = {
    id: number,
    motivationId: number,
    yardId: number,
    userId: string,
    transporterId: number,
    driverId: number,
    vehicle_typeId: number,
    plate_front: string,
    plate_trailer: string,
    plate_semi_trailer: string,
    container1: string,
    container1iso: string,
    container2: string,
    container2iso: string,
    container3: string,
    container3iso: string,
    container4: string,
    container4iso: string,
    justify: string,
    schedule_window_start: string,
    schedule_window_end: string,
    create_at: string,
    update_at: string,
    yard: TYard,
    motivation: TMotivation,
    vehicle_type: TVehicle,
    driver: TDriver,
    transporter: TTransporter
}