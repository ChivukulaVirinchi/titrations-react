import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormComponents from "./FormComponents";
import { Form } from "./ui/form";

export default function Details() {
  const schema = z.object({
    concentration: z.coerce
      .number()
      .positive({
        message:
          "Concentration should be +ve! Did you forget to take your math class?",
      })
      .lte(2, { message: "You'll burn your tounge! M<=2" }),

    // volu me: number().positive({ message: "Volume Cant be 0!" }),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      concentration: z.number(),
    },
  });

  async function onSubmit(Chemicals) {
    console.log(Chemicals);
  }

  return (
    <Form {...form}>
      <FormComponents form={form} onSubmit={onSubmit} />
    </Form>
  );
}
