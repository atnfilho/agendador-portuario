import axiosDefault from "../axiosDefault";


const VehicleService = {

    all: async (params: any) => {
        try {
            const response = await axiosDefault.get(`/vehicle_type`, {
                params: { ...params }
            });
            return response.data;
        } catch (error: any) {

        }
    },
    byId: async (id: number) => {
        try {
            const response = await axiosDefault.get(`/vehicle_type/${id}`);
            return response.data;
        } catch (error: any) {

        }
    },
    save: async (data: any) => {
        try {
            const response = await axiosDefault.post(`/vehicle_type`, { ...data });
            return response.data;
        } catch (error: any) {

        }
    }

}

export default VehicleService;
