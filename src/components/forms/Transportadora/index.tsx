'use client';

import { onlyNumbers } from "@/commom/formatters";
import { cepMask, cnpjMask } from "@/commom/masks";
import BackdropLoader from "@/components/_ui/BackdropLoader";
import Title from "@/components/_ui/Title";
import api from "@/service/api";
import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isCNPJ } from "validation-br";


export default function TransportadoraForm() {

  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', cnpj: '', socialrazion: '', cep: '', address: '', number: '', city: '', uf: '' });
  const [loading, updateLoading] = useState(false);
  const [error, updateError] = useState("");


  const handleChange = (e: any) => {
    let { name, value } = e.target;

    if (["number", "cep", "cnpj"].includes(name)) value = onlyNumbers(value);

    setFormData({ ...formData, [name]: value });

  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await saveTransporter();
  }


  const validate = () => {

    if (!isCNPJ(formData.cnpj)) {
      alert('CNPJ inválido!');
      return false;
    }

    return true;
  }



  const saveTransporter = async () => {

    if (!validate()) return;

    try {
      updateLoading(true);

      const data = {
        name: formData.name,
        cnpj: formData.cnpj,
        socialrazion: formData.socialrazion,
        cep: formData.cep,
        address: `${formData.address}, ${formData.number}`,
        city: `${formData.city}/${formData.uf.toUpperCase()}`
      }

      await api.post('/transporter', { ...data });
      router.push('/transportadora');

    } catch (error: any) {
      updateError(error.message);
    } finally {
      updateLoading(false);
    }
  }

  const obtemDadosDeEndereco = async (cep: string) => {
    try {
      updateLoading(true);
      const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      setFormData((prevData) => ({ ...prevData, uf: data.state, city: data.city, address: data.street }));
    } catch (error) {
      setFormData((prevData) => ({ ...prevData, uf: "", city: "", address: "" }));
    } finally {
      updateLoading(false)
    }
  }

  return (
    <section style={{ background: '#fff', boxShadow: 'var(--box-shadow)', borderRadius: 'var(--border-radius)' }}>

      <BackdropLoader open={loading} />

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
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="CNPJ"
                size="small"
                inputProps={{ maxLength: 14 }}
                fullWidth
                name="cnpj"
                value={cnpjMask(formData.cnpj)}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={10}>
              <TextField
                label="Razão Social"
                size="small"
                name="socialrazion"
                fullWidth
                value={formData.socialrazion}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label="CEP"
                name="cep"
                size="small"
                inputProps={{ maxLength: 8 }}
                value={cepMask(formData.cep)}
                onChange={handleChange}
                onBlur={() => {
                  obtemDadosDeEndereco(formData.cep)
                }}
                fullWidth
                required
              />
            </Grid>


            <Grid item xs={7}>
              <TextField
                label="Endereço"
                size="small"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="Número"
                size="small"
                name="number"
                inputProps={{ maxLength: 6 }}
                value={formData.number}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Cidade"
                size="small"
                name="city"
                value={formData.city}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={2}>
              <TextField
                label="UF"
                size="small"
                name="uf"
                inputProps={{ maxLength: 2, style: { textTransform: 'uppercase' } }}
                value={formData.uf}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>


            <Grid item xs={12} style={{ display: 'flex', gap: '20px' }}>
              <Button type="submit" variant="contained" size="small"><SaveIcon fontSize="small" sx={{ marginRight: '8px', marginBottom: '4px' }} />Gravar</Button>
              <Button variant="outlined" size="small"><a href="/transportadora">Voltar</a></Button>
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
