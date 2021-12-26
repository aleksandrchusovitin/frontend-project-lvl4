# Hexlet tests and linter status #

[![Actions Status](https://github.com/aleksandrchusovitin/frontend-project-lvl4/workflows/hexlet-check/badge.svg)](https://github.com/aleksandrchusovitin/frontend-project-lvl4/actions)

[![Node CI](https://github.com/aleksandrchusovitin/frontend-project-lvl4/actions/workflows/nodejs.yml/badge.svg)](https://github.com/aleksandrchusovitin/frontend-project-lvl4/actions/workflows/nodejs.yml)

[![Maintainability](https://api.codeclimate.com/v1/badges/398133efc60db6ae91ea/maintainability)](https://codeclimate.com/github/aleksandrchusovitin/frontend-project-lvl4/maintainability)

# Hexlet-chat
> study project at hexlet.io

## Overview
[Hexlet-chat](https://aachusovitin-slack-chat.herokuapp.com/) is a simple real-time chat application.

## Features
- Registration and authorization. The project has a small server that supports [JWT](https://jwt.io/) technology.
- Create, rename and delete channels. These operations take place inside modals.
- Create and receive messages. Implemented via [websockets](https://socket.io/).
- All forms validation and error handling. Used by [formik](https://formik.org/).

## Tech Stack
- [React (with hooks)](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [React-Bootstrap](https://react-bootstrap.github.io/), [socket.io](https://socket.io/), [formik](https://formik.org/), [i18next](https://react.i18next.com/)
- [ESLint](https://eslint.org/), [Webpack](https://webpack.js.org/), [Heroku](https://heroku.com/), [Rollbar](https://rollbar.com/)

## Requirements
- [node.js](https://nodejs.org/) >= v14
- [npm](https://www.npmjs.com/) >= v6
- [make](https://www.gnu.org/software/make/) >= v4
- [git](https://git-scm.com/) >= v2.28
- [heroku cli](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)

## Installation and Usage

### Online:
[Hexlet-chat (demo)](https://aachusovitin-slack-chat.herokuapp.com/)

By default available one user:
```
admin/admin
```

### Locally
```
$ git clone https://github.com/aleksandrchusovitin/frontend-project-lvl4.git
$ make install
$ make start
```
<hr>
<p align="center"><sup>@2021</sup></p>
