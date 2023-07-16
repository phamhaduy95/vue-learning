function isStringEmpty(str: any) {
    if (str === undefined) return true;
    if (str === '') return true;
    return false;
}
const a = '';

if (isStringEmpty(a)) {
    a;
}
