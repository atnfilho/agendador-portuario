import axiosDefault from "../axiosDefault";


const OwnerService = {

    all: async () => {
        try {
            const response = await axiosDefault.get(`/owners`);
            return response.data;
        } catch (error: any) {

        }
    },
    byId: async (id: number) => {
        try {
            const response = await axiosDefault.get(`/owners/${id}`);
            return response.data;
        } catch (error: any) {

        }
    },
    save: async (data: any) => {
        try {
            const response = await axiosDefault.post(`/owners`, { ...data });
            return response.data;
        } catch (error: any) {

        }
    }

}

export default OwnerService;
