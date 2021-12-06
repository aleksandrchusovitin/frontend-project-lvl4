export default {
  translation: {
    languages: {
      ru: 'Русский',
    },
    errors: {
      serverConnectionLost: 'Соединение с сервером потеряно',
    },
    mainPage: {
      channelsHeader: 'Каналы',

      buttons: {
        submit: 'Отправить',
        extraButtonForChannel: 'Управление каналом',
        channelDelete: 'Удалить',
        channelRename: 'Переименовать',
      },

      inputs: {
        message: 'Введите сообщение...',
      },

      messages: {
        message_0: '{{count}} сообщение',
        message_1: '{{count}} сообщения',
        message_2: '{{count}} сообщений',
      },
    },
    loginPage: {
      header: 'Войти',
      footerText: 'Нет аккаунта?',
      footerLink: 'Регистрация',

      buttons: {
        signIn: 'Войти',
      },

      inputs: {
        nickname: 'Ваш ник',
        password: 'Пароль',
        validationError: 'Неверные имя пользователя или пароль',
      },
    },
    signUpPage: {
      header: 'Регистрация',
      buttons: {
        signUp: 'Зарегистрироваться',
      },
      inputs: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        validationErrors: {
          requiredField: 'Обязательное поле',
          username: 'От 3 до 20 символов',
          password: 'Не менее 6 символов',
          confirmPassword: 'Пароли должны совпадать',
        },
      },
    },
    navBar: {
      buttons: {
        logout: 'Выйти',
      },
    },
    modals: {
      addChannel: {
        header: 'Добавить канал',
        buttons: {
          submit: 'Отправить',
          cancel: 'Отменить',
        },
        inputAriaLabel: 'Имя канала',
        inputFeedback: 'Должно быть уникальным',
      },
      removeChannel: {
        header: 'Удалить канал',
        bodyQuestion: 'Уверены?',
        buttons: {
          remove: 'Удалить',
          cancel: 'Отменить',
        },
      },
      renameChannel: {
        header: 'Переименовать канал',
        inputAriaLabel: 'Имя канала',
        inputFeedback: 'Должно быть уникальным',
        buttons: {
          submit: 'Отправить',
          cancel: 'Отменить',
        },
      },
    },
  },
};
