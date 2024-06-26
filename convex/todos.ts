import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('todos').collect()
  }
})

export const remove = mutation({
  args: { id: v.id('todos') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  }
})

export const deleteMany = mutation({
  args: { ids: v.array(v.id('todos')) },
  handler: async (ctx, { ids }) => {
    for (const id of ids) {
      await ctx.db.delete(id)
    }
  }
})

export const add = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    await ctx.db.insert('todos', {
      name,
      completed: false,
      created: Date.now()
    })
  }
})

export const setCompleted = mutation({
  args: { completed: v.boolean(), id: v.id('todos') },
  handler: async (ctx, { id, completed }) => {
    await ctx.db.patch(id, { completed })
  }
})

export const editText = mutation({
  args: { name: v.string(), id: v.id('todos') },
  handler: async (ctx, { id, name }) => {
    await ctx.db.patch(id, { name })
  }
})
