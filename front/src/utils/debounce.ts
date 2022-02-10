export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let d = Date.now() + delay;
  return function (...params: Parameters<T>) {
    if (Date.now() < d) return;
    d += delay;
    func(...params);
  };
}
