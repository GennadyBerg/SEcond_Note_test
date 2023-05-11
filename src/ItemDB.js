import { openDB } from 'idb';

class ItemDB {
    constructor() {
        this.dbPromise = openDB('items', 1, {
            upgrade: (db) => {
                db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
            },
        });
    }

    async ensureInit() {
        if (!this.db) {
            await this.init();
        }
    }

    async init() {
        this.db = await this.dbPromise;
    }

    async getAll() {
        await this.ensureInit();
        let res = await this.db.getAll('items');
        return res;
    }

    async add(item) {
        await this.ensureInit();
        return await this.db.add('items', item);
    }

    async update(item) {
        await this.ensureInit();
        return await this.db.put('items', item);
    }

    async delete(item) {
        await this.ensureInit();
        return await this.db.delete('items', item.id);
    }

    async searchItems(searchText) {
        await this.ensureInit();
        let items = await this.getAll();
        searchText = searchText.toLowerCase();
        items = items.filter(item => 
            item.title?.toLowerCase().includes(searchText) ||
            item.body?.toLowerCase().includes(searchText));
        return items;
    }

}

export default ItemDB;
