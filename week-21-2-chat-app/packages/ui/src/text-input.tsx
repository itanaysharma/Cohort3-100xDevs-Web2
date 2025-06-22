interface PropType {
  placeholder: string;
  size: "small" | "big";
}

export function TextInput({ placeholder, size }: PropType) {
  return (
    <input
      placeholder={placeholder}
      type="text"
      style={{
        padding: size === "big" ? 20 : 10,
        margin: size === "big" ? 20 : 10,
        borderColor: "black",
        borderWidth: 1,
      }}
    ></input>
  );
}
