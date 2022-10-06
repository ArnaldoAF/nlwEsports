import { Input } from "./Form/input";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, GameController, MagnifyingGlassPlus } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]); 

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique aqui um anúncio
        </Dialog.Title>

        <form action="" className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <select
              id="game"
              className="bg-zinc-900 py-4 px-3 rounded text-small placeholder:text-zinc-500 appearance-none"
              defaultValue=""
            >
              <option disabled value="">
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => {
                return (
                  <option value={game.id} key={game.id}>
                    {game.title}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome ou nick</label>
            <Input type="text" placeholder="Como te chamam dentro do game?" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                type="number"
                id="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" type="text" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <ToggleGroup.Item
                  title="Domingo"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') && 'bg-violet-500'}`}
                  value="0"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Segunda"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') && 'bg-violet-500'}`}
                  value="1"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Terça"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') && 'bg-violet-500'}`}
                  value="2"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Quarta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') && 'bg-violet-500'}`}
                  value="3"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Quinta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') && 'bg-violet-500'}`}
                  value="4"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Sexta"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') && 'bg-violet-500'}`}
                  value="5"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  title="Sábado"
                  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') && 'bg-violet-500'}`}
                  value="6"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horario do dia?</label>
              <div className="grid grid-cols-2 gap-1">
                <Input type="time" id="hourStart" placeholder="DE" />
                <Input type="time" id="hourEnd" placeholder="ATÉ" />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 text-small">
            <Checkbox.Root className="w-6 h-6 p-1 rounded bg-zinc-900">
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
