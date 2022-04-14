'use strict';

const faker = require('faker');
const factory = require('rosie').Factory;

factory.define('theme').attrs({
  colors: {
    button: () => faker.internet.color(),
    failure: () => faker.internet.color(),
    primary: () => faker.internet.color(),
    secondary: () => faker.internet.color(),
    success: () => faker.internet.color(),
    text: () => faker.internet.color(),
    warning: () => faker.internet.color()
  },
  fonts: {
    primary: () => faker.random.words()
  },
  uiKitBackground: {
    background: faker.internet.color()
  },
  uiKitCalendar: {
    calendarComparison: faker.internet.color(),
    calendarHover: faker.internet.color(),
    calendarInRange: faker.internet.color(),
    calendarPrimary: faker.internet.color()
  },
  uiKitInput: {
    border: faker.internet.color()
  },
  uiKitText: {
    disabled: faker.internet.color(),
    placeholder: faker.internet.color(),
    text: faker.internet.color(),
    textSecondary: faker.internet.color(),
    textTertiay: faker.internet.color()
  }
});
