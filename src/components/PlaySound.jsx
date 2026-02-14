const sounds = {
  add: '/sound/add.mp3',
  complete: '/sound/complete.mp3',
  delete: '/sound/delete.mp3',
  update: '/sound/update.mp3'
}

export const playSound = (type) => {
  const sound = sounds[type]

  if(!sound) return

  const audio = new Audio(sound)
  audio.volume = 0.6
  audio.play().catch(() => {});
}