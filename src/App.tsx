import { useMemo, useState } from "react";
import { useNotes, type Note } from "./hooks/useNotes";
import { useTheme } from "./context/ThemeContext";
import NoteForm from "./components/NoteForm";

type View = "all" | "pinned" | "archived";

function App() {
  const [view, setView] = useState<View>("all");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const { notes, addNote, updateNote, removeNote } = useNotes();
  const { theme, toggle } = useTheme();

  const filteredNotes = useMemo(() => {
    const result = notes.filter((note) => {
      const matchesView =
        view === "pinned"
          ? note.pinned && !note.archived
          : view === "archived"
            ? note.archived
            : !note.archived;

      const searchText = search.toLowerCase();

      const matchesSearch =
        note.title.toLowerCase().includes(searchText) ||
        note.body.toLowerCase().includes(searchText) ||
        note.label.toLowerCase().includes(searchText);

      return matchesView && matchesSearch;
    });

    return result.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    );
  }, [notes, view, search]);

  const handleAddNote = (
    title: string,
    body: string,
    label: string,
  ) => {
    addNote(title, body, label);
    setShowForm(false);
  };

  const handleUpdateNote = (
    title: string,
    body: string,
    label: string,
  ) => {
    if (!editingNote) {
      return;
    }

    updateNote(editingNote.id, {
      title,
      body,
      label,
    });

    setEditingNote(null);
  };

  return (
    <div className={`app ${theme}`}>
      <main className="container">
        <header className="header">
          <div>
            <h1>Notes</h1>
            <p>Simple space for your thoughts.</p>
          </div>

          <button onClick={toggle} className="theme-button">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </header>

        <div className="toolbar">
          <input
            className="search"
            type="search"
            placeholder="Search notes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button
            onClick={() => setShowForm(true)}
            className="new-note-button"
          >
            + New note
          </button>
        </div>

        <nav className="tabs">
          <button
            className={view === "all" ? "active" : ""}
            onClick={() => setView("all")}
          >
            All
          </button>

          <button
            className={view === "pinned" ? "active" : ""}
            onClick={() => setView("pinned")}
          >
            Pinned
          </button>

          <button
            className={view === "archived" ? "active" : ""}
            onClick={() => setView("archived")}
          >
            Archived
          </button>
        </nav>

        {showForm && (
          <NoteForm
            onAdd={handleAddNote}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingNote && (
          <NoteForm
            initialTitle={editingNote.title}
            initialBody={editingNote.body}
            initialLabel={editingNote.label}
            submitText="Save changes"
            onAdd={handleUpdateNote}
            onCancel={() => setEditingNote(null)}
          />
        )}

        <section className="notes">
          {filteredNotes.length === 0 ? (
            <div className="empty">
              <p>
                {search
                  ? "No notes match your search."
                  : "No notes here yet."}
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <article className="note-card" key={note.id}>
                <div className="note-header">
                  <h2>{note.title}</h2>

                  {note.pinned && (
                    <span className="pinned-label">Pinned</span>
                  )}
                </div>

                {note.body && <p>{note.body}</p>}

                {note.label && (
                  <span className="note-label">{note.label}</span>
                )}

                <div className="note-actions">
                  <button onClick={() => setEditingNote(note)}>
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      updateNote(note.id, {
                        pinned: !note.pinned,
                      })
                    }
                  >
                    {note.pinned ? "Unpin" : "Pin"}
                  </button>

                  <button
                    onClick={() =>
                      updateNote(note.id, {
                        archived: !note.archived,
                      })
                    }
                  >
                    {note.archived ? "Unarchive" : "Archive"}
                  </button>

                  <button onClick={() => removeNote(note.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;