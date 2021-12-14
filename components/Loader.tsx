interface LoaderPropsInterface {
  show: boolean;
}

export default function Loader({ show }: LoaderPropsInterface) {
  return show ? <div className="loader" /> : null;
}
