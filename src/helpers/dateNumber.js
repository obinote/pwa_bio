const getDateNumber = (date) => {
    if (date instanceof Date) {
        const year = date.getFullYear() * 10000;
        const month = (date.getMonth() + 1) * 100;
        const day = date.getDate();
        const dateNumber = year + month + day;

        return dateNumber;
    }

    return 0;
};

module.exports = {
    getDateNumber,
};
