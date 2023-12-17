import { MobileDateTimePicker, ptBR, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import 'dayjs/locale/pt-br';


type Props = {
    label: string
    value: string | null,
    handleChange: any
}

export default function BasicDateTimePicker({ label, value, handleChange }: Props) {

    // const [value, setValue] = useState<Dayjs | null>(null);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br' localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}>
            <DemoContainer components={['DateTimePicker']}>
                <MobileDateTimePicker
                    orientation='landscape'
                    label={label}
                    ampm={false}
                    disablePast
                    value={value}
                    onChange={handleChange}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                    }}
                    slotProps={{
                        layout: {
                          sx: {
                            '.MuiTypography-root': {
                            }
                          }
                        }
                      }} 
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}