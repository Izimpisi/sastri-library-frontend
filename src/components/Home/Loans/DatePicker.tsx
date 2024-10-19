import * as React from 'react';
import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs = require('dayjs');

interface DatePickerProps {
  dateOfEventValue: Dayjs | null;
  setDateOfEventValue: (value: Dayjs | null) => void;
}

const WrapDatePicker: React.FC<DatePickerProps> = ({ setDateOfEventValue, dateOfEventValue }) => {
  const maxDate = dayjs().add(3, 'month');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker maxDate={maxDate} disablePast value={dateOfEventValue} onChange={(newValue) => setDateOfEventValue(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default WrapDatePicker;