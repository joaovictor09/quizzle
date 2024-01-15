'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Trash } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { submitNewQuizzAction } from './actions'

const FormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  question_text: z.string().min(1),
  answers: z
    .object({
      text: z.string().min(1),
      is_correct: z.boolean(),
    })
    .array(),
})

type FormModel = z.infer<typeof FormSchema>

export function CreateNewQuizzForm() {
  const form = useForm<FormModel>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      description: '',
      question_text: '',
    },
  })

  const { control, handleSubmit } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers',
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(data: FormModel) {
    await submitNewQuizzAction(data).then(() => {
      toast.success('Quizz successfully created')
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Quizz title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Quizz description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="question_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="Question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="text-lg font-semibold">Answers</h2>

        <ul className="flex w-full flex-col gap-4">
          {fields.map((item, index) => (
            <li key={item.id} className="flex w-full flex-col gap-2">
              <FormLabel htmlFor={`answers.${index}.text`}>
                Answer {index + 1}
              </FormLabel>
              <div className="flex w-full gap-2">
                <FormField
                  control={control}
                  name={`answers.${index}.is_correct`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          className="h-10 w-10 border-muted"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`answers.${index}.text`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          className="w-full"
                          id={`answers.${index}.text`}
                          placeholder="Type your answer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  size="icon"
                  type="button"
                  variant="outline"
                  className="aspect-square"
                  onClick={() => remove(index)}
                >
                  <Trash />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <Button
          type="button"
          className="block w-full"
          variant="outline"
          onClick={() => append({ text: '', is_correct: false })}
        >
          Add new answer
        </Button>

        <Button className="mt-4 w-full" disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  )
}
