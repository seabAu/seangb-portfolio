export function importFile(filepath) {
    if (filepath) {
        let data;
        console.error(`importFile :: ${filepath} attempting to import`);
        fetch(`${filepath}`)
            .catch((error) => {
                console.error(`importFile :: ${filepath} returned an error: `, error);
                return;
            })
            .then((response) => {
                if (response) {
                    if (!response.ok) {
                        throw new Error("Http error: " + response.status);
                    } else {
                        return response.json();
                    }
                }
            })
            .catch((error) => {
                console.error(`importFile :: ${filepath} returned an error: `, error);
                return;
            })
            .then((result) => {
                data = result;
                console.log(result);
            });
        if (data) {
            return data;
        }
    }
}

// Source: https://gist.github.com/ZeeshanMukhtar1/d313da2c0aaa997c4125fcb2e2ca9c77
export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};