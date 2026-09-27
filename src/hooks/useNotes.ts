import { useLocalStorage } from "./useLocalStorage";

export type Note = {
  id: string;
  title: string;
  body: string;
  label: string;
  pinned: boolean;
  archived: boolean;
  updatedAt: string;
};

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);

  const addNote = (title: string, body: string, label: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      body,
      label,
      pinned: false,
      archived: false,
      updatedAt: new Date().toISOString(),
    };

    setNotes((previousNotes) => [newNote, ...previousNotes]);
  };

  const updateNote = (id: string, patch: Partial<Note>) => {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...patch,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    );
  };

  const removeNote = (id: string) => {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== id),
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    removeNote,
  };
}