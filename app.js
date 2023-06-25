import Login from "./login.js";
import Register from "./register.js";

class App {
  activeScreen;
  container;

  constructor(container) {
    this.container = container;
  }
  change_active_screen(screen) {
    if (this.activeScreen !== undefined) {
      this.container.innerHTML = "";
      console.log(this.activeScreen);
    }

    this.activeScreen = screen;
    this.activeScreen.initRender(this.container);
  }
}

const container = document.getElementById("container");

const app = new App(container);
const register = new Register();
const login = new Login();

app.change_active_screen(login);

export default app;
