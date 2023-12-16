import { Grid, TextField } from "@mui/material";

type PlacasProps = {
    tipoVeiculo: number,
    listaDeTiposDeVeiculos: any[],
    values: any,
    updateValues: any
}

export default function Placas({ tipoVeiculo, listaDeTiposDeVeiculos, values, updateValues }: PlacasProps) {


    const veiculo = listaDeTiposDeVeiculos.filter((obj: any) => {
        return obj.id === tipoVeiculo;
    })[0];


    if (veiculo === undefined) {
        return <></>
    }


    return (
        <>
            <Grid item xs={12}>
                <h2 style={{ background: '#cecece', padding: '0.2rem 0.5rem', borderRadius: '0.2rem' }}>Placas</h2>
            </Grid>

            {veiculo?.placa_carreta && <Grid item xs={3}>
                <TextField
                    label="Carreta"
                    name="placa_carreta"
                    size="small"
                    fullWidth
                    value={values.placa_carreta}
                    onChange={updateValues}
                />
            </Grid>
            }

            {veiculo?.placa_reboque &&
                <Grid item xs={3}>
                    <TextField
                        label="Reboque"
                        name="placa_reboque"
                        size="small"
                        fullWidth
                        value={values.placa_reboque}
                        onChange={updateValues}
                    />
                </Grid>
            }

            {veiculo?.placa_semireboque && <Grid item xs={3}>
                <TextField
                    label="Semi Reboque"
                    name="placa_semireboque"
                    size="small"
                    fullWidth
                    value={values.placa_semireboque}
                    onChange={updateValues}
                />
            </Grid>
            }
        </>
    )
}