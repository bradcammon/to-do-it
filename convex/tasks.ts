import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('tasks').collect()
  }
})

export const send = mutation({
  args: { text: v.string(), isCompleted: v.boolean() },
  handler: async (ctx, args) => {
    // Send a new message.
    await ctx.db.insert('tasks', { text: args.text, isCompleted: args.isCompleted })
  }
})
