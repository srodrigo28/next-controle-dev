'use client'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"

const createProductSchema = z.object({
  nome: z.string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(20, "Máximo de 20 caracteres"),
  price: z.coerce.number()
    .min(1, "O preço mínimo é 1")
    .max(10, "O preço máximo é 10"),
})

type CreateProductSchema = z.infer<typeof createProductSchema>

export default function CreateProduct() {

    // Tipo inferido corretamente
    type CreateProductSchema = z.output<typeof createProductSchema>

    const { register, handleSubmit, formState: { errors } } = useForm<CreateProductSchema>({
        resolver: zodResolver(createProductSchema) as any, // 👈 evite erro
    })

    const handleCreateProduct: SubmitHandler<CreateProductSchema> = (data) => {
        console.log(data)
    }

  return (
    <div>
      <header>
        <h1>Novo Produto</h1>
        <h2>Criar um novo produto no sistema</h2>
      </header>

      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div>
          <label htmlFor="nome">Produto</label>
          <input type="text" id="nome" {...register("nome")} />
          {errors.nome && <p style={{ color: "red" }}>{errors.nome.message}</p>}
        </div>

        <div>
          <label htmlFor="price">Preço</label>
          <input type="text" id="price" {...register("price")} />
          {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
        </div>

        <button type="submit">Salvar</button>
      </form>
    </div>
  )
}
