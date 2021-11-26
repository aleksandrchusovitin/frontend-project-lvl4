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
    },
  },
};
