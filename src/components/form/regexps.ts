export default {
    email        : /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,10}$/,
    password     : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&]).{8,}$/,
    name         : /([A-Za-z]|[А-Яа-я_]){3,}/,
    calculateName: /([A-Za-z0-9_\-$]){3,}/
};
