// utils.js
export function addHttps(url) {
    if (!url.startsWith('https://')) {
        if (url.startsWith('http://')) {
            return 'https://' + url.substring(7);
        } else {
            return 'https://' + url;
        }
    }
    return url;
}
