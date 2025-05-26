export const getUrlCacheKey = (encodedUri: string): string => {
    const cacheKey = `url:${encodedUri}`;
    
    return cacheKey;
}