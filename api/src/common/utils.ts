import { format, utcToZonedTime } from 'date-fns-tz'
import { addHours } from 'date-fns'
const date = new Date()
const timeZone = 'America/Sao_Paulo'

export const utils = {
    dateCurrentDataBase: () => {
        let day = utcToZonedTime(date, timeZone)
        return day
    }
}