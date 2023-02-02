export default function Models({ currentModel, models, onModelChange }) {
  return (
    <div className="models">
      <select value={currentModel} onChange={(e) => onModelChange(e)}>
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.id}
          </option>
        ))}
      </select>
    </div>
  );
}
