import {ListStatus, ListType} from "@/types";
import {useAniList} from "@/services/aniList";

interface CachedList {
    key: String;
    timestamp: Date;
    list: any;
}

const cache: CachedList[] = [];

const getCachedList = async (userId: number, listStatus: ListStatus, listType: ListType | undefined) => {
    const { getList } = useAniList();
    const key = `${listStatus.toString()}-${listType?.toString()}`;
    const now = new Date();

    const cachedItem = cache.find(item => item.key === key);

    if (cachedItem && now.getTime() - cachedItem.timestamp.getTime() < 2 * 60 * 1000) {
        return cachedItem.list;
    } else {
        const list = await getList(userId, listStatus, listType);
        const newItem = { key, timestamp: new Date(), list };
        const index = cache.findIndex(item => item.key === key);
        if (index !== -1) {
            cache[index] = newItem;
        } else {
            cache.push(newItem)
        }
        return list;
    }
}

export const useCachedList = () => {
    return {
        getCachedList,
    }
}