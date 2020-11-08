export function page(path) {
  return () => import(/* webpackChunkName: '' */ `~/pages/${path}`).then((m) => m.default || m);
}
