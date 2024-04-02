import { useCallback, useState } from "react";
import { Page, Document } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "../Button";
import { Header } from "./Header.tsx";

type PdfViewerProps = {
  base64: string;
  onReset: () => void;
};

const BASE_SCALE = 1;

export const PdfViewer = ({ base64, onReset }: PdfViewerProps) => {
  const [pageNumbers, setPageNumbers] = useState(0);
  const [scale, setScale] = useState<number>(BASE_SCALE);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setPageNumbers(numPages);
    },
    [],
  );

  const handleZoomIn = useCallback(() => {
    setScale((prev) => prev + 0.1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => prev - 0.1);
  }, []);

  const pages = new Array(pageNumbers).fill(null);

  return (
    <div
      data-testid="pdf-container"
      className="flex flex-col items-center content-center w-full h-screen max-h-[95vh]"
    >
      <div className="overflow-auto relative bg-transparent p-15  flex flex-col  content-center ">
        <Header handleZoomIn={handleZoomIn} handleZoomOut={handleZoomOut} />

        <Document
          file={base64}
          onLoadSuccess={onDocumentLoadSuccess}
          className="p-4 w-full md:w-[750px] drop-shadow-md"
        >
          {pages.map((_, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              scale={scale}
            />
          ))}
        </Document>
      </div>
      <div className="flex justify-between gap-x-10 mt-4 w-full max-w-[400px] px-4">
        <Button data-testid="reset-button" onClick={onReset}>
          Створити новий документ
        </Button>
      </div>
    </div>
  );
};
