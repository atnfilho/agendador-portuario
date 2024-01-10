'use client';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, Paper, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function PatioForm() {

  const router = useRouter();
  const [formData, setFormData] = useState({ name: '' });
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveYard();
  }


  const saveYard = async () => {
    try {
      updateLoading(true);
      await api.post('/yard', { ...formData });
      router.push('/patio');
    } catch (error: any) {
      updateError(error.message);
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

            <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
              <Button type="submit" variant="contained" size="small"><SaveIcon fontSize="small" sx={{ marginRight: '8px', marginBottom: '4px' }} />Gravar</Button>
              <Button variant="outlined" size="small"><a href="/patio">Voltar</a></Button>
            </Grid>

            <Grid item xs={12} style={{color: "#f00"}}>
              {error}
            </Grid>

          </Grid>

        </form>
      </Paper>

    </section>
  )
}


