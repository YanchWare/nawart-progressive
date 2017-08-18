<template>
    <div class='loading spin-1'>
    <div class='loading spin-2'>
        <div class='loading spin-3'>
        <div class='loading spin-4'>
            <div class='loading spin-5'>
            <div class='loading spin-6'></div>
            </div>
        </div>
        </div>
    </div>
    </div>
</template>

<style scoped>

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(160deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(160deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
body {
  background: black;
}

.loading {
  margin-top: 70vh;
  background-color: transparent;
  border-radius: 50%;
  margin: 5px auto;
  animation: loading 5s infinite linear;
}

.spin-1 {
  border: 5px solid #444444;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  width: 120px;
  height: 120px;
}

.spin-2 {
  border: 5px solid #ea4c89;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  width: 100px;
  height: 100px;
  animation-delay: 1s;
}

.spin-3 {
  border: 5px solid #8aba56;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  width: 80px;
  height: 80px;
  animation-delay: 1s;
}

.spin-4 {
  border: 5px solid #ff8833;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  width: 60px;
  height: 60px;
  animation-delay: 1s;
}

.spin-5 {
  border: 5px solid #00b6e3;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  width: 40px;
  height: 40px;
  animation-delay: 1s;
}

.spin-6 {
  border: 5px solid #9ba5a8;
  width: 20px;
  height: 20px;
  animation-delay: 1s;
}
</style>
