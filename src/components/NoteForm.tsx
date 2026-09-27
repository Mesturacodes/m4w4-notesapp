import { useState } from "react";

type NoteFormProps = {
  initialTitle?: string;
  initialBody?: string;
  initialLabel?: string;
  submitText?: string;
  onAdd: (title: string, body: string, label: string) => void;
  onCancel: () => void;
};

function NoteForm({
  initialTitle = "",
  initialBody = "",
  initialLabel = "",
  submitText = "Save note",
  onAdd,
  onCancel,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [label, setLabel] = useState(initialLabel);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd(title.trim(), body.trim(), label.trim());

    setTitle("");
    setBody("");
    setLabel("");
  };

  return (
    <form onSubmit={handleSubmit} className="note-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        autoFocus
      />

      <textarea
        placeholder="Write your note..."
        value={body}
        onChange={(event) => setBody(event.target.value)}
      />

      <input
        type="text"
        placeholder="Label (optional)"
        value={label}
        onChange={(event) => setLabel(event.target.value)}
      />

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {submitText}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="secondary-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NoteForm;