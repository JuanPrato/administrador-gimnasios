interface Props {
  children: string | string[];
}

export function Title({ children }: Props) {
  return (<h1 className="text-3xl font-bold text-gray-900">{children}</h1>);
}

export function SubTitle(props: Props) {
  return <p className="text-gray-600">{props.children}</p>;

}