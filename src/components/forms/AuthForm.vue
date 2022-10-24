<template>
  <form class="form" name="form">
    <div class="form-inputs">
      <label for="email">
        <input
            class="form__field form__field_top"
            type="email"
            name="email"
            id="email"
            required
            placeholder="E-mail"
        />
      </label>
      <label for="password">
        <input
            class="form__field form__field_bottom"
            type="password"
            name="password"
            id="password"
            required
            minLength="8"
            placeholder="Пароль"
        />
      </label>
    </div>
    <button class="form__button" type="submit">Отправить</button>

    <div class="message">
      <h2 class="message__title">Присутствуют ошибки ввода данных:</h2>
      <ul class="message__list">
        <li class="message__text">пароль должен быть не меньше 8 символов</li>
        <li class="message__text">введёный email не корректен</li>
      </ul>
    </div>
  </form>
</template>

<script>
export default {
  name: "AuthForm"
}
</script>

<style scoped>

</style>
