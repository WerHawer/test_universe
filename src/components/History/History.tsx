import { ConvertingItem } from "../../hooks/useHistoryConverting.ts";

type HistoryProps = {
  historyItems: ConvertingItem[];
  onItemSelect: (base64: string) => void;
};

export const History = ({ historyItems, onItemSelect }: HistoryProps) => {
  return (
    <aside
      data-testid="history"
      className="hidden md:flex flex-col w-1/6 bg-white shadow-md rounded-lg p-4 self-start min-h-screen overflow-auto"
    >
      <h4 className="text-lg font-semibold mb-2">Історія</h4>
      <ul data-testid="history-list">
        {historyItems.length > 0 ? (
          historyItems.map(({ timestamp, base64, name }) => {
            const date = new Date(timestamp).toLocaleDateString("uk-UA");

            return (
              <li
                data-testid={`history-item`}
                key={timestamp}
                className="mb-1 cursor-pointer hover:underline"
                onClick={() => onItemSelect(base64)}
              >
                {date} - {name}
              </li>
            );
          })
        ) : (
          <li data-testid="history-empty">Історія порожня</li>
        )}
      </ul>
    </aside>
  );
};
