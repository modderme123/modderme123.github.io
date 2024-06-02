import { regl } from "./surfaces";
import { fullscreen, update, createSplat, toggleBaseColor } from "./shaders";

let t = 0;
regl.frame(() => {
  fullscreen(() => {
    const red = Math.sin(t + 0) * 0.8 + 0.8;
    const green = Math.sin(t + 2) * 0.8 + 0.8;
    const blue = Math.sin(t + 4) * 0.8 + 0.8;
    t += 0.1;

    for (const [, pointer] of pointers) {
      createSplat(pointer.x, pointer.y, pointer.dx * 10, pointer.dy * 10, [red, green, blue], 0.0005);
      pointer.dx *= 0.5;
      pointer.dy *= 0.5;
    }

    update();
  });
});

const pointers = new Map<number, { x: number; y: number; dx: number; dy: number }>();

document.addEventListener("mousemove", (e) => {
  let pointer = pointers.get(-1);
  if (!pointer) {
    pointers.set(
      -1,
      (pointer = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        dx: 0,
        dy: 0,
      }),
    );
  }
  pointer.dx = e.clientX - pointer.x;
  pointer.dy = e.clientY - pointer.y;
  pointer.x = e.clientX;
  pointer.y = e.clientY;
});
document.addEventListener("touchstart", (e) => {
  for (const touch of e.changedTouches) {
    pointers.set(touch.identifier, {
      x: touch.clientX,
      y: touch.clientX,
      dx: 0,
      dy: 0,
    });
  }
});
document.addEventListener("touchend", (e) => {
  for (const touch of e.changedTouches) {
    pointers.delete(touch.identifier);
  }
});
document.addEventListener("touchmove", (e) => {
  for (const touch of e.changedTouches) {
    let pointer = pointers.get(touch.identifier);
    if (!pointer) {
      pointers.set(
        touch.identifier,
        (pointer = {
          x: touch.clientX,
          y: touch.clientX,
          dx: 0,
          dy: 0,
        }),
      );
    }
    pointer.dx = touch.clientX - pointer.x;
    pointer.dy = touch.clientY - pointer.y;
    pointer.x = touch.clientX;
    pointer.y = touch.clientY;
  }
});

window.addEventListener("click", function (evt) {
  if (evt.detail === 3) {
    document.body.classList.toggle("light");
    toggleBaseColor();
  }
});

window.onhashchange = () => {
  document.querySelector(window.location.hash)?.scrollIntoView();
};
