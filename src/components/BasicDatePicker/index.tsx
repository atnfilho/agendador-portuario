import { renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    label={label}
                    ampm={false}
                    value={value}
                    onChange={handleChange}
                    viewRenderers={{
                        hours: renderTimeViewClock,
                        minutes: renderTimeViewClock,
                        seconds: renderTimeViewClock,
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}