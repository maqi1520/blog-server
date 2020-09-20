import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { User } from './user'
import { Category, CategorySchema } from './category'
import moment from 'moment'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @IsNotEmpty()
  title: string

  @Column({
    nullable: true,
  })
  summary: string

  @Column({
    type: 'text',
  })
  content: string

  @Column({
    default: 1,
  })
  readedCount: number

  @ManyToMany((type) => Category, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[]

  @ManyToOne((type) => User, (user) => user.articles)
  user: User

  @Column('int', { nullable: true })
  userId: number

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm'),
  })
  createdAt: string

  @Column({
    default: moment().format('YYYY-MM-DD HH:mm'),
  })
  updatedAt: string
}

export const ArticleSchema = {
  title: { type: 'string', required: true, example: 'Javier' },
  content: {
    type: 'string',
    required: true,
    example: '## content \n ### title3',
  },
  categories: {
    type: 'array',
    items: {
      type: 'object',
      properties: CategorySchema,
    },
  },
}
