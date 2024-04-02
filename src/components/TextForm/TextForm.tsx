import { TextArea } from "../TextArea";
import { Button } from "../Button";
import { useForm, Controller } from "react-hook-form";

type TextFormProps = {
  onSubmit?: (text: string) => void;
};

type Inputs = {
  text: string;
};

export const TextForm = ({ onSubmit }: TextFormProps) => {
  const { handleSubmit, control } = useForm<Inputs>({
    defaultValues: {
      text: "",
    },
  });

  const submit = (data: Inputs) => {
    onSubmit?.(data.text);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-md p-4 bg-white shadow-md rounded-lg w-[400px]"
    >
      <Controller
        name="text"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextArea {...field} placeholder="Уведіть текст тут..." rows={5} />
        )}
      />

      <Button type="submit" data-testid="submit-button">
        Конвертувати в PDF
      </Button>
    </form>
  );
};
