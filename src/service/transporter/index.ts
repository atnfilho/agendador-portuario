import axiosDefault from "../axiosDefault";


const TransporterService = {

    all: async () => {
        try {
            const response = await axiosDefault.get(`/transporter`);
            return response.data;
        } catch (error: any) {

        }
    },
    byId: async (id: number) => {
        try {
            const response = await axiosDefault.get(`/transporter/${id}`);
            return response.data;
        } catch (error: any) {

        }
    },
    save: async (data: any) => {
        try {
            const response = await axiosDefault.post(`/transporter`, {...data});
            return response.data;
        } catch (error: any) {

        }
    }

}

export default TransporterService;
