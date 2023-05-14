import { openDB } from 'idb';

class ItemDBQuinta {
    constructor() {
        this.apiKey = "ddJuy7W41owiomWQSJg8oU";
        this.appId = "cBzKO5W49msBZdPL8bb8o6";
        this.entityId = "c2W6JdNCjbW4tcSvacnmoj";
        this.dbUrl = "https://quintadb.com";
        this.dbAppUrl = `${this.dbUrl}/apps/${this.appId}`;
        this.dbTypesUrl = `${this.dbAppUrl}/dtypes`;
        this.entityUrl = `${this.dbTypesUrl}/entity/${this.entityId}.json`;
        this.appUrl = `${this.dbUrl}/apps/${this.appId}/dtypes.json`;
    }

    async ensureInit() {
        if (this.initiated)
            return;
        this.fieldsMap = await this.getFieldsMap();
        this.initiated = true;
    }

    getFieldName = (columnName) => this.fieldsMap[columnName];

    getColumnName = (fieldName) => this.fieldsMap[fieldName];

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
            `${this.dbAppUrl}/entities/${this.entityId}/properties.json`,
            data => data.fields.reduce((acc, obj) => {
                fieldsMap[acc.name] = acc.id;
                fieldsMap[acc.id] = acc.name;
                fieldsMap[obj.name] = obj.id;
                fieldsMap[obj.id] = obj.name;
            }));
        return fieldsMap;
    }

    async getAll() {
        await this.ensureInit();
        var params = ({
            "page": 1,
            "name_value": 1,
            "fetch_all": true,
            "per_page": 200
        });
        return (
            this.execRequest(
                "GET",
                this.entityUrl,
                data => data.records.map(d => this.getItem(d),
                params)
            )
        );
    }
    async execRequest(method, url, transformResultFunc = undefined, values = undefined, body = {}) {
        let useInilineParams = method === "GET";
        body.rest_api_key = this.apiKey;
        if (values)
            body.values = { ...body?.values ?? [], ...values };

        if (useInilineParams) {
            url = `${url}?${this.objectToQueryParams(body)}`
        }

        var requestOptions = {
            method,
            headers: this.getCommonHeaders(),
            body: useInilineParams ? undefined : JSON.stringify(body),
            redirect: 'follow'
        };

        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                throw new Error('Request failed');
            }
            const data = await response.json();
            if (transformResultFunc) {
                let res = transformResultFunc(data);
                return res;
            }
        } catch (error) {
            console.error(error);
        }
    }

    //getItem = (record) => ({ id: record.id, title: record.values[this.getColumnName("title")], body: record.values[this.getColumnName("body")], date: new Date(record.created_at) });
    getItem(record) {
        return { id: record.id, title: this.getValue(record, "title"), body: this.getValue(record, "body"), date: new Date(record.created_at) };
    }

    getValue(record, fieldName) {
        let name = fieldName in record.values ? fieldName : this.getColumnName(fieldName);
        return record.values[name];
    }

    async add(item) {
        await this.ensureInit();
        return this.execRequest(
            "POST",
            this.appUrl,
            data => this.getItem(data.record),
            ({ entity_id: this.entityId, 
            [this.getColumnName("title")]: item.title ?? ' ', [this.getColumnName("body")]: item.body
         })
        )
    }

    async update(item) {
        await this.ensureInit();
        return this.execRequest(
            "PUT",
            this.getEntityUrl(item.id),
            data => this.getItem(data.record),
            ({ [this.getColumnName("title")]: item.title, [this.getColumnName("body")]: item.body })
        )
    }

    async delete(item) {
        await this.ensureInit();
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
