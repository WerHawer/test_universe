import { Button } from "../Button";

type HeaderProps = {
  handleZoomIn: () => void;
  handleZoomOut: () => void;
};

export const Header = ({ handleZoomIn, handleZoomOut }: HeaderProps) => {
  return (
    <div className="sticky top-0 left-0 right-0  bg-gray-400 p-2 z-10 flex justify-end content-center gap-1 drop-shadow-md">
      <Button onClick={handleZoomIn} variant="controls">
        +
      </Button>
      <Button onClick={handleZoomOut} variant="controls">
        -
      </Button>
    </div>
  );
};
