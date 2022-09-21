/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = "/user";

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }
  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }
  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {

    if (!localStorage.user) {
      return undefined;
    }
    else return JSON.parse(localStorage.user);


  }
  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
  /** */

  static fetch(callback ) {

    let options = {
      url: this.URL + '/' + 'current',
      responseType: 'JSON',
      method: 'GET',
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
        } else if (response.success === false) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    }
    return createRequest(options);
}

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = f =>f) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
          console.log("Пользователь успешно авторизован")
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f =>f) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.success) {
          this.setCurrent(response.user);
          console.log("Пользователь зарегистрирован")
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = f =>f) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      data: data,
      callback: (err, response) => {
        if (response && response.success) {
          User.unsetCurrent();
          console.log("Выход из приложения")
        }
        callback(err, response);
      }
    });
  }
}

