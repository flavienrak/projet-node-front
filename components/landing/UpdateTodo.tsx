'use client';

import React from 'react';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PenLine, Plus, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { deleteTodoService, updateTodoService } from '@/services/todo.service';
import { useDispatch } from 'react-redux';
import {
  deleteTodoReducer,
  updateTodoReducer,
} from '@/redux/slices/todo.slice';
import { TodoInterface } from '@/interfaces/todo.interface';
import { setHeaderReducer } from '@/redux/slices/header.slice';

const formSchema = z.object({
  name: z.string().trim().min(3, 'Nom requis'),
  isFinished: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function UpdateTodo({
  todo,
  onClose,
}: {
  todo: TodoInterface;
  onClose: () => void;
}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: todo.name,
      isFinished: Boolean(todo.isFinished),
    },
  });

  const onSubmit = async (data: FormValues) => {
    const parseRes = formSchema.safeParse(data);

    if (parseRes.success) {
      if (
        parseRes.data.name.trim() !== todo.name ||
        parseRes.data.isFinished !== Boolean(todo.isFinished)
      ) {
        // API CALL
        setIsLoading(true);

        const res = await updateTodoService({
          id: todo.id,
          name: parseRes.data.name,
          isFinished: parseRes.data.isFinished,
        });

        if (res.todo) {
          toast.success('Tache mise à jour');
          dispatch(updateTodoReducer({ todo: res.todo }));
          dispatch(
            setHeaderReducer({
              methods: res.methods,
              protocol: res.protocol,
              host: res.host,
              status: res.status,
              url: res.url,
              headers: res.headers,
            }),
          );
        }
      }
      onClose();
    }
  };

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const res = await deleteTodoService(todo.id);

    if (res.deleted) {
      toast.success('Tache supprimée');
      dispatch(deleteTodoReducer({ todoId: todo.id }));
      dispatch(
        setHeaderReducer({
          methods: res.methods,
          protocol: res.protocol,
          host: res.host,
          status: res.status,
          url: res.url,
        }),
      );
    }
    onClose();
  };

  return (
    <div className="w-96 flex flex-col gap-4 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">Modifier ou supprimer</h2>

            <div className="flex flex-col gap-3">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="name"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Nom
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          id="name"
                          {...field}
                          autoComplete="off"
                          className="h-12 ps-16 text-[var(--text-primary-color)] border-[var(--text-primary-color)]/25 placeholder:text-[var(--text-tertiary-gray)]"
                          placeholder="Tache..."
                          autoFocus
                          required
                        />
                        <i className="absolute left-4 border-r pe-3 text-[var(--text-primary-color)]/70">
                          <PenLine size={20} />
                        </i>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs">
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                name="isFinished"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4">
                    <FormLabel
                      htmlFor="isFinished"
                      className="text-base text-[var(--text-primary-color)]"
                    >
                      Statut
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value ? 'finished' : 'todo'}
                        onValueChange={(value) =>
                          field.onChange(value === 'finished')
                        }
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              id="finished"
                              value="finished"
                              className="border border-black h-4 w-4"
                            />
                            <FormLabel htmlFor="finished" className="text-base">
                              Terminé
                            </FormLabel>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              id="todo"
                              value="todo"
                              className="border border-black h-4 w-4"
                            />
                            <FormLabel htmlFor="todo" className="text-base">
                              A faire
                            </FormLabel>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 h-14 px-12 flex justify-center items-center gap-2 bg-black text-white rounded-md cursor-pointer hover:opacity-80"
              >
                <span>Mettre à jour</span>
              </button>
              <button
                onClick={handleDelete}
                className="h-14 w-14 flex justify-center items-center gap-2 bg-red-500 text-white rounded-md cursor-pointer hover:opacity-80"
              >
                <Trash />
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
