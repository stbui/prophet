export const defaultDataProvider = {
    create: () => Promise.resolve({ data: null }),
    delete: () => Promise.resolve({ data: null }),
    getList: () => Promise.resolve({ data: [], total: 0 }),
    getOne: () => Promise.resolve({ data: null }),
    update: () => Promise.resolve({ data: null }),
};
