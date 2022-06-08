var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var _a;
    var $ = function (query) {
        return document.querySelector(query);
    };
    function calcTime(ms) {
        var min = Math.floor(ms / 60000);
        var sec = Math.floor((ms % 60000) / 1000);
        return "".concat(min, "min : ").concat(sec, " s");
    }
    function patio() {
        function read() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function save(cars) {
            localStorage.setItem("patio", JSON.stringify(cars));
        }
        function add(car, toSave) {
            var _a, _b;
            var row = document.createElement("tr");
            row.innerHTML = "\n      <td>".concat(car.name, "</td>\n      <td>").concat(car.licensePlate, "</td>\n      <td>").concat(car.entrance, "</td>\n      <td><button class=\"delete\" data-licensePlate=\"").concat(car.licensePlate, "\">X</button></td>");
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remove(this.dataset.licensePlate);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (toSave)
                save(__spreadArray(__spreadArray([], read(), true), [car], false));
        }
        function render() {
            $("#patio").innerHTML = "";
            var patio = read();
            if (patio.length) {
                patio.forEach(function (car) { return add(car); });
            }
        }
        function remove(licensePlate) {
            var _a = read().find(function (car) { return car.licensePlate == licensePlate; }), entrance = _a.entrance, name = _a.name;
            var time = calcTime(new Date().getTime() - new Date(entrance).getTime());
            if (!confirm("The car ".concat(name, " remains parked for ").concat(time, ".Do you want to terminate the service?")))
                return;
            save(read().filter(function (car) { return car.licensePlate !== licensePlate; }));
            render();
        }
        return { read: read, add: add, render: render, remove: remove, save: save };
    }
    patio().render();
    (_a = $("#save")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
        var _a, _b;
        var name = (_a = $("#name")) === null || _a === void 0 ? void 0 : _a.value;
        var licensePlate = (_b = $("#licensePlate")) === null || _b === void 0 ? void 0 : _b.value;
        if (!name || !licensePlate) {
            alert("Name and License Plate are required!");
            return;
        }
        else {
            patio().add({ name: name, licensePlate: licensePlate, entrance: new Date().toISOString() }, true);
        }
    });
})();
