import { pixelWorldWidth } from "./constants";

export function WorldWrap(x: number) {
  if (x >= pixelWorldWidth) {
    x -= pixelWorldWidth;
  } else {
    if (x < 0) {
      x += pixelWorldWidth;
    }
  }

  return x;
}
