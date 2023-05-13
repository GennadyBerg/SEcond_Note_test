import { openDB } from 'idb';

class ItemDBQuinta {
    constructor() {
        this.apiKey = "a-W7ummIXcLOo_tCkYWOC9";
        this.appId = "cfWQJcGsPlq4oEWQFdTSk9";
        this.entityId = "aQfXrxe8jar4ktWR3cRZvV";
        this.dbUrl = "https://quintadb.com";
        this.dbAppUrl = `${this.dbUrl}/apps/${this.appId}`;
        this.dbTypesUrl = `${this.dbAppUrl}/dtypes`;
        this.entityUrl = `${this.dbTypesUrl}/entity/${this.entityId}.json`;
        this.appUrl = `${this.dbUrl}/apps/${this.appId}/dtypes.json`;
    }

    async ensureInit() {
        if (this.inInit)
            return;
        this.inInit = true;
        try {
            this.fieldsMap = await this.getFieldsMap();
        }
        finally {
            this.inInit = false;
        }

    }

    getEntityUrl = (entityId) => `${this.dbTypesUrl}/${entityId}.json`;

    objectToQueryParams(obj) {
        const queryParams = Object.entries(obj)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        return queryParams;
    }

    getCommonHeaders() {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        return headers;
    }

    async getFieldsMap() {
        let fieldsMap = {};
        const fields = await this.execRequest(
            "GET",
            `${this.dbAppUrl}/entities/${this.entityId}/properties.json?${this.objectToQueryParams({ rest_api_key: this.apiKey })}`,
            data => data.fields.reduce((acc, obj) => {
                fieldsMap[acc.name] = acc.id;
                fieldsMap[acc.id] = acc.name;
                fieldsMap[obj.name] = obj.id;
                fieldsMap[obj.id] = obj.name;
            }));
        return fieldsMap;
    }

    async getAll() {
        var params = ({
            "rest_api_key": this.apiKey,
            "page": 1,
            "name_value": 1,
            "fetch_all": true,
            "per_page": 200
        });
        return (
            this.execRequest(
                "GET",
                `${this.entityUrl}?${this.objectToQueryParams(params)}`,
                data => data.records.map(d => this.getItem(d))
            )
        );
    }
    async execRequest(method, url, transformResultFunc = undefined, values = undefined) {
        this.ensureInit();
        let body = undefined
        if (method != "GET") {
            body = {
                "rest_api_key": this.apiKey
            };

            if (values)
                body.values = { ...body?.values ?? [], ...values };
        }
        var requestOptions = {
            method,
            headers: this.getCommonHeaders(),
            body: JSON.stringify(body),
            redirect: 'follow'
        };

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Request failed');
            }
            const data = await response.json();
            if (transformResultFunc)
                return transformResultFunc(data);
        } catch (error) {
            console.error(error);
        }
    }

    getItem = (record) => ({ id: record.id, title: record.values[this.fieldsMap["title"]], body: record.values[this.fieldsMap["body"]], date: new Date(record.created_at) });

    async add(item) {
        return this.execRequest(
            "POST",
            this.appUrl,
            data => this.getItem(data.record),
            ({ entity_id: this.entityId, [this.fieldsMap["title"]]: item.title,  [this.fieldsMap["body"]]: item.body })
        )
    }

    async update(item) {
        return this.execRequest(
            "PUT",
            this.getEntityUrl(item.id),
            data => this.getItem(data.record),
            ({  [this.fieldsMap["title"]]: item.title,  [this.fieldsMap["body"]]: item.body })
        )
    }

    async delete(item) {
        this.execRequest(
            "DELETE",
            this.getEntityUrl(item.id)
        )
    }

    /*
    async getAll() {

        var params = ({
            "rest_api_key": this.apiKey,
            "page": 1,
            "name_value": 1,
            "fetch_all": true,
            "per_page": 200
        });

        var requestOptions = {
            method: 'GET',
            headers: this.getCommonHeaders(),
            redirect: 'follow'
        };

        try {
            let url = `${this.entityUrl}?${this.objectToQueryParams(params)}`;
            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data = await response.json();
            let res = data.records.map(d => this.getItem(d));
            return res;
        } catch (error) {
            console.error(error);
        }
    }
    
    async add(item) {
         var raw = JSON.stringify({
             "rest_api_key": this.apiKey,
             "values": {
                 "entity_id": this.entityId,
                 "title": item.title,
                 "body": item.body
             }
         });
 
         var requestOptions = {
             method: 'POST',
             headers: this.getCommonHeaders(),
             body: raw,
             redirect: 'follow'
         };
 
         try {
             const response = await fetch(this.appUrl, requestOptions);
             if (!response.ok) {
                 throw new Error('Request failed');
             }
             const data = await response.json();
             item = this.getItem(data.record);
             return item;
         } catch (error) {
             console.error(error);
         }
     }
 
         async update(item) {
         var raw = JSON.stringify({
             "rest_api_key": this.apiKey,
             "values": {
                 "title": item.title,
                 "body": item.body
             }
         });
 
         var requestOptions = {
             method: 'PUT',
             headers: this.getCommonHeaders(),
             body: raw,
             redirect: 'follow'
         };
 
         try {
             const response = await fetch(this.getEntityUrl(item.id), requestOptions);
             if (!response.ok) {
                 throw new Error('Request failed');
             }
             const data = await response.json();
             item = this.getItem(data.record);
             return item;
         } catch (error) {
             console.error(error);
         }
     }
 
     async delete(item) {
         var raw = JSON.stringify({
             "rest_api_key": this.apiKey,
         });
 
         var requestOptions = {
             method: 'DELETE',
             headers: this.getCommonHeaders(),
             body: raw,
             redirect: 'follow'
         };
 
         try {
             const response = await fetch(this.getEntityUrl(item.id), requestOptions);
             if (!response.ok) {
                 throw new Error('Request failed');
             }
         } catch (error) {
             console.error(error);
         }
     }*/

    async searchItems(searchText) {
        let items = await this.getAll();
        searchText = searchText.toLowerCase();
        items = items.filter(item =>
            item.title?.toLowerCase().includes(searchText) ||
            item.body?.toLowerCase().includes(searchText));
        return items;
    }
}

export default ItemDBQuinta;
