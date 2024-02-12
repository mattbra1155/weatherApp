export const transformDateToLocaleString = (date?: string) => {

    if (date) {
        return new Date(date).toLocaleDateString()
    } else {
        return new Date().toLocaleDateString()
    }

}