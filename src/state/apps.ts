import { atom } from 'jotai';

type IApp = {
    uuid: string
    name: string
    pages: any[]
}

const TEST_APPS: IApp[] = [
    {
        uuid: 'alx',
        name: 'alx', //TODO: use only one. Choose
        pages: [
            {
                uuid: '32564u5g',
                slug: 'dashboard',
            },
            {
                uuid: '32tgerher',
                slug: 'user',
            }
        ],
    }
];

export const appsAtom = atom(TEST_APPS);

export const getPagesAtom = (pageId: string | undefined) => {
    return atom(
        (get) => {
            const app = get(appsAtom).find(app => app.uuid == pageId);
            return app?.pages || [];
        },
        (get, set, value) => {}
    );
}
