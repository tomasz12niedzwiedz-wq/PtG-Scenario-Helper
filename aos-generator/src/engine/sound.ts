import { Howl } from "howler";

export const clickSound = new Howl({
  src: ["/assets/sounds/click.mp3"],
});

export const rollSound = new Howl({
  src: ["/assets/sounds/roll.mp3"],
});

export function playClick() {
  clickSound.play();
}

export function playRoll() {
  rollSound.play();
}