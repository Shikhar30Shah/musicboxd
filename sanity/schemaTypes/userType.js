import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'id',
      type: 'string',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'username',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'url',
    }),
    defineField({
      name: 'followers',
      type: 'number',
    }),
    defineField({
      name: 'followings',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
})
