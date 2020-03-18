"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var person = /*#__PURE__*/function () {
  function person(name, age) {
    _classCallCheck(this, person);

    this.name = name;
    this.age = age;
  }

  _createClass(person, [{
    key: "getAge",
    value: function getAge() {
      console.log("the age is ".concat(this.age));
    }
  }, {
    key: "getName",
    value: function getName() {
      console.log("the name is ".concat(this.name));
    }
  }]);

  return person;
}();