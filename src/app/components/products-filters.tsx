import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form"
import z from "zod"

const productsFiltersSchema = z.object({
    id: z.string(),
    nome: z.string().min(3).max(20)
})

type ProductsFiltersSchema = z.infer<typeof productsFiltersSchema>

export function ProductsFilters(){
    
    const { register, handleSubmit } = useForm<ProductsFiltersSchema>({
        resolver: zodResolver(productsFiltersSchema)
    })

    function handleFilterProducts(data: ProductsFiltersSchema) {
        console.log(data);
    }

    return(
        <form onSubmit={handleSubmit(handleFilterProducts)} 
            className="flex items-center gap-2"
        >
            <input type="text" 
                placeholder="Id do pedido" {...register('id')} />
            <input type="text" 
                placeholder="Nome do produto" {...register('nome')} />

            <button type="submit">
                <Search className="size-4 mr-2" />
                Filtrar resultados
            </button>
        </form>
    )
}