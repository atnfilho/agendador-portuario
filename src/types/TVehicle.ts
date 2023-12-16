export type TVehicle = {
    id: number,
    name: string,
    code: string,
    plate_front: boolean,
    plate_trailer: boolean,
    plate_semi_trailer: boolean,
    container_quantity: number,
    create_at_with_timezone: string,
    create_at_without_timezone: string
}