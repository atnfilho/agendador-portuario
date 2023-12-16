import axiosDefault from "../axiosDefault";


const ScheduleService = {

    all: async (params: any) => {
        try {
            const response = await axiosDefault.get(`/schedule`,  {
                params: { ...params }
            });
            return response.data;
        } catch (error: any) {

        }
    },
    byId: async (id: number) => {
        try {
            const response = await axiosDefault.get(`/schedule/${id}`);
            return response.data;
        } catch (error: any) {

        }
    },
    save: async (data: any) => {
        try {
            const response = await axiosDefault.post(`/schedule`, {...data});
            return response.data;
        } catch (error: any) {

        }
    }

}

export default ScheduleService;
