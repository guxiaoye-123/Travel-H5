import dayjs from "dayjs"

export const  formatMonthDay = (date, formatStr = "MM月DD日") => {
    return dayjs(date).format(formatStr)
}

export const  getDiffDays = (startDate, endDate)=> {
    return dayjs(endDate).diff(startDate, "day")
}