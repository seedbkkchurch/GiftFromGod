import type { APIContext, APIRoute } from 'astro'

export const POST: APIRoute = async (context: APIContext) => {
  const formData = await context.request.formData()
  console.log('formData', formData)
  console.log('formData', formData)
  return new Response(
    JSON.stringify({
      message: 'This was a POST!',
    })
  )
}
