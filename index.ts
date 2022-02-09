interface Entity {
    id: string;
}

interface User extends Entity {
    name: string;
}

interface Product extends Entity {
    description: string;
}

const mockUsers: User[] = [
    { id: "1", name: 'Santa Claus' },
    { id: "2", name: 'Jon Doe' }
];
const mockProducts: Product[] = [
    { id: "1", description: 'Product 1' },
    { id: "2", description: 'Product 2' }
];


type UsersApiResponse = (
    {
        status: 'success';
        data: User[];
    } |
    {
        status: 'error';
        error: string;
    }
);

type ProductsApiResponse = (
    {
        status: 'success';
        data: Product[];
    } |
    {
        status: 'error';
        error: string;
    }
);


async function fetchProducts(): Promise<ProductsApiResponse> {
    return new Promise(res => res({
        status: 'success',
        data: mockProducts
    }));
}
async function fetchUsers(): Promise<UsersApiResponse> {
    return new Promise(res => res({
        status: 'success',
        data: mockUsers
    }));
}

async function startApp() {
    const usersResponse = await fetchUsers();
    const productsResponse = await fetchProducts();
    
    if (usersResponse.status === 'error' || productsResponse.status === 'error') {
        throw new Error('An error occured while fetching some data.')
    }   

    console.log(`Successfully fetched ${usersResponse.data.length} users.`);
    console.log(`Successfully fetched ${productsResponse.data.length} products.`);

}

startApp();
