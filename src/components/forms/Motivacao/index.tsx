'use client';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import { TMotivation } from "@/types/TMotivation";
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type Props = {
  id?: number
}

export function MotivacaoForm({ id }: Props) {

  const router = useRouter();
  const [formData, updateFormData] = useState({ name: '', code: '', description: '', transporterRequired: false });
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState("");


  useEffect(() => {

    if (id) {
      const getMotivation = async () => {
        try {
          updateLoading(true);
          const response: TMotivation = (await api.get(`/motivation/${id}`)).data;
          if (!response) {
            updateError(`Nenhum registro encontrado para o identificador ${id}.`);
            return;
          }
          updateFormData(prevState => ({ name: response.name, code: response.code, description: response.description, transporterRequired: response.transporterRequired }));
        } catch (error: any) {
          updateError(`Falha ao obter os dados da motivação. Mensagem: ${error.message}`)
        } finally {
          updateLoading(false);
        }
      }
      getMotivation();
    }
  }, [id]);



  const handleChange = (e: any) => {
    const { value, type, name, checked } = e.target;
    updateFormData(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveMotivation();
  }


  const saveMotivation = async () => {
    try {
      updateLoading(true);

      id
        ? await api.patch(`/motivation/${id}`, { ...formData })
        : await api.post('/motivation', { ...formData });

      router.push('/motivacao');
    } catch (error: any) {
      updateError(error.message);
    } finally {
      updateLoading(false);
    }
  }



  return (
    <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

      <BackdropLoader open={loading} />

      <Title>Cadastro</Title>

      <Paper sx={{ p: 3 }}>

        <h3>{id ? "Editar Motivação" : "Nova Motivação"}</h3>

        <form action="#" style={{ margin: '20px 0' }} onSubmit={handleSubmit}>

          <Grid container spacing={2} rowSpacing={3}>

            <Grid item xs={7}>
              <TextField
                label="Nome"
                name="name"
                size="small"
                fullWidth
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Sigla"
                name="code"
                size="small"
                fullWidth
                inputProps={{ maxLength: 5 }}
                value={formData.code}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                label="Descrição"
                name="description"
                size="small"
                fullWidth
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Transportadora Requerida"
                  name="transporterRequired"
                  onChange={handleChange}
                  checked={formData.transporterRequired}
                  value={formData.transporterRequired}
                />
              </FormGroup>
            </Grid>

            {error &&
              <Grid item xs={12} style={{ color: "#f00" }}>
                <Alert severity="error">
                  {error}
                </Alert>
              </Grid>
            }

            <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                disabled={error !== ""}
              >
                <SaveIcon fontSize="small" sx={{ marginRight: '8px', marginBottom: '4px' }} />
                {id ? "Atualizar" : "Gravar"}
              </Button>
              <Button variant="outlined" size="small"><a href="/motivacao">Voltar</a></Button>
            </Grid>


          </Grid>

        </form>
      </Paper>

    </section>
  )
}

