'use client';

import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import SaveIcon from '@mui/icons-material/Save';
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function MotivacaoForm() {

  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', code: '', description: '', transporterRequired: false });
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState("");

  const handleChange = (e: any) => {
    const {value, type, name, checked} = e.target;
    setFormData(prevState => ({ ...prevState, [name]: type === 'checkbox' ? checked : value }));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveMotivation();
  }


  const saveMotivation = async () => {
    try {
      updateLoading(true);
      await axios.post('/api/motivation', { ...formData });
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

        <h3>Nova Motivação</h3>

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

            <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
              <Button type="submit" variant="contained" size="small"><SaveIcon fontSize="small" sx={{ marginRight: '8px', marginBottom: '4px' }} />Gravar</Button>
              <Button variant="outlined" size="small"><a href="/motivacao">Voltar</a></Button>
            </Grid>

            <Grid item xs={12} style={{ color: "#f00" }}>
              {error}
            </Grid>

          </Grid>

        </form>
      </Paper>

    </section>
  )
}

