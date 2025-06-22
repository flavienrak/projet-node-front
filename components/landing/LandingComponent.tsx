'use client';

import React from 'react';
import Popup from '../utils/Popup';
import AddTodo from './AddTodo';
import UpdateTodo from './UpdateTodo';
import CodeMirrorComponent from './CodeMirrorComponent';

import { Label } from '@radix-ui/react-label';
import { Check, Plus } from 'lucide-react';
import { getTodosService } from '@/services/todo.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setTodosReducer } from '@/redux/slices/todo.slice';
import { TodoInterface } from '@/interfaces/todo.interface';
import { setHeaderReducer } from '@/redux/slices/header.slice';

export default function LandingComponent() {
  const { todos } = useSelector((state: RootState) => state.todos);
  const { methods, protocol, host, status, url, headers } = useSelector(
    (state: RootState) => state.header,
  );

  const dispatch = useDispatch();

  const [showAdd, setShowAdd] = React.useState(false);
  const [todo, setTodo] = React.useState<TodoInterface | null>(null);

  React.useEffect(() => {
    (async () => {
      const res = await getTodosService();

      if (res.todos) {
        dispatch(setTodosReducer({ todos: res.todos }));
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
    })();
  }, []);

  return (
    <div className="w-full h-full text-black">
      <div className="flex justify-center p-12">
        <div className="w-full max-w-7xl flex gap-12">
          <div className="w-1/2 flex flex-col gap-12">
            <h2 className="text-4xl"> Liste des taches :</h2>
            {todos.length > 0 ? (
              <div className="relative flex flex-col justify-center gap-4 ms-4">
                <div className="absolute left-0 h-[calc(100%-0.5rem)] w-[2px] bg-black"></div>
                {todos
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div
                      key={`todo-${item.id}`}
                      className="relative flex items-center gap-2 ps-6"
                    >
                      <div className="absolute -left-4 h-8 w-8 flex justify-center items-center border-2 border-black bg-white rounded-full">
                        {item.isFinished && <Check />}
                      </div>
                      <Label
                        onClick={() => setTodo(item)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {item.name}
                      </Label>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="w-full p-4 bg-gray-100 italic">
                <Label>Aucune tache</Label>
              </div>
            )}
            <div className="flex">
              <button
                onClick={() => setShowAdd(true)}
                className="h-14 w-1/2 flex justify-center items-center gap-2 bg-black text-white rounded-md cursor-pointer hover:opacity-80"
              >
                <Plus />
                <span>Ajouter une tache</span>
              </button>
            </div>
          </div>

          <div className="w-1/2 flex flex-col gap-4">
            {methods && (
              <div className="flex flex-col gap-2">
                <Label className="text-xl">Méthode :</Label>
                <CodeMirrorComponent code={methods} />
              </div>
            )}
            {protocol && (
              <div className="flex flex-col gap-2">
                <Label className="text-xl">Protocole :</Label>
                <CodeMirrorComponent code={protocol} />
              </div>
            )}
            {host && (
              <div className="flex flex-col gap-2">
                <Label className="text-xl">Host :</Label>
                <CodeMirrorComponent code={host} />
              </div>
            )}
            {status && (
              <div className="flex flex-col gap-2">
                <Label className="text-xl">Statut :</Label>
                <CodeMirrorComponent code={status.toString()} />
              </div>
            )}
            {url && (
              <div className="flex flex-col gap-2">
                <Label className="text-xl">Url :</Label>
                <CodeMirrorComponent code={url} />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label className="text-xl">Details :</Label>
              <CodeMirrorComponent
                code={headers
                  .map(
                    (item) =>
                      `${item.key} : "${item.value}"\n// ${item.meaning}`,
                  )
                  .join('\n\n')}
              />
            </div>
          </div>
        </div>

        {showAdd && (
          <Popup onClose={() => setShowAdd(false)}>
            <AddTodo onClose={() => setShowAdd(false)} />
          </Popup>
        )}

        {todo && (
          <Popup onClose={() => setTodo(null)}>
            <UpdateTodo todo={todo} onClose={() => setTodo(null)} />
          </Popup>
        )}
      </div>
    </div>
  );
}
