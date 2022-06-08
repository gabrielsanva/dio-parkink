interface ICar {
  name: string;
  licensePlate: string;
  entrance: Date | string;
}
(function () {
  const $ = (query: string): HTMLInputElement | null =>
    document.querySelector(query);

  function calcTime(ms: number): string {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    return `${min}min : ${sec} s`;
  }

  function patio() {
    function read(): ICar[] {
      return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }
    function save(cars: ICar[]) {
      localStorage.setItem("patio", JSON.stringify(cars));
    }

    function add(car: ICar, toSave?: boolean) {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${car.name}</td>
      <td>${car.licensePlate}</td>
      <td>${car.entrance}</td>
      <td><button class="delete" data-licensePlate="${car.licensePlate}">X</button></td>`;
      row.querySelector(".delete")?.addEventListener("click", function () {
        remove(this.dataset.licensePlate);
      });
      $("#patio")?.appendChild(row);
      if (toSave) save([...read(), car]);
    }
    function render() {
      $("#patio")!.innerHTML = "";
      const patio = read();
      if (patio.length) {
        patio.forEach((car) => add(car));
      }
    }
    function remove(licensePlate: string) {
      const { entrance, name } = read().find(
        (car) => car.licensePlate == licensePlate
      );
      const time = calcTime(
        new Date().getTime() - new Date(entrance).getTime()
      );
      if (
        !confirm(
          `The car ${name} remains parked for ${time}.Do you want to terminate the service?`
        )
      )
        return;
      save(read().filter((car) => car.licensePlate !== licensePlate));
      render();
    }
    return { read, add, render, remove, save };
  }
  patio().render();
  $("#save")?.addEventListener("click", () => {
    const name = $("#name")?.value;
    const licensePlate = $("#licensePlate")?.value;
    if (!name || !licensePlate) {
      alert("Name and License Plate are required!");
      return;
    } else {
      patio().add(
        { name, licensePlate, entrance: new Date().toISOString() },
        true
      );
    }
  });
})();
