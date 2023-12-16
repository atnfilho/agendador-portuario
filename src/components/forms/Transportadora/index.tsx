'use client';

import Title from "@/components/_ui/Title";
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

type TEndereco = {
  cep: string,
  state: string,
  city: string,
  neighborhood: string,
  street: string,
  service: string
}

export default function TransportadoraForm() {

  const [formData, setFormData] = useState({ name: '', cnpj: '', socialrazion: '', cep: '', address: '', number: '', city: '',  uf: '' });
  const [loadingAddress, updateLoadingAddress] = useState(false);


  const handleChange = (e: any) => {
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveTransporter();
  }


  const saveTransporter = async () => {
    try {

      const data = {
        name: formData.name,
        cnpj: formData.cnpj,
        socialrazion: formData.socialrazion,
        cep: formData.cep,
        address: `${formData.address}, ${formData.number}`,
        city: `${formData.city}/${formData.uf}`
      }

      await axios.post('/api/transporter', { ...data });
      setFormData({ name: '', cnpj: '', socialrazion: '', cep: '', address: '', number: '', city: '',  uf: '' });
    } catch (error) {
      console.log(error);
    } finally {

    }
  }

  const obtemDadosDeEndereco = async (cep: string) => {
    try {
      updateLoadingAddress(true);
      const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      setFormData((prevData) => ({ ...prevData, cep: data.cep, uf: data.state, city: data.city, address: data.street }));
    } catch (error) {
      console.log(error);
    } finally {
      updateLoadingAddress(false)
    }
  }

  return (
    <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

      <Title>Cadastro de Transportadora</Title>

      <Paper sx={{ p: 3 }}>

        <h3>Nova Transportadora</h3>

        <form action="#" style={{ margin: '20px 0' }} onSubmit={handleSubmit}>

          <Grid container spacing={2} rowSpacing={3}>

            <Grid item xs={7}>
              <TextField
                label="Nome"
                size="small"
                fullWidth
                name="name"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="CNPJ"
                size="small"
                inputProps={{ maxLength: 14 }}
                fullWidth
                name="cnpj"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={10}>
              <TextField
                label="Razão Social"
                size="small"
                name="socialrazion"
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="CEP"
                name="cep"
                size="small"
                inputProps={{ maxLength: 8 }}
                value={formData.cep}
                onChange={handleChange}
                onBlur={() => {
                  obtemDadosDeEndereco(formData.cep)
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              {loadingAddress && <span style={{ fontSize: '0.85rem' }}>Carregando endereço...</span>}
            </Grid>

            <Grid item xs={7}>
              <TextField
                label="Endereço"
                size="small"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Número"
                size="small"
                name="number"
                inputProps={{ maxLength: 6 }}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                label="Cidade"
                size="small"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="UF"
                size="small"
                name="uf"
                inputProps={{ maxLength: 2 }}
                value={formData.uf}
                onChange={handleChange}
                fullWidth
              />
            </Grid>


            <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
              <Button type="submit" variant="contained" size="small"><SaveIcon fontSize="small" sx={{ marginRight: '8px', marginBottom: '4px' }} />Gravar</Button>
              <Button variant="outlined" size="small"><a href="/transportadora">Voltar</a></Button>
            </Grid>

          </Grid>

        </form>
      </Paper>

    </section>
  )
}
