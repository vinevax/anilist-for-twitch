import {ListStatus, ListType, type MediaListEntry} from "@/types";

type UserIdResponse = {
    User: {
        id: number;
    }
}

const sendQuery = async (query: string, variables: any) => {
    const url = "https://graphql.anilist.co";

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query, variables}),
    });

    const json = await res.json();
    return json.data;
}

const getUserId = async (username: string) => {
    const query = `
        query ($username: String) {
          User (name: $username) {
            id
          }
        }
    `;

    const res: UserIdResponse =  await sendQuery(query, { username });

    return res.User.id;
}

const getList = async (userId: number, listStatus: ListStatus, listType: ListType | undefined) => {
    const status = [listStatus.toString().toUpperCase()];

    const query = `
        query ($userId: Int, $status: [MediaListStatus], $listType: MediaType) {
          MediaListCollection(userId: $userId, type: $listType, status_in: $status) {
            lists {
              name
              entries {
                media {
                  id,
                    title { english, native, romaji },
                  episodes,
                  coverImage {
                    large
                  },
                  siteUrl
                }
                progress,
              }
            }
          }
        }
    `;

    const res = await sendQuery(query, { userId, status, listType });

    return res.MediaListCollection.lists[0].entries as MediaListEntry[];
}

export const useAniList = () => {
    return {
        sendQuery,
        getUserId,
        getList,
    }
}