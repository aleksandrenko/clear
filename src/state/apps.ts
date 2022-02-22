import { atom } from 'jotai';

type IApp = {
    uuid: string
    name: string
}

const TEST_APPS = [
    {
        uuid: '3243t3he',
        name: 'alx'
    }
];

export const appsAtom = atom<IApp[]>(TEST_APPS);

const appsAtoms = {
    count: {},
    get: atom([]),
    del: {},
    add: {},
    update: {}
}

