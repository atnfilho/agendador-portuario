import Subtitle from "@/components/_ui/Subtitle";
import { TVehicle } from "@/types/TVehicle";
import { Grid, TextField } from "@mui/material";
import { Fragment } from "react";

type ConteineresProps = {
    vehicle_type: number,
    vehicleTypeList: TVehicle[],
    handleChange: any
}

export default function Containeres({ vehicle_type, vehicleTypeList, handleChange }: ConteineresProps) {

    // console.log({containeresValues: values})

    const veiculo: TVehicle = vehicleTypeList.filter((obj: any) => {
        return obj.id === vehicle_type;
    })[0];

    const containeres: number[] = veiculo !== undefined ? Object.keys(new Array(veiculo.container_quantity).fill(null)).map(Number) : [];

    if (containeres.length === 0) {
        return <></>
    }


    return (
        <>
            <Grid item xs={12}>
                <Subtitle text="Containeres" />
            </Grid>

            {containeres.map((item) => (
                <Fragment key={item}>
                    <Grid item xs={3}>
                        <TextField
                            label={`Container ${item + 1}`}
                            size="small"
                            name={`container${item + 1}`}
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            label={`ISO ${item + 1}`}
                            name={`container${item + 1}iso`}
                            size="small"
                            fullWidth
                            required
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Fragment>
            ))}
        </>
    )
}
