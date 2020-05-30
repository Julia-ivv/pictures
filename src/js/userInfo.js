export class UserInfo {
  constructor(inputName, inputJob, outputName, outputJob, outputAvatar) {
    this.inputName = inputName;
    this.inputJob = inputJob;
    this.outputName = outputName;
    this.outputJob = outputJob;
    this.outputAvatar = outputAvatar;
    this.name = '';
    this.job = '';
    this.id = '';
  }

  setUserInfo(name, job, id) {
    this.name = name;
    this.job = job;
    if (id) this.id = id;
  }

  updateUserInfo(name, job, avatar) {
    if (name) this.outputName.textContent = name;
    if (job) this.outputJob.textContent = job;
    if (avatar) this.outputAvatar.style.backgroundImage = `url(${avatar})`;
  }
}
