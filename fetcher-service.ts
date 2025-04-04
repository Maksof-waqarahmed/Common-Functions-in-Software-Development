// Server Side Fetcher Service 
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

interface FetcherOptions {
    method?: HttpMethod;
    url: string;
    data?: any;
    headers?: Record<string, string>;
}

const fetcherServerSide = async ({ method = 'GET', url, data, headers = {} }: FetcherOptions) => {
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        if (data && method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return await response.text();
    } catch (error) {
        console.error(`Request failed: ${method} ${url}`, error);
        throw error;
    }
};

export default fetcherServerSide;

// 1. GET Request:
fetcherServerSide({ url: '/api/users' })
    .then(data => console.log('Users:', data))
    .catch(error => console.error('Error:', error));

// 2. POST Request:
fetcherServerSide({
    method: 'POST',
    url: '/api/users',
    data: { name: 'Ali', age: 30 }
}).then(data => console.log('User created:', data))
    .catch(error => console.error('Error:', error));

// 3. PUT Request:
fetcherServerSide({
    method: 'PUT',
    url: '/api/users/1',
    data: { age: 31 }
}).then(data => console.log('User updated:', data))
    .catch(error => console.error('Error:', error));

// 4. DELETE Request:
fetcherServerSide({
    method: 'DELETE',
    url: '/api/users/1'
}).then(data => console.log('User deleted:', data))
    .catch(error => console.error('Error:', error));



// Client Side Fetcher Service 

// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetcherOptions {
    url: string;
    method?: HttpMethod;
    body?: Record<string, any>;
}

export const fetcher = async <T>(options: FetcherOptions): Promise<T> => {
    const { url, method = 'GET', body } = options;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        return await response.json() as T;
    } catch (error: any) {
        console.error('Client Fetcher Error:', error.message);
        throw error;
    }
};

// Example usage
const fetchData = async () => {
    try {
        const data = await fetcher<{ name: string; age: number }>({
            url: 'https://jsonplaceholder.typicode.com/users/1',
        });
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const postData = async () => {
    try {
        const response = await fetcher<{ id: number }>({
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'POST',
            body: { title: 'Hello', body: 'World', userId: 1 },
        });
        console.log(response);
    } catch (error) {
        console.error('Error posting data:', error);
    }
};

const updateData = async () => {
    try {
        const response = await fetcher<{ title: string }>({
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'PUT',
            body: { title: 'Updated Title', body: 'New Content', userId: 1 },
        });
        console.log(response);
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

const deleteData = async () => {
    try {
        const response = await fetcher<null>({
            url: 'https://jsonplaceholder.typicode.com/posts/1',
            method: 'DELETE',
        });
        console.log('Deleted:', response);
    } catch (error) {
        console.error('Error deleting data:', error);
    }
};


