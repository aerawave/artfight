function getItem<T extends string>(): T | null {
    return null;
}

function setItem(): void {
    return;
}

function removeItem(): void {
    return;
}

type StorageBase = {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
};

const fake_storage: StorageBase = Object.freeze({
    getItem,
    setItem,
    removeItem,
});

export function useLocalStorage(): StorageBase {
    if (typeof localStorage === "object") {
        return localStorage;
    }
    return fake_storage;
}
