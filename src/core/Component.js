export default class Component {
  $target;
  $state = {};
  $components = {};
  _props;

  //이 부분 질문하기
  get $props() {
    return this._props;
  }

  set $props(value) {
    this._props = value;
    this.render();
    this.setEvent();
  }

  constructor($target, $props) {
    this.setup();
    this.$target = $target;
    this.$props = $props;
    this.mounted();
  }

  setup() {}
  mounted() {}
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }

  //이벤트 버블링해줌
  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
}
