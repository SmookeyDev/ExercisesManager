export const isYoutubeLink = (link: string) => {
    const regex = new RegExp(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/,
    );
    console.log(regex.test(link));
    return regex.test(link);
}

export const getVideoId = (url: string) => {
    if (isYoutubeLink(url)) {
        const regex = new RegExp(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/
            ,
        );
        const match = url.match(regex);
        return match[1];
    }
    return url;
}