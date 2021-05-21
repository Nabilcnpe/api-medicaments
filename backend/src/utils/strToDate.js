const strToDate = (str) => {
    const regexes = [
        /^(?<day>[0-9]{2})\/(?<month>[0-9]{2})\/(?<year>[0-9]{4})$/,
        /^(?<day>[0-9]{2})-(?<month>[0-9]{2})-(?<year>[0-9]{4})$/,
        /^(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})$/,
    ];
    for (let regex of regexes) {
        if (regex.test(str)) {
            const groups = str.match(regex).groups;
            return new Date(groups['year'], groups['month'] - 1, groups['day']);
        }
    }
    throw new Error(`The format of this date is not accepted: "${str}".`);
}

module.exports = { strToDate }