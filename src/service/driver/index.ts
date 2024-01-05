import axiosDefault from "../axiosDefault";


const DriverService = {

    all: async () => {
        try {
            const response = await axiosDefault.get(`/driver`);
            return response.data;
        } catch (error: any) {

        }
    },
    byId: async (id: number) => {
        try {
            const response = await axiosDefault.get(`/driver/${id}`);
            return response.data;
        } catch (error: any) {

        }
    },
    save: async (data: any) => {
        try {
            const response = await axiosDefault.post(`/driver`, { ...data }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error: any) {

        }
    }

}

export default DriverService;
