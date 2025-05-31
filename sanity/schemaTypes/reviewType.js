import { defineField, defineType } from 'sanity'

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name'
      }
    }),
    defineField({
      name: 'user',
      type: 'reference',
      to: {type: 'user'}
    }),
    defineField({
      name: 'popularity',
      type: 'number',
    }),
    defineField({
      name: 'review',
      type: 'string'
    }),
    defineField({
      name: 'album',
      type: 'string' 
    }),
    defineField({
      name: 'artists',
      type: 'string'
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
    defineField({
      name: 'releaseDate',
      type: 'string',
    }),
    defineField({
      name: 'trackId',
      type: 'string',
    }),
    defineField({
      name: 'totalTracks',
      type: 'number',
    }),
    defineField({
      name: 'duration',
      type: 'number',
    }),
    defineField({
      name: 'trackURL',
      type: 'string',
    })
  ]
})
