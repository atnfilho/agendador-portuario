import { TMotivation } from "./TMotivation";
import { TVehicle } from "./TVehicle";
import { TYard } from "./TYard";

export type TSchedule = {
    id: number,
    user_id: string,
    driver_cpf: string,
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
    create_at_with_timezone: string,
    create_at_without_timezone: string,
    yard: TYard,
    motivation: TMotivation,
    vehicle_type: TVehicle
}