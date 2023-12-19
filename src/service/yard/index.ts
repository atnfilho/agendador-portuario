import axiosDefault from "../axiosDefault";


const yardService = {

    all: async () => {
        try {
            const response = await axiosDefault.get(`/yard`);
            return response.data;
        } catch (error: any) {

        }
    },
    byId: async (id: number) => {
        try {
            const response = await axiosDefault.get(`/yard/${id}`);
            return response.data;
        } catch (error: any) {

        }
    },
    save: async (data: any) => {
        try {
            const response = await axiosDefault.post(`/yard`, {...data});
            return response.data;
        } catch (error: any) {

        }
    }

}

export default yardService;
