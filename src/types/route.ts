export type Route = {
  path: string,
  element: React.LazyExoticComponent<React.FC<any>>,
  title?: string,
}