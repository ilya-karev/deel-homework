import { Product } from "./types"

const fetchProducts = (searchTitle: string): Promise<Product[]> => {
  const query = searchTitle ? `&title=${searchTitle}` : ''
  const result = new Promise<Product[]>((resolve, reject) => {
    fetch(`https://api.escuelajs.co/api/v1/products?offset=0&limit=30${query}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        resolve(data)
      })
      .catch((err) => {
        reject(err)
      })
  })

  return result
}

export default fetchProducts
