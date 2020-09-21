interface DateFormatOptions {
    year?: 'numeric';
    month?: 'numeric';
    day?: 'numeric';
    hour?: 'numeric';
    minute?: 'numeric';
    second?: 'numeric';
}

export function formatDate(date: number | string | Date, options?: DateFormatOptions) {
    const defaultOptions = {
        month : 'short',
        day   : 'numeric',
        hour  : 'numeric',
        minute: 'numeric'
    };

    try {
        if(typeof date === 'string') {
            date = new Date(date);
        }
        return new Intl.DateTimeFormat('ru-RU', options ?? defaultOptions).format(date);
    } catch(error) {
        console.error(error);
        return '';
    }
}

export default formatDate;
