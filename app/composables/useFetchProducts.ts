import {ref, type Ref} from 'vue'

interface Product {
    id: number
    name: string
    price: number
    image: string
}

interface ProductsResponse {
    products: Product[]
    totalPages: number
    currentPage: number
}

interface UseFetchProductsreturn {
    products: Ref<Product[]>
    loading: Ref<boolean>,
    error: Ref<string | null>
    currentPage: Ref<number>
    hasMorePages: Ref<boolean>

    fetchProducts: () => Promise<void>
    initProducts: () => void
}


export function useFetchProducts(limit: number = 12): UseFetchProductsreturn {
    const products = ref<Product[]>([])
    const loading = ref<boolean>(false)
    const error = ref<string | null>(null)
    const currentPage = ref<number>(1)
    const hasMorePages = ref<boolean>(true)

    const fetchProducts = async () => {
        loading.value = true
        error.value = null
        
        const loadPage = currentPage.value + 1

        try {
            const data = await $fetch<ProductsResponse>(
                `https://test-task-api.tapir.ws/products?page=${loadPage}&limit=${limit}`
            )
            
            if (data.products && data.products.length > 0 ) {
                products.value = [...products.value, ...data.products]
                currentPage.value = loadPage
                hasMorePages.value = currentPage.value < data.totalPages
            }
            
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Произошла ошибка'
            products.value = []
        } finally {
            loading.value = false
        }
    }

    const initProducts = () => {
        const { data } = useAsyncData<ProductsResponse>(
            'initial-products',
            () => $fetch(`https://test-task-api.tapir.ws/products?page=1&limit=${limit}`)
        )

        watchEffect(() => {
        if (data.value) {
            products.value = data.value.products || []
            currentPage.value = 1
            hasMorePages.value = 1 < (data.value.totalPages || 0)
        }
    })
    }

    return {
        products,
        loading,
        error,
        currentPage,
        hasMorePages,
        fetchProducts,
        initProducts
    }
}