import axiosDefault from "../axiosDefault";


const MotivationService = {

    all: async (params: any) => {
        try {
            const response = await axiosDefault.get(`/motivation`, {
                params: { ...params }
            });
            return response.data;
        } catch (error: any) {

        }
    },
    byId: async (id: number) => {
        try {
            const response = await axiosDefault.get(`/motivation/${id}`);
            return response.data;
        } catch (error: any) {

        }
    },
    save: async (data: any) => {
        try {
            const response = await axiosDefault.post(`/motivation`, { ...data });
            return response.data;
        } catch (error: any) {

        }
    }

}

export default MotivationService;
