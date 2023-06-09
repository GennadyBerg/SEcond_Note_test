import { openDB } from 'idb';

class ItemDBIndexeddb {
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
        item["date"] = new Date();
        await this.ensureInit();
        let res = await this.db.add('items', item);
        item = { ...item, id: res };
        return item;
    }

    async update(item) {
        await this.ensureInit();
        let res = await this.db.put('items', item);
        item = { ...item, id: res };
        return item;
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

export default ItemDBIndexeddb;

