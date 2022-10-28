<template>
  <div class="popup__container">
    <div>
      <p class="popup__error-message">
        <span class="popup__error-code">404</span>
        Страница не найдена
      </p>
    </div>
    <button class="popup__button link" @click.prevent="$router.go(-1)">Назад</button>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>
.popup__container {
  margin: auto;
  max-width: 400px;
  min-height: 394px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.popup__error-message  {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #1F2937;
  display: flex;
  flex-direction: column;
  margin: 0;
}
.popup__error-code {
  font-size: 140px;
  line-height: 169px;
}
.popup__button {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #4F46E5;
  text-decoration: none;
  background: transparent;
  border: none;
}
</style>
