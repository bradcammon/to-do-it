import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async (ctx) => {
    console.log('get query for todos')
    return await ctx.db.query('todos').collect()
  }
})

export const send = mutation({
  args: { text: v.string(), isCompleted: v.boolean() },
  handler: async (ctx, args) => {
    // Send a new message.
    await ctx.db.insert('tasks', { text: args.text, isCompleted: args.isCompleted })
  }
})

/** */

export const list = query({
  args: {
    forceError: v.optional(v.boolean())
  },
  handler: (ctx, args) => {
    console.log('getting todos')
    if (args.forceError) {
      throw new Error('forced error !')
    }
    return ctx.db.query('todos').order('desc').collect()
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
    console.log('inside todos.ts add mutation')
    await ctx.db.insert('todos', {
      name,
      completed: false,
      ageInSeconds: 0
    })
  }
})

export const setCompleted = mutation({
  args: { completed: v.boolean(), id: v.id('todos') },
  handler: async (ctx, { id, completed }) => {
    console.log(id, completed)
    await ctx.db.patch(id, { completed })
  }
})

export const editText = mutation({
  args: { name: v.string(), id: v.id('todos') },
  handler: async (ctx, { id, name }) => {
    await ctx.db.patch(id, { name })
  }
})

export const updateAgeInSeconds = mutation({
  args: { ageInSeconds: v.number(), id: v.id('todos') },
  handler: async (ctx, { id, ageInSeconds }) => {
    await ctx.db.patch(id, { ageInSeconds })
  }
})
