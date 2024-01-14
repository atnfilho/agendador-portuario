'use client';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import SaveIcon from '@mui/icons-material/Save';
import { Alert, Button, Grid, Paper, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type Props = {
  id?: number
}


export default function PatioForm({ id }: Props) {

  const router = useRouter();
  const [formData, updateFormData] = useState({ name: '' });
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState("");


  useEffect(() => {

    if (id) {
      const getYard = async () => {
        try {
          updateLoading(true)
          const response = (await api.get(`/yard/${id}`)).data;
          updateFormData(prevState => ({ name: response.name }))
        } catch (error: any) {
          updateError(`Falha ao obter os dados do pátio. Mensagem: ${error.message}`);
        } finally {
          updateLoading(false);
        }
      }
      getYard();
    }

  }, [id]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    updateFormData({ ...formData, [e.target.name]: value });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveYard();
  }


  const saveYard = async () => {
    try {
      updateLoading(true);

      id 
        ? await api.patch(`/yard/${id}`, { ...formData })
        : await api.post('/yard', { ...formData });
      
      router.push('/patio');
    } catch (error: any) {
      updateError(`Falha ao gravar dados do pátio. Mensagem: ${error.message}`)
    } finally {
      updateLoading(false);
    }
  }

  return (
    <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

      <BackdropLoader open={loading} />

      <Title>Cadastro de Pátio</Title>

      <Paper sx={{ p: 3 }}>

        <h3>Novo Pátio</h3>

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
              <Button variant="outlined" size="small"><a href="/patio">Voltar</a></Button>
            </Grid>

          </Grid>

        </form>
      </Paper>

    </section>
  )
}


