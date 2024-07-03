import type {Language} from "@/types";

declare global {
    interface Window {
        Twitch: any;
    }
}

type TwitchConfig = {
    AniListUsername: string;
    AniListUserId: number;
    PreferredLanguage: Language;
    WatchlistEnabled: boolean;
    ReadingListEnabled: boolean;
}

const version = "1";

const getConfigValue = () => {
    const config = window.Twitch.ext.configuration.broadcaster;

    if (config) {
        return JSON.parse(config.content) as TwitchConfig;
    }

    return {} as TwitchConfig;
}

const saveConfig = (config: TwitchConfig) => {
    window.Twitch.ext.configuration.set("broadcaster", version, JSON.stringify(config));
}

export const useTwitch = () => {
    return {
        version,
        get config() {
            return getConfigValue();
        },
        saveConfig,
    }
}