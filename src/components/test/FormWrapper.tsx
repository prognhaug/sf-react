type FormWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <h2 className="text-center m-0 mb-8">{title}</h2>
      <div className="grid gap-x-4 gap-y-2 justify-start grid-cols-[auto_minmax(auto,_400px)]">
        {children}
      </div>
    </>
  );
}
