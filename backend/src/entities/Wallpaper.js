class Wallpaper {
  constructor({ id, caption, imageName, imageHash, created }) {
    this.id = id;
    this.caption = caption;
    this.imageName = imageName;
    this.imageHash = imageHash;
    this.created = created;
  }
}

export default Wallpaper;