const modalBtn = document.querySelector("#openModal");

modalBtn.addEventListener("click", async () => {
  const result = await modal("모달열기 버튼 클릭하셨습니까?");
  alert(result);
});

function modal(text) {
  document.querySelector("#modal").style.display = "block";
  document.querySelector(".modal__message").innerHTML = text;

  const promise = new Promise((resolve, reject) => {
    document.querySelector(".modal__ok").addEventListener("click", () => {
      resolve();
    });
    document.querySelector(".modal__cancel").addEventListener("click", () => {
      reject();
    });
  });

  return promise.then(
    () => {
      document.querySelector("#modal").style.display = "none";
      return true;
    },
    () => {
      document.querySelector("#modal").style.display = "none";
      return false;
    }
  );
}
