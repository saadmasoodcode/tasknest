interface PropsInterface {
  title: string;
  is_completed: boolean;
  id?: string;
  group_id?: string;
}

const Todos = (props: PropsInterface) => {
  const { title, is_completed } = props;

  return (
    <li
      className={`flex rounded gap-4 w-full h-10 px-5 items-center hover:bg-[rgba(94,138,226,0.06)] cursor-pointer ${
        is_completed ? "bg-[rgb(246,247,248)]" : "bg-white"
      }`}
    >
      <h1>{title}</h1>
    </li>
  );
};

export default Todos;
