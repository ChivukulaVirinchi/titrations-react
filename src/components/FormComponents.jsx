import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useState, useContext } from "react";
import { Button } from "./ui/button";
import { titrants, titrates } from "./chemicals.json";
import CounterContext from "./CreateContext";
import { FormControl, FormField, FormItem } from "./ui/form";

export default function FormComponents(form) {
  const [Value, setValue] = useState(null);

  const [SelectedTitrant, setSelectedTitrant] = useContext(CounterContext);
  const [SelectedTitrate, setSelectedTitrate] = useContext(CounterContext);
  const [SelectedChem, setSelectedChem] = useContext(CounterContext);

  const result1 = Object.keys(titrants).map((key) => {
    const value = titrants[key];
    return key, value;
  });
  const selectOptions1 = result1.map((titrant, index) => {
    return (
      <SelectItem key={index} value={titrant.value}>
        {titrant.label}
      </SelectItem>
    );
  });

  const selectOptions2 =
    Value &&
    titrates[Value].map((titrate, index) => {
      return (
        <SelectItem key={index} value={titrate.value}>
          {titrate.label}
        </SelectItem>
      );
    });

  function onSubmit(concentration) {
    setSelectedChem({});
    setSelectedChem({
      titrant: {
        ...SelectedTitrant,
        ...concentration,
      },
      // titrate: {
      //   SelectedTitrate,
      // },
    });
    console.log(SelectedChem);
  }
  return (
    <>
      <form
        onSubmit={form.form.handleSubmit(onSubmit)}
        className="flex p-4 border rounded-lg gap-x-4"
      >
        <Select
          onValueChange={(value) => {
            setValue(value);
            setSelectedTitrant(titrants[value]);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Titrant" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Titrants</SelectLabel>
              {selectOptions1}
            </SelectGroup>
          </SelectContent>
        </Select>

        {Value ? (
          <Select
            onValueChange={(value) => {
              let result = Object.values(titrates).find(
                (subArr) => subArr[0].value === value
              );
              setSelectedTitrate(result);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`Select a Titrate`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Titrates</SelectLabel>
                {selectOptions2}
              </SelectGroup>
            </SelectContent>
          </Select>
        ) : (
          ""
        )}

        <FormField
          control={form.control}
          name="concentration"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="w-full"
                  type="number"
                  id="concentration"
                  placeholder="Concentration (M)"
                  {...field}
                />
              </FormControl>
              <p className="text-xs text-red-800">
                {form.form.formState.errors.concentration?.message}
              </p>
            </FormItem>
          )}
        />

        {/* <Input
          className="w-1/12"
          id="volume"
          type="number"
          placeholder="Volume (ml)"
          required={true}
        /> */}

        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
          Titrate!
        </Button>
      </form>
    </>
  );
}
