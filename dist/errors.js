export class FailedToFetchError extends Error {
    constructor() {
        super('Failed to fetch');
    }
}
export class FetchplusApiError extends Error {
    constructor(response) {
        super();
        this.headers = response.headers;
        this.body = response.body;
        this.status = response.status;
        this.statusText = response.statusText;
    }
}
