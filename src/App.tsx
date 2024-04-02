import { TextForm } from "./components/TextForm";
import { useConverting } from "./hooks/useConverting.ts";
import { useCallback, useState } from "react";
import { PdfViewer } from "./components/PdfViewer";
import { History } from "./components/History";
import { useHistoryConverting } from "./hooks/useHistoryConverting.ts";

const App = () => {
  const { convert, reset } = useConverting();
  const [base64, setBase64] = useState<string | null>(null);
  const { history } = useHistoryConverting(base64);

  const onSubmit = useCallback(
    async (text: string) => {
      const base64 = await convert(text);
      setBase64(base64);
    },
    [convert],
  );

  const handleReset = useCallback(() => {
    reset();
    setBase64(null);
  }, [reset]);

  const onHistoryItemSelect = useCallback((base64: string) => {
    setBase64(base64);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
      <div className="flex grow justify-center w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2 p-4 ">
        {base64 ? (
          <PdfViewer base64={base64} onReset={handleReset} />
        ) : (
          <TextForm onSubmit={onSubmit} />
        )}
      </div>

      <History historyItems={history} onItemSelect={onHistoryItemSelect} />
    </div>
  );
};
export default App;
