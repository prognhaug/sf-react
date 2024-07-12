type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className="text-center text-white m-0 mb-8">{title}</h2>
      <div>{children}</div>
    </>
  );
}
